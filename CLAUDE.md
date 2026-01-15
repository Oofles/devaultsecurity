# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal security professional website for Brandon DeVault (DeVaultSecurity) built with **Astro** using the **Astro Sphere** theme. The site showcases security research, blog posts, work experience, curated resources, and consulting services.

## Key Technologies

- **Astro**: Static site generator with component-based architecture
- **Astro Sphere Theme**: Minimalist, lightweight portfolio and blog theme
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **SolidJS**: Minimal interactive components
- **Deployment**: AWS Amplify (automatic builds and SSL)

## Development Commands

### Running the Site Locally

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Development server runs at http://localhost:4321/
```

### Building the Site

```bash
# Type-check and build for production (outputs to ./dist/)
npm run build

# Preview production build locally
npm run preview

# Generate TypeScript types for Astro modules
npm run sync
```

## Repository Structure

```
src/
├── components/          # Reusable Astro/Solid components
├── content/            # Content collections (Markdown/MDX)
│   ├── blog/          # Blog posts (migrated from Hugo)
│   ├── work/          # Work experience entries
│   └── legal/         # Legal pages (privacy, terms)
├── layouts/           # Page layout templates
├── pages/             # Route-based pages
│   ├── blog/         # Blog listing and individual posts
│   ├── work/         # About page with bio and experience
│   ├── services/     # DeVault Security consulting page
│   ├── projects/     # Resources page (training resources)
│   ├── search/       # Search functionality
│   └── index.astro   # Homepage
├── consts.ts          # Site configuration and metadata
├── types.ts           # TypeScript type definitions
└── styles/            # Global styles

public/                 # Static assets (images, fonts, etc.)
dist/                   # Build output (generated, not committed)
astro.config.mjs       # Astro configuration
tailwind.config.mjs    # Tailwind CSS configuration
tsconfig.json          # TypeScript configuration
```

## Site Structure

- **Home** (`/`) - Landing page with professional intro
- **About** (`/work`) - Bio, work experience, and speaking engagements
- **Blog** (`/blog`) - Technical security blog posts
- **Resources** (`/projects`) - Curated cybersecurity training resources
- **Services** (`/services`) - DeVault Security consulting services
- **Search** (`/search`) - Search across blog posts and resources

## Content Architecture

### Configuration (`src/consts.ts`)

Contains site metadata, page descriptions, navigation links, and social media profiles:
- `SITE`: Global site title, description, and author
- `WORK`, `BLOG`, `PROJECTS`, `SERVICES`: Page metadata
- `LINKS`: Navigation menu items
- `SOCIALS`: Social media links (LinkedIn, Twitter, GitHub)

### Content Collections

Defined in `src/content/config.ts`:

1. **blog** - Blog posts with schema:
   - `title`: string
   - `summary`: string
   - `date`: date
   - `tags`: string[]
   - `draft`: boolean (optional)

2. **work** - Work experience with schema:
   - `company`: string
   - `role`: string
   - `dateStart`: date
   - `dateEnd`: date or "Present"

3. **legal** - Legal pages (privacy policy, terms)

## Deployment

### AWS Amplify Setup

The site is configured for deployment via AWS Amplify:

1. **Create Amplify App**:
   - Connect to GitHub repository
   - Amplify auto-detects Astro and configures build settings

2. **Build Settings** (auto-detected):
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Custom Domain**:
   - Add `devaultsecurity.com` in Amplify Domain Management
   - Update Route 53 DNS records as instructed by Amplify
   - SSL certificate provisioned automatically

4. **Environment Variables**:
   - Site URL is configured in `astro.config.mjs`

### Continuous Deployment

- Pushes to `master` branch trigger automatic builds
- Amplify builds the site using Node.js and deploys to CDN
- CloudFront invalidation handled automatically

## Migration Notes

This site was migrated from Hugo to Astro in January 2025:
- Hugo content backed up in `hugo-content-backup/` (not committed)
- All blog posts migrated with frontmatter conversion
- Image paths updated from `/static/` to `/`
- Work experience pulled from Hugo about page
- Training resources consolidated into Resources page

## Common Workflows

### Adding a New Blog Post

1. Create directory: `src/content/blog/post-slug/`
2. Add `index.md` with frontmatter:
   ```yaml
   ---
   title: "Post Title"
   summary: "Brief description"
   date: "2025-01-14"
   tags:
   - Tag1
   - Tag2
   draft: false
   ---
   ```
3. Write content in Markdown
4. Test with `npm run dev`
5. Build with `npm run build`

### Adding Work Experience

Create file in `src/content/work/company-name.md`:
```yaml
---
company: "Company Name"
role: "Job Title"
dateStart: "2023-01-01"
dateEnd: "Present"
---

Description of role and accomplishments.
```

### Updating Site Metadata

Edit `src/consts.ts` to update:
- Site title and description
- Navigation links
- Social media profiles
- Page descriptions

## Important Notes

- Astro generates static HTML at build time
- Blog posts support Markdown and MDX
- The site is fully static (no server-side rendering)
- Images should be placed in `public/` directory
- The sitemap plugin may show warnings but doesn't affect functionality
- All external links use `target="_blank" rel="noopener noreferrer"`
