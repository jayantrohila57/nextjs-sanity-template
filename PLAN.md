# Project Delivery Plan

## Current Status: v0.1.1

**Completed Phases:**

- ✅ Phase 0: Contract definition (README, ENV.md, ARCHITECTURE.md)
- ✅ Phase 1: Repository setup (versioning, changelog, basic quality gates)
- 🚧 Phase 2: Next.js foundation (partial - core setup done, some features pending)

**Next Priority:** Complete Phase 2 foundation work before moving to Sanity integration.

---

## Phase 0 — Define the Contract (Freeze scope)

### Goal

- Prevent scope creep and template rot.

### Tasks

- Lock template name
- Lock stack versions (Next.js, Sanity, Node, pnpm)
- Decide App Router vs Pages (must be App Router)
- Decide ISR vs fully static strategy
- Decide Sanity dataset naming
- Decide environment variable naming
- Decide hosting target (Vercel default)

### Output

- README finalized ✅
- ENV.md ✅
- ARCHITECTURE.md ✅

---

## Phase 1 — Repository & Versioning Setup

### Goal

- Turn this into a real product, not a repo.

### Tasks

- Create empty GitHub repo ✅
- Enable Template Repository ✅
- Add branch protection (pending)
- Configure:
  - Lint ✅
  - Typecheck ✅
  - Build ✅
- Add Husky (pending)
- Add commit lint (pending)
- Define versioning rules ✅
- Define release process ✅
- Add CHANGELOG ✅

### Output

- Template repo with quality gates
- v0.1.0 tag (scaffold only)

---

## Phase 2 — Next.js Foundation

### Goal

- Establish a stable, production-grade Next.js core.

### Tasks

- Initialize Next.js App Router + TypeScript ✅
- Set up project folder structure ✅
- Set up alias paths (pending)
- Set up Tailwind ✅
- Set up fonts (pending)
- Set up layout system ✅
- Set up error boundaries (pending)
- Set up loading states (pending)
- Set up 404 / not-found (pending)
- Set up /offline page (pending)

### Output

- App renders
- No CMS yet
- v0.2.0 tag

---

## Phase 3 — Sanity Core Integration

### Goal

- Make Sanity the source of truth.

### Tasks

- Create Sanity project
- Configure dataset
- Configure CORS
- Add token system
- Set up Studio
- Set up schema folder
- Set up GROQ utilities
- Set up typed queries
- Set up draft mode
- Set up preview URLs

### Output

- Next.js can fetch Sanity data
- Studio works
- v0.3.0 tag

---

## Phase 4 — Content Model Architecture

### Goal

- Make the platform generic.

### Tasks

- Create schemas for:
  - Site settings
  - Navigation
  - Page
  - Blog
  - Author
  - Category
  - Legal
  - Redirects
  - SEO
- Add:
  - Validation rules
  - Slug handling
  - Reference logic

### Output

- CMS can describe a full website
- v0.4.0 tag

---

## Phase 5 — Page Builder System

### Goal

- Enable visual page construction.

### Tasks

- Define block types
- Create Sanity block schemas
- Create GROQ block queries
- Create React block renderers
- Create block registry
- Create fallback handling
- Build blocks:
  - Hero
  - Rich text
  - Feature grid
  - CTA
  - Gallery
  - Testimonials
  - FAQ

### Output

- Pages are assembled from blocks
- v0.5.0 tag

---

## Phase 6 — Routing Engine

### Goal

- Ensure pages come from the CMS.

### Tasks

- Homepage routing
- Dynamic `[slug]` routing
- Blog routing
- Legal page routing
- Redirects
- Fallback handling
- 404 handling
- ISR revalidation logic

### Output

- Entire site driven by Sanity
- v0.6.0 tag

---

## Phase 7 — SEO & Metadata Layer

### Goal

- Deliver production-grade SEO.

### Tasks

- CMS SEO fields
- Metadata mapping
- OG image support
- Canonical URLs
- No-index logic
- `robots.txt`
- Sitemap
- JSON-LD

### Output

- SEO is CMS driven
- v0.7.0 tag

---

## Phase 8 — PWA & Offline Layer

### Goal

- Make the site installable and resilient.

### Tasks

- Manifest
- Icons
- Service worker
- Offline fallback
- Cache strategy
- Update flow

### Output

- Site installs and works offline
- v0.8.0 tag

---

## Phase 9 — Legal, Cookies & Contact

### Goal

- Provide the compliance layer.

### Tasks

- Legal pages
- Cookie banner
- Consent storage
- Tracking control
- Contact form
- CMS email routing or webhook

### Output

- GDPR-ready
- v0.9.0 tag

---

## Phase 10 — Production Hardening

### Goal

- Make the platform deployable everywhere.

### Tasks

- Env validation
- Security headers
- CSP
- Rate limiting (if needed)
- Image optimization
- Sanity CDN rules
- Preview deployment

### Output

- Production-ready
- v1.0.0 tag

---

## Phase 11 — Documentation & Onboarding

### Goal

- Make it usable by future teams.

### Tasks

- Setup guide
- Sanity setup guide
- Deployment guide
- Content editor guide
- Version upgrade guide
