# Architecture

This template follows a modular, scalable architecture designed for CMS-driven websites.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/       # Reusable React components
│   │   └── ui/          # Base UI components
│   ├── lib/             # Utilities and helpers
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
├── sanity/              # Sanity CMS configuration (future)
│   ├── schemas/        # Content schemas
│   └── lib/           # Sanity utilities
└── docs/               # Documentation
```

## Core Principles

### 1. CMS-First Architecture

- All content managed through Sanity
- Dynamic routing based on CMS content
- SEO metadata from CMS

### 2. Type Safety

- TypeScript strict mode
- Typed CMS queries with GROQ
- Component prop validation

### 3. Performance

- Static generation where possible
- Incremental Static Regeneration (ISR)
- Optimized images and assets

### 4. Developer Experience

- Biome for linting and formatting
- Hot reload in development
- Clear separation of concerns

## Data Flow

```
Sanity CMS → GROQ Queries → React Components → Static Pages
```

1. Content editors work in Sanity Studio
2. GROQ queries fetch typed data
3. React components render the data
4. Next.js generates static pages at build time

## Component Architecture

### Page Builder Pattern

Pages are composed of reusable blocks:

- Each block has a Sanity schema
- Typed GROQ query for data fetching
- React component for rendering

### UI Component Library

Base components in `src/components/ui/`:

- Built with Tailwind CSS
- Consistent design system
- Fully typed with TypeScript

## Future Architecture Plans

### Sanity Integration

- Content schemas for pages, blog, navigation
- Real-time preview functionality
- Draft mode support

### SEO Layer

- Dynamic metadata generation
- Structured data (JSON-LD)
- Automatic sitemap generation

### PWA Features

- Service worker for offline support
- Web app manifest
- Installable experience

## Technology Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity (planned)
- **Deployment**: Vercel (recommended)
- **Tooling**: Biome for code quality
