// Redirect Queries - following groqd patterns
// Using raw GROQ with proper structure as per GROQD.md documentation

// Active Redirects Query
export const activeRedirectsQuery = {
  query: `*[_type == "redirect" && isActive == true && (!defined(expiryDate) || expiryDate > now())]{
    source,
    destination,
    type,
    priority
  } | order(priority desc, source asc)`,
  schema: {
    source: "string",
    destination: "string",
    type: "string",
    priority: "number",
  },
};

// Redirect by Path Query
export const redirectByPathQuery = {
  query: `*[_type == "redirect" && source == $source && isActive == true && (!defined(expiryDate) || expiryDate > now())][0]{
    destination,
    type
  }`,
  schema: {
    destination: "string",
    type: "string",
  },
};
