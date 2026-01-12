# Environment Variables

This template uses environment variables for configuration.

## Required Variables

### Next.js

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Sanity CMS (Future)

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
```

## Development

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

## Production

Set environment variables in your hosting platform (Vercel, Netlify, etc.).

## Security

- Never commit `.env.local` to version control
- Use different tokens for development and production
- Rotate tokens regularly
