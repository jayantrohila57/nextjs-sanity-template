GROQD Query Builder — Complete Cheat Sheet

groqd is a type-safe GROQ query builder for JavaScript/TypeScript that generates both a query string and a Zod schema for type-safe Sanity/GROQ responses.

Table of Contents

Overview

Basic Query Building

Filters

Projections

Parameters

Functions

Conditionals

Fragments & Reusability

Validation

Examples

1) Overview

groqd uses a builder pattern via q(...) to incrementally build a GROQ query and an associated schema. You chain methods like .filter(), .project(), .parameters(), etc., to compose full queries.

Example pattern:

const { query, schema } = q("*")
  .filter(/* expression */)
  .project(sub => ({
    field: q.string(),
    nested: q("*").filter(/*...*/).project(/*...*/)
  }));


The result includes:

query: the raw GROQ query string

schema: a Zod schema matching the returned shape

2) Basic Query Building

Import and start with:

import { q } from "groqd";


Start a base selector:

const base = q("*");      // Select all
const types = q("dataset"); // Use any root expression


Then chain additional parts.

3) Filters

Filters limit results using GROQ expressions.

.filter("_type == 'post'");       // type equality
.filter("_id == $idParam");       // parameter-based


Filter expressions must be simple equality or logical expressions that map to GROQ predicates.

4) Projections

Projections (like SELECT in SQL) define what fields to return:

.project(sub => ({
  title: q.string(),
  author: q("authorReference").project(a => ({
    name: q.string()
  }))
}));


Nested .project() calls structure the return shape recursively.

5) Parameters

Use $parameter syntax in your filter/conditions and define them via .parameters():

.parameters({ id: q.string(), limit: q.number() });


You must define parameters before using them in filters or conditions.

6) Functions

GROQ has built-in functions; groqd exposes many type-safe variants.

Example with .count():

const query = q("*")
  .filter("_type=='comment'")
  .count("_id");


Functions are integrated into the builder so you can include them in selects and projections.

Other built-ins include ordering, slicing, and grouping functions supported by GROQ.

7) Conditionals

Supports inline conditional logic:

Inline conditionals: evaluate expressions and return different values

select() function: like switch/case

Typical use:

condition(expr, q.string(), q.number());


Or use the native GROQ select() integration.

8) Fragments

Fragments are reusable projection snippets that can be shared between queries.

const userFrag = q.fragment(sub => ({
  name: q.string(),
  bio: q.string()
}));

const postQuery = q("*")
  .filter("_type=='post'")
  .project({ author: userFrag });


Fragments help avoid duplication across multiple query definitions.

9) Validation

Results from Sanity/GROQ should be validated using the generated Zod schema:

const result = await sanityClient.fetch(query);
schema.parse(result);


If the response doesn’t match the type expectations, Zod will throw with detailed errors so you can fix query or schema mismatches.

10) Full Example
import { q } from "groqd";

// Build query
const { query, schema } = q("*")
  .filter("_type=='post' && published == true")
  .project(sub => ({
    title: q.string(),
    slug: q.string(),
    author: q("author").project(a => ({
      name: q.string()
    })),
    comments: q("*")
      .filter("references(^._id)")
      .project({ text: q.string() })
  }))
  .parameters({ limit: q.number() });

// Use query
const posts = await sanityClient.fetch(query, { limit: 10 });
const validPosts = schema.parse(posts);

Tips for Query Construction

Always define parameters before use.

Use fragments for repeatable projection shapes.

Validate with the returned Zod schema to catch mismatches early.

Chain filters and projections for complex nested structures.