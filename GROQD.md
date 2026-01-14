# GROQD Query Builder — Complete Documentation

**groqd** is a type-safe GROQ query builder for JavaScript/TypeScript that generates both a query string and a Zod schema for type-safe Sanity/GROQ responses.

**Official Documentation:** https://nearform.com/open-source/groqd/docs

## Table of Contents

1. [Overview](#1-overview)
2. [Filters](#2-filters)
3. [Projections](#3-projections)
4. [Query Parameters](#4-query-parameters)
5. [Functions](#5-functions)
6. [Validation](#6-validation)
7. [Fragments](#7-fragments)
8. [Conditionals](#8-conditionals)
9. [Examples](#9-examples)

---

## 1. Overview

### The Root `q` Object

The `q` object (created in the Configuration section) has 3 main purposes:

#### Start a Query Chain

All query chains start with either `q.star` or `q.project(...)`. All methods of a query chain return a new chainable instance of `GroqBuilder`. Every chain is immutable, and can be reused if needed.

```typescript
import { q } from "groqd";

const query = q.star
  .filterByType("product")
  .project(sub => ({ ... }));
```

#### Create Reusable Fragments

You can also define reusable "projection fragments" using the `q.fragment<T>()` method.

```typescript
const userFrag = q.fragment((sub) => ({
  name: sub.field("name"),
  bio: sub.field("bio"),
}));
```

#### Provide GROQ Functions

The root `q` object provides various wrappers for GROQ functions, like `q.count(...)`, `q.coalesce(...)` and `q.select(...)`.

```typescript
const count = q.count(q.star.filterByType("product"));
```

### Example Query

```typescript
const top10ProductsQuery = q.star
  .filterByType("product")
  .order("price asc")
  .slice(0, 10)
  .project((sub) => ({
    title: sub.field("title"),
    price: sub.field("price"),
    images: sub
      .field("images[]")
      .field("asset")
      .deref()
      .project({
        url: sub.field("url"),
        altText: sub.field("altText"),
      }),
  }));
```

---

## 2. Filters

### `.star`

Selects all documents, via GROQ's `*` selector. This is how most queries start.

```typescript
q.star.filterByType("product").project(...)
// Result GROQ: *[_type == "product"]{ ... }
```

### `.filterByType(type)`

Filters the query based on the document type. Supports multiple type arguments.

```typescript
q.star.filterByType("pokemon");
// Result GROQ: *[_type == "pokemon"]
// Result Type: Pokemon[]

q.star.filterByType("product", "variant");
// Result GROQ: *[_type == "product" || _type == "variant"]
```

### `.filterBy(expression)`

Filters the query based on a GROQ expression. The `expression` is a strongly-typed string, but only supports simple equality expressions.

```typescript
q.star.filterByType("product").filterBy('category == "shoe"');
// Result GROQ: *[_type == "product"][category == "shoe"]
```

> **Note:** For more complex expressions, use `.filterRaw(expression)`.

### `.filterRaw(expression)`

Filters the query based on **any** GROQ expression.

> ⚠️ This method allows any GROQ `string`, and the syntax is not checked. Please use `.filterBy` for strongly-typed expressions.

```typescript
q.star.filterByType("product").filterRaw("price >= 50");
// Result GROQ: *[_type == "product"][price >= 50]
// Result Type: Product[]
```

### `.order(field)`

Orders the results using a strongly-typed expression, such as `"name asc"` or `"slug.current desc"`. Supports multiple sort expressions.

```typescript
q.star.filterByType("product").order("price asc", "slug.current desc");
// Result GROQ: *[_type == "product"] | order(price asc, slug.current desc)
// Result Type: Product[]
```

### `.slice(index)`

Returns a single item from the results, based on the index.

```typescript
q.star.filterByType("product").slice(0);
// Result GROQ: *[_type == "product"][0]
// Result Type: Product (not Product[])
```

### `.slice(start, end, inclusive = false)`

Returns a range of items from the results. If `inclusive` is set, the `end` item will be included.

```typescript
q.star.filterByType("product").slice(10, 20);
// Result GROQ: *[_type == "product"][10...20]
// Result Type: Product[]

q.star.filterByType("product").slice(10, 20, true);
// Result GROQ: *[_type == "product"][10..20]
// Result Type: Product[]
```

---

## 3. Projections

In GROQ, **projections** are how we select the data we want returned.

### The `.project` Method

#### `.project(sub => ProjectionMap)`

The `sub` parameter is a strongly-typed GroqBuilder, so it knows the names and types of the fields in the current filters.

The `ProjectionMap` is an object that maps keys to queries.

```typescript
q.star.filterByType("product").project((sub) => ({
  imageUrl: sub.field("image.asset").deref().field("url"),
  slug: sub.field("slug.current"),
  price: sub.field("price"),
}));
// Result GROQ:
//   *[_type == "product"]{
//     "imageUrl": image->url,
//     "slug": slug.current,
//     price,
//   }
```

### Shorthand Syntax Options

Since it's extremely common to select a field, there are several shorthand methods:

```typescript
// Full syntax
slug: sub.field("slug.current"),

// Shorthand with validation
slug: ["slug.current", z.string()],

// When key and field names match
price: sub.field("price"), // can be shortened to:
price: true, // or
price: z.number(), // with validation

// If you're only using shorthands and NOT using the `sub` parameter:
q.star.filterByType("product").project({
  slug: ["slug.current", z.string()],
  price: z.number(),
})
```

### The Ellipsis Operator `...`

You can use the ellipsis operator in a projection:

```typescript
q.star.filterByType("product").project((sub) => ({
  "...": true,
}));
// GROQ: *[_type == "product"]{ ... }
// Type: Array<Product>
```

> **Note:** This approach has strongly-typed results but does NOT have runtime validation, so the results are not **guaranteed** to match the schema. This could result in downstream errors that are harder to debug.

### Selecting Values

#### `.field(fieldName, parser?)`

Sanity calls this a "naked projection". This selects a single field from the object.

```typescript
// Select all product names:
q.star.filterByType("product").field("name", z.string());
// Result GROQ: *[_type == "product"].name
// Result Type: Array<string>
```

#### `.deref()`

Uses GROQ's dereference operator (`->`) to follow a reference.

```typescript
q.star.filterByType("product").field("image.asset").deref().field("url");
// GROQ: *[_type == "product"].image->url

q.star.filterByType("product").project((sub) => ({
  category: sub.field("category").deref().field("title"),
  images: sub.field("images[]").field("asset").deref().project({
    url: z.string(),
    altText: z.string(),
  }),
}));
// GROQ: *[_type == "product"]{
//  "category": category->title,
//  "images": images[]->{ url, width, height }
// }
```

#### `q.value(literal, parser?)`

Selects a literal value. Especially useful with conditional selections.

> Not to be confused with `z.literal(literal)` which is a Zod validation function that can be used together.

```typescript
q.star.filterByType("product").project({
  a: q.value("LITERAL"),
  b: q.value(true),
  c: q.value(42, z.number()), // Validation is optional
  d: q.value("VALIDATED", z.literal("VALIDATED")),
});
// Result GROQ: *[_type == "product"]{
//  "a": "LITERAL",
//  "b": true,
//  "c": 42,
//  "d": "VALIDATED",
// }
```

#### `.raw(expression, parser?)`

An "escape hatch" allowing you to write any GROQ query you want.

This should only be used for unsupported features, since it bypasses all strongly-typed inputs.

```typescript
q.star.filterByType("product").project({
  imageCount: q.raw("count(images[])", z.number()),
});
```

---

## 4. Query Parameters

Many queries have input parameters, such as `$slug` or `$limit`.

GroqD requires you to define these parameters before using them, using the `.parameters` method. This method has no runtime effects; it's only used for defining types.

Defining your parameters enables 2 great features:

- Strongly-typed methods (eg. `filterBy`) can reference these parameters.
- The parameters will be required when executing the query.

### `.parameters<Params>()`

Defines the names and types of parameters that must be passed to the query.

```typescript
const productsBySlug = q
  .parameters<{ slug: string }>()
  .star.filterByType("product")
  // You can now reference the $slug parameter:
  .filterBy("slug.current == $slug");
```

These parameters are now required by `runQuery`:

```typescript
const results = await runQuery(
  productsBySlug,
  // The 'slug' parameter is required:
  { parameters: { slug: "123" } }
);
```

---

## 5. Functions

The GROQ language has many functions. GroqD supports several of these in a strongly-typed way.

### `.count(expression)`

Calls the `count` function, to count the number of items in an expression.

It can be called in a projection:

```typescript
const products = q.star.filterByType("product").project((sub) => ({
  imagesCount: sub.count("images[]"),
}));
```

You can pass a simple projection string like above, or you can pass a more complex query:

```typescript
const products = q.star.filterByType("product").project((sub) => ({
  imagesCount: sub.count(sub.field("images[]").filterBy("asset != null")),
}));
```

This can also be called at the root level:

```typescript
const productCountQuery = q.count(q.star.filterByType("product"));
```

### `.coalesce(...expressions)`

Calls the `coalesce` function, which returns the first non-null value.

This can be called in a subquery:

```typescript
const productsQuery = q.star.filterByType("product").project((sub) => ({
  title: sub.coalesce(
    "title",
    "metadata.title",
    "category.title",
    q.value("DEFAULT")
  ),
}));
```

You can pass any mix of simple projection strings, and complex queries:

```typescript
const productsQuery = q.star.filterByType("product").project((sub) => ({
  title: sub.coalesce(
    "title",
    "metadata.title",
    sub.field("categories[]").slice(0).deref().field("title"),
    q.value("DEFAULT")
  ),
}));
```

This can also be called at the root level:

```typescript
const x = q.coalesce(
  q.star.filterByType("product").filterBy("slug.current === $slug").slice(0),
  q.star.filterByType("variant").filterBy("slug.current === $slug").slice(0),
  q.star.filterByType("category").filterBy("slug.current === $slug").slice(0)
);
```

### `.raw(expression, validation?)`

The `.raw` function is an "escape hatch" for any query that's not yet supported by GroqD.

This can be very useful for GROQ functions, like `array::compact()` or `geo::distance()`.

You must either specify the type via `.raw<T>(expression)`, or provide a type validation parameter via `.raw(expression, validation)`.

```typescript
q.star.filterByType("storefront").project((sub) => ({
  distance: sub.raw("geo::distance(geoPoint, $currentLocation)", z.number()),
  isInDeliveryZone: sub.raw<boolean>(
    "geo::contains(deliveryZone, $currentLocation)"
  ),
}));
```

---

## 6. Validation

In Sanity, there are no guarantees that your data matches your schema. The Data Lake can contain draft content, migrated content, and legacy data.

One key feature of `GroqD` is that it provides an optional runtime validation layer using Zod. This ensures that your data matches your expectations before you use it in your application.

### Where to Use Validation Methods

Validation can be added at any point in your query chain:

```typescript
// On individual fields
q.star.filterByType("product").project(sub => ({
  price: sub.field("price", z.number()),
  title: sub.field("title", z.string().min(1)),
}))

// On the entire result
const { query, schema } = q.star.filterByType("product").project(...);
const result = await client.fetch(query);
const validated = schema.parse(result);
```

### Supported Zod Methods

GroqD supports most Zod validation methods:

- `z.string()`, `z.number()`, `z.boolean()`, `z.date()`, `z.null()`, `z.undefined()`
- `z.array(parser)`, `z.object({ ... })`, `z.union([...])`, `z.literal(value)`
- `z.optional(parser)`, `z.nullable(parser)`, `z.default(parser, defaultValue)`
- `z.min()`, `z.max()`, `z.email()`, `z.url()`, etc.

### Zod Extras

#### `z.default(parser, defaultValue)`

Provides a default value if the field is missing or null:

```typescript
q.star.filterByType("product").project((sub) => ({
  status: sub.field("status", z.default(z.string(), "draft")),
}));
```

#### `z.slug(field)`

Validates and transforms a Sanity slug field:

```typescript
q.star.filterByType("product").project((sub) => ({
  slug: sub.field("slug", z.slug("current")),
}));
```

### Nullable / NotNull

#### `.nullable()`

Marks a field as nullable in the schema:

```typescript
q.star.filterByType("product").project((sub) => ({
  description: sub.field("description").nullable(),
}));
```

#### `.notNull()`

Ensures a field is not null (throws validation error if null):

```typescript
q.star.filterByType("product").project((sub) => ({
  title: sub.field("title").notNull(),
}));
```

### Transformation

#### `.transform(parser)`

Manually adds a transformation to the query results.

```typescript
q.star.filterByType("product").project((sub) => ({
  created: sub.field("_createdAt").transform((str) => new Date(str)),
}));
```

The `.transform` method is also aliased as `.validate` for semantic reasons.

---

## 7. Fragments

Fragments are reusable projection snippets that can be shared between queries.

### `q.fragment<T>(sub => ProjectionMap)`

Creates a reusable fragment that can be used in multiple queries:

```typescript
const userFrag = q.fragment((sub) => ({
  name: sub.field("name"),
  bio: sub.field("bio"),
  image: sub
    .field("image")
    .field("asset")
    .deref()
    .project({
      url: sub.field("url"),
    }),
}));

// Use the fragment in queries
const postQuery = q.star.filterByType("post").project({
  title: sub.field("title"),
  author: userFrag, // Reuse the fragment
});

const commentQuery = q.star.filterByType("comment").project({
  text: sub.field("text"),
  author: userFrag, // Reuse the same fragment
});
```

Fragments help avoid duplication across multiple query definitions and ensure consistency.

---

## 8. Conditionals

GroqD supports conditional logic in queries using GROQ's conditional operators.

### Inline Conditionals

You can use conditional expressions directly in projections:

```typescript
q.star.filterByType("product").project((sub) => ({
  displayPrice: sub.coalesce("salePrice", "price"),
  status: sub.raw("published == true ? 'live' : 'draft'", z.string()),
}));
```

### Using `q.select()`

For more complex conditional logic, you can use GROQ's `select()` function via `.raw()`:

```typescript
q.star.filterByType("product").project((sub) => ({
  statusLabel: sub.raw(
    `
    select(
      published == true => "Published",
      draft == true => "Draft",
      "Unknown"
    )
  `,
    z.string()
  ),
}));
```

---

## 9. Examples

### Complete Example: Blog Posts with Authors

```typescript
import { q } from "groqd";
import { z } from "zod";

// Define a fragment for author information
const authorFragment = q.fragment((sub) => ({
  name: sub.field("name", z.string()),
  slug: sub.field("slug.current", z.string()),
  image: sub
    .field("image")
    .field("asset")
    .deref()
    .project({
      url: sub.field("url", z.string()),
    }),
}));

// Build query with parameters
const postsQuery = q
  .parameters<{ limit?: number }>()
  .star.filterByType("post")
  .filterRaw("published == true")
  .order("publishedAt desc", "_updatedAt desc")
  .slice(0, 10) // Default limit, can be overridden
  .project((sub) => ({
    _id: sub.field("_id", z.string()),
    _type: sub.field("_type", z.literal("post")),
    title: sub.field("title", z.string()),
    slug: sub.field("slug.current", z.string()),
    excerpt: sub.field("excerpt", z.string().optional()),
    publishedAt: sub.field(
      "publishedAt",
      z.string().transform((str) => new Date(str))
    ),

    // Use the fragment
    author: authorFragment,

    // Nested projection
    featuredImage: sub
      .field("featuredImage")
      .field("asset")
      .deref()
      .project({
        url: sub.field("url", z.string()),
        width: sub.field("metadata.dimensions.width", z.number()),
        height: sub.field("metadata.dimensions.height", z.number()),
        alt: sub.field("altText", z.string().optional()),
      }),

    // Array projection
    categories: sub
      .field("categories[]")
      .deref()
      .project({
        title: sub.field("title", z.string()),
        slug: sub.field("slug.current", z.string()),
      }),

    // Count function
    commentCount: sub.count("comments[]"),
  }));

// Extract query and schema
const { query, schema } = postsQuery;

// Use the query
const posts = await sanityClient.fetch(query, { limit: 20 });
const validatedPosts = schema.parse(posts);
```

### Example: Single Document Query

```typescript
const siteSettingsQuery = q.star
  .filterByType("siteSettings")
  .slice(0, 1)
  .project((sub) => ({
    _id: sub.field("_id"),
    _type: sub.field("_type"),
    siteName: sub.field("siteName"),
    siteDescription: sub.field("siteDescription"),
    siteUrl: sub.field("siteUrl"),

    logo: sub.field("logo").project((img) => ({
      _type: img.field("_type"),
      asset: img
        .field("asset")
        .deref()
        .project((asset) => ({
          _id: asset.field("_id"),
          url: asset.field("url"),
          mimeType: asset.field("mimeType"),
          width: asset.field("metadata.dimensions.width"),
          height: asset.field("metadata.dimensions.height"),
          lqip: asset.field("metadata.lqip"),
        })),
    })),

    socialLinks: sub.field("socialLinks[]").project((link) => ({
      _key: link.field("_key"),
      _type: link.field("_type"),
      platform: link.field("platform"),
      url: link.field("url"),
    })),
  }));
```

### Example: Parameterized Query

```typescript
const postBySlugQuery = q
  .parameters<{ slug: string }>()
  .star.filterByType("post")
  .filterBy("slug.current == $slug")
  .slice(0)
  .project((sub) => ({
    title: sub.field("title", z.string()),
    body: sub.field("body[]"),
    author: sub
      .field("author")
      .deref()
      .project({
        name: sub.field("name", z.string()),
      }),
  }));

// Usage
const { query, schema } = postBySlugQuery;
const post = await sanityClient.fetch(query, {
  parameters: { slug: "my-post-slug" },
});
const validatedPost = schema.parse(post);
```

---

## Tips for Query Construction

1. **Always define parameters before use** - Use `.parameters<T>()` at the start of your query chain.

2. **Use fragments for repeatable projection shapes** - This reduces duplication and ensures consistency.

3. **Validate with the returned Zod schema** - Always call `schema.parse(result)` to catch mismatches early.

4. **Chain filters and projections for complex nested structures** - Build queries incrementally.

5. **Use `.filterBy()` for simple expressions** - Reserve `.filterRaw()` for complex cases that aren't type-safe.

6. **Leverage type inference** - Let TypeScript infer types from your schema configuration rather than using `any`.

7. **Handle nullable fields properly** - Use `.nullable()` when fields might be missing, and `.notNull()` when they're required.

8. **Use `.deref()` for references** - Always dereference document references to get the actual data.

9. **Prefer shorthand syntax** - Use `["field.path", z.string()]` or `true` for simple field selections.

10. **Test your queries** - Use the generated GROQ string to test in Sanity's GROQ playground.

---

## Resources

- **Official Documentation:** https://nearform.com/open-source/groqd/docs
- **API Reference:** https://nearform.com/open-source/groqd/docs/API/overview
- **GROQ Language Reference:** https://www.sanity.io/docs/groq
