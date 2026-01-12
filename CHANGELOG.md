# Changelog

## v0.4.0

- Complete Phase 4 - Content Model Architecture
  - Implement comprehensive content schemas for generic platform
  - Add site settings schema for global configuration
  - Add navigation schema with hierarchical menu support
  - Add page schema with flexible content blocks
  - Add blog schema with author and category relationships
  - Add author schema with bio and social links
  - Add category schema with hierarchical organization
  - Add legal page schema for compliance content
  - Add redirects schema for URL management
  - Add SEO schema for metadata management
  - Implement comprehensive validation rules across all schemas
  - Add slug handling with automatic generation and uniqueness
  - Add reference logic for content relationships
  - Add field-level validation and custom validation functions
  - Implement proper TypeScript types for all content models
- Content model architecture is now complete and ready for page builder implementation

## v0.3.0

- Complete Phase 3 - Sanity Core Integration
  - Set up complete Sanity Studio with Presentation Tool
  - Implement comprehensive schema system (page, post, author, category, blockContent)
  - Add typed GROQ queries with automatic TypeScript generation
  - Implement draft mode with visual editing capabilities
  - Add live content updates with SanityLive component
  - Set up token-based authentication system
  - Configure preview URLs and CORS settings
  - Add draft mode API endpoints
  - Implement visual editing overlay components
  - Add disable draft mode functionality
  - Generate complete TypeScript types for all schemas
  - Set up production-ready client configurations
- Sanity CMS is now fully integrated with visual editing and draft mode capabilities

## v0.1.4

- Complete Phase 2 - add offline page support
  - Add offline fallback page with static rendering
  - Add offline metadata for proper SEO
  - Update PLAN.md to mark Phase 2 complete
  - Update version to v0.1.4

Phase 2 foundation is now complete with full PWA offline support ready.

## v0.1.3

- Complete Phase 2 - Next.js foundation
  - Add comprehensive loading state system with Spinner, Skeleton, and Loading components
  - Add 404/not-found page handling with route and global error pages
  - Add error boundaries for graceful degradation (route, global, and custom)
  - Set up path aliases for clean imports (@/components, @/lib, etc.)
  - Centralize font management in @/lib/font with generic naming (font, fontMono)
  - Update documentation to reflect Phase 2 completion
  - Verify production build readiness
- Foundation is now production-ready for CMS integration

## v0.1.1

- Add comprehensive documentation suite
  - CHANGELOG.md for version history
  - CODE_OF_CONDUCT.md for community guidelines
  - CONTRIBUTING.md for contribution workflow
  - LICENSE.md with MIT license
  - SECURITY.md for vulnerability reporting
  - TEMPLATE.md for template rules
  - UPGRADING.md for version upgrade guidance
- Establish project governance and legal framework

## v0.1.0

- Initial Next.js + TypeScript scaffold
- Sanity CMS integration placeholder
- Tailwind + Biome setup
