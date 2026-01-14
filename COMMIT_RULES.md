# Commit Rules & Guidelines

This document defines the commit standards, versioning rules, and development workflow for the Next.js + Sanity CMS Template.

## Overview

This repository follows **Semantic Versioning** with phase-based development. Each phase corresponds to a minor version increment, while breaking changes require major version bumps.

## Version System

### Current Version: v0.4.0

### Version Pattern

- **Major**: Breaking changes (0.x.x → 1.x.x)
- **Minor**: Phase completion (0.3.x → 0.4.x)
- **Patch**: Bug fixes, documentation, minor improvements (0.4.0 → 0.4.1)

### Phase-Based Versioning

The project follows a structured phase approach where each completed phase triggers a minor version bump:

- **v0.1.x** - Repository & Versioning Setup
- **v0.2.x** - Next.js Foundation
- **v0.3.x** - Sanity Core Integration
- **v0.4.x** - Content Model Architecture
- **v0.5.x** - Page Builder System (Next)
- **v0.6.x** - Routing Engine
- **v0.7.x** - SEO & Metadata Layer
- **v0.8.x** - PWA & Offline Layer
- **v0.9.x** - Legal, Cookies & Contact
- **v1.0.x** - Production Hardening

## Commit Message Format

### Standard Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- **feat**: New features (phase completion, major functionality)
- **fix**: Bug fixes
- **docs**: Documentation updates
- **style**: Code formatting, linting (no functional changes)
- **refactor**: Code refactoring without functional changes
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates
- **perf**: Performance improvements

### Scopes

- **phase**: Phase completion releases
- **sanity**: Sanity CMS related changes
- **next**: Next.js related changes
- **config**: Configuration changes
- **docs**: Documentation
- **build**: Build system changes
- **deps**: Dependencies

### Examples

#### Phase Completion (Minor Version)

```bash
feat(phase): Complete Phase 4 - Content Model Architecture (v0.4.0)
```

#### Documentation Updates

```bash
docs: update CHANGELOG.md for v0.4.0
docs: synchronize README with current implementation
```

#### Code Changes

```bash
feat(sanity): add visual editing capabilities
fix(next): resolve draft mode authentication issue
refactor(config): optimize build setup
style: apply biome formatting rules
```

#### Version Bumps

```bash
chore: bump version to 0.4.0
```

## Complete Development Workflow

### Automated Scripts

The repository now has optimized scripts that handle the complete workflow:

#### Development Commands

```bash
# Start development with type generation
pnpm run dev
# Runs: typegen → next dev

# Production build with full validation
pnpm run build
# Runs: typegen → format → lint:check → next build
```

#### Pre-commit Hook (Automatic)

The pre-commit hook automatically handles staged files:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Check if there are staged files
if git diff --cached --quiet; then
  echo "🔄 Staged files detected, running workflow..."

  # 1. Generate types first (may update sanity.types.ts)
  echo "📝 Generating Sanity types..."
  pnpm run typegen

  # 2. Add generated types to staging if they were updated
  if git diff --quiet sanity.types.ts; then
    git add sanity.types.ts
    echo "✅ Added updated types to staging"
  fi

  # 3. Format all files (including newly generated types)
  echo "🎨 Formatting files..."
  pnpm run format

  # 4. Add formatted files to staging
  git add .

  # 5. Final lint check
  echo "🔍 Running lint check..."
  pnpm run lint:check

  echo " Pre-commit workflow complete"
else
  echo " No staged files, skipping pre-commit workflow"
fi
```

### AI-Assisted Commit Workflow

### Complete Automated Commit Process

When you're ready to commit changes, use this AI-assisted workflow that handles the complete process:

```bash
# Trigger the AI commit workflow
ai: run commit rules
```

#### Workflow Steps (Executed in Order)

1. **Sanity Type Generation**

   ```bash
   pnpm run sanity:typegen
   ```

   - Generates updated Sanity types from schema changes
   - Ensures type safety across the application

2. **Markdown Files Validation**

   - Scans all `.md` files for consistency
   - Validates documentation structure and formatting
   - Checks for broken links and references
   - Ensures all docs follow project standards

3. **Plan Progress Check**

   - Analyzes current progress against PLAN.md
   - Identifies completed tasks and milestones
   - Checks phase completion status
   - Validates implementation progress

4. **Documentation Updates**

   - Updates version numbers in relevant files
   - Marks completed tasks in PLAN.md
   - Updates CHANGELOG.md with new changes
   - Synchronizes README.md with current state
   - Updates any other documentation files as needed

5. **Code Formatting**

   ```bash
   pnpm run format
   ```

   - Applies consistent formatting across all files
   - Uses Biome for optimal performance
   - Ensures code style consistency

6. **Linting**

   ```bash
   pnpm run lint
   ```

   - Runs comprehensive linting checks
   - Validates code quality and standards
   - Catches potential issues early

7. **Build Validation**

   ```bash
   pnpm run build
   ```

   - Builds the entire application
   - Validates all components and dependencies
   - Ensures production readiness

8. **Git Operations**

   ```bash
   git add .
   git commit -m "<commit-message>"
   ```

   - Stages all changes
   - Creates commit with appropriate message
   - Ensures all generated files are included

9. **Version Tagging**
   ```bash
   git tag v<version>
   ```
   - Creates version tag for the commit
   - Follows semantic versioning rules
   - Enables easy rollback and tracking

#### Usage Examples

##### Regular Development Commit

```bash
ai: run commit rules
# Output: feat(sanity): add new blog post schema (v0.4.1)
```

##### Phase Completion Commit

```bash
ai: run commit rules
# Output: feat(phase): Complete Phase 5 - Page Builder System (v0.5.0)
```

##### Bug Fix Commit

```bash
ai: run commit rules
# Output: fix(next): resolve draft mode authentication issue (v0.4.1)
```

#### AI Commit Message Generation

The AI will automatically generate appropriate commit messages based on:

- **Type of changes** (feat, fix, docs, etc.)
- **Scope** (phase, sanity, next, etc.)
- **Version impact** (patch, minor, major)
- **Content analysis** of modified files
- **Progress status** from PLAN.md

#### Error Handling

If any step fails:

- Process stops immediately
- Clear error message provided
- Suggestions for fixing the issue
- Resume from failed step after fixes

#### Quality Gates

The workflow enforces these quality standards:

- All type generation succeeds
- All markdown files are valid
- Documentation is consistent
- Code formatting is applied
- Linting passes without errors
- Build completes successfully
- Git operations complete cleanly

## Manual Development Process

### For Regular Development

```bash
# 1. Make your changes
# Edit files, add features, fix bugs

# 2. Stage your changes
git add <specific-files>
# OR git add . for all changes

# 3. Commit (automatic pre-commit runs)
git commit -m "feat(sanity): add new component"

# Pre-commit automatically runs:
# - typegen → format → lint:check
```

### For Releases (Phase Completion or Bug Fixes)

```bash
# 1. Complete your work
# Finish phase or fix bugs

# 2. Update documentation FIRST
git add CHANGELOG.md PLAN.md README.md package.json

# 3. Commit documentation updates
git commit -m "docs: update CHANGELOG.md for v0.5.0"

# 4. Bump version
git commit -m "chore: bump version to 0.5.0"

# 5. Phase completion/Bug fix commit
git commit -m "feat(phase): Complete Phase 5 - Page Builder System (v0.5.0)"

# 6. Create tag
git tag v0.5.0

# 7. Push everything
git push origin main v0.5.0
```

### Key Workflow Features

- Type Generation: Runs before dev/build, and in pre-commit
- Smart Staging: Automatically adds generated types to staging
- Sequential Processing: typegen → format → lint:check
- No Conflicts: Handles generated files properly
- Git Add Awareness: Checks what changes before staging

## Version Release Process

### 1. Phase Completion

When a phase is complete:

1. **Update Documentation**

   ```bash
   docs: update CHANGELOG.md for v0.4.0
   docs: update PLAN.md to mark Phase 4 complete
   docs: update README.md with current state
   ```

2. **Version Bump**

   ```bash
   chore: bump version to 0.4.0
   ```

3. **Phase Completion Commit**

   ```bash
   feat(phase): Complete Phase 4 - Content Model Architecture (v0.4.0)
   ```

4. **Create Tag**
   ```bash
   git tag v0.4.0
   ```

### 2. Patch Releases

For bug fixes and minor improvements:

1. **Fix Implementation**

   ```bash
   fix(sanity): resolve draft mode authentication issue
   ```

2. **Version Bump**

   ```bash
   chore: bump version to 0.4.1
   ```

3. **Documentation Update**

   ```bash
   docs: update CHANGELOG.md for v0.4.1
   ```

4. **Create Tag**
   ```bash
   git tag v0.4.1
   ```

## Documentation Updates Required

### For Every Release

Always update these files in order:

1. **CHANGELOG.md** - Add new version entry with detailed changes
2. **PLAN.md** - Update phase completion status if applicable
3. **README.md** - Update current state and implemented features
4. **package.json** - Version number (automated with bump commit)

### CHANGELOG Format

```markdown
## v0.4.0

- Complete Phase 4 - Content Model Architecture
  - Feature 1 description
  - Feature 2 description
  - Feature 3 description
- Additional changes
- More details
```

## Progress Tracking

### Phase Progress

Track progress in PLAN.md:

- Completed phases
- Current phase in development
- Planned phases

### Implementation Status

In README.md:

- Implemented features
- In development
- Planned features

## Quality Gates

### Pre-Commit Checks

All commits must pass:

```bash
pnpm run lint      # Biome formatting and linting
pnpm run build     # Next.js build
pnpm run sanity:typegen  # Sanity type generation
```

### Pre-Release Checks

Before creating a release tag:

1. All tests pass
2. Build succeeds
3. Documentation is updated
4. CHANGELOG is complete
5. Version is bumped in package.json

## Template-Specific Rules

### What to Commit

- Architecture improvements
- Tooling enhancements
- CMS model improvements
- Performance optimizations
- Documentation updates
- Bug fixes

### What NOT to Commit

- Real content or demo data
- Branding or client-specific logic
- One-off hacks or temporary fixes
- SaaS features specific to one use case

### Breaking Changes

- Require major version bump (0.x.x → 1.x.x)
- Must be documented in CHANGELOG
- Must update UPGRADING.md
- Should be avoided when possible

## Development Workflow

### Feature Development

1. Create feature branch from main
2. Implement changes following commit rules
3. Update documentation as needed
4. Run quality gates
5. Open pull request
6. Merge to main after review

### Phase Completion

1. Ensure all phase tasks are complete
2. Update all documentation files
3. Bump version in package.json
4. Create comprehensive changelog entry
5. Create git tag
6. Update PLAN.md phase status

### Emergency Fixes

1. Create hotfix branch from latest tag
2. Implement fix with proper commit message
3. Bump patch version
4. Update changelog
5. Create new tag
6. Merge back to main

## Commit Message Validation

### Required Format

- Type must be one of: feat, fix, docs, style, refactor, test, chore, perf
- Scope should be relevant to the change
- Description should be concise and clear
- Phase completions must include version number

### Examples of Good Commits

```bash
feat(phase): Complete Phase 4 - Content Model Architecture (v0.4.0)
fix(sanity): resolve draft mode authentication issue
docs: update CHANGELOG.md for v0.4.0
refactor(config): optimize build setup
chore: bump version to 0.4.1
```

### Examples of Bad Commits

```bash
fixed stuff
update docs
wip
bug fix
add feature
```

## Release Automation

### Manual Release Steps

1. Ensure all changes are committed
2. Update package.json version
3. Update CHANGELOG.md
4. Update PLAN.md if phase complete
5. Update README.md if needed
6. Create git tag: `git tag v0.4.0`
7. Push tag: `git push origin v0.4.0`

### Version Bump Commands

```bash
# Patch version (0.4.0 → 0.4.1)
npm version patch

# Minor version (0.4.0 → 0.5.0)
npm version minor

# Major version (0.4.0 → 1.0.0)
npm version major
```

## Checklist for Commits

### Before Committing

- [ ] Code follows project conventions
- [ ] Linting passes (`pnpm run lint`)
- [ ] Build succeeds (`pnpm run build`)
- [ ] Tests pass (if applicable)
- [ ] Documentation is updated if needed
- [ ] Commit message follows format

### Before Release

- [ ] All quality gates pass
- [ ] CHANGELOG.md is updated
- [ ] PLAN.md is updated if phase complete
- [ ] README.md reflects current state
- [ ] Version is bumped in package.json
- [ ] Git tag is created
- [ ] Tag is pushed to remote

## History & Context

This commit system is based on:

- **Semantic Versioning** for predictable releases
- **Phase-based development** for structured progress
- **Conventional Commits** for clear history
- **Template-first approach** for reusability

The current version (v0.4.0) represents the completion of Phase 4 - Content Model Architecture, with comprehensive schemas, validation, and relationships ready for page builder implementation.
