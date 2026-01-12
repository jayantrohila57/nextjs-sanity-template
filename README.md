# Next.js + Sanity CMS Website Template

A production-ready, CMS-driven website platform built with the Next.js App Router, TypeScript, and Sanity.

All content — including navigation, SEO, legal pages, and page structure — is managed in Sanity, allowing you to ship sites that require zero code changes after setup. This template is perfect for portfolios, marketing sites, blogs, SaaS landing pages, and corporate sites.

---

## What This Template Guarantees

Every project generated from this template ships with:

- Next.js App Router + TypeScript
- Sanity CMS as the single source of truth
- Block-based page builder
- CMS-driven SEO & metadata
- CMS-driven navigation
- Blog & content system
- Legal & compliance pages
- PWA + offline support
- Fully static or ISR-based rendering
- Draft & preview mode
- Production-ready deployment

> No demo content. No hardcoded pages. Everything is CMS-driven.

---

## Page Builder

Pages are composed from Sanity-managed blocks, including:

- Hero
- Rich text
- Features
- Testimonials
- CTA
- Gallery
- FAQ

Each block provides:

- A Sanity schema
- A typed GROQ query
- A React renderer

You build pages visually inside Sanity, ensuring content and layout stay in sync.

---

## SEO System

SEO is completely managed in Sanity. Each page supports:

- Meta title
- Meta description
- Open Graph image
- Canonical URL
- No-index flag
- Structured data

`generateMetadata()` in Next.js renders SEO at build time for consistent, performant metadata.

---

## Routing

Routes are generated dynamically from Sanity:

- `/` → Home page
- `/[slug]` → CMS-driven pages
- `/blog/[slug]`
- Legal routes (privacy, terms, cookies)

All routes support:

- Static generation
- Revalidation
- Draft preview

---

## PWA Support

Every generated site includes:

- Web app manifest
- Icons
- Service worker
- Offline fallback

This makes the site installable and resilient by default.

---

## Developer Experience

The template enforces strong DX defaults:

- TypeScript strict mode
- Typed CMS queries
- Linting & formatting
- Git hooks
- Build checks

Bad code stays out of the template, ensuring consistency across launches.

---

## Ideal Use Cases

This template is designed for:

- Personal portfolios
- Blogs
- Marketing websites
- SaaS landing pages
- Agency sites
- Corporate websites

It is **not** meant for:

- Dashboards
- Auth systems
- SaaS backends
- E-commerce logic

---

## Philosophy

This is not just a starter app — it's a website factory.

- Content lives in Sanity.
- Code stays stable.
- Every new site is created from this template.
