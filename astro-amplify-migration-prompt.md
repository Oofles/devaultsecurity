# Website Migration: Hugo → Astro Sphere on AWS Amplify

## Project Overview

Migrate my personal/professional website from Hugo to Astro using the **Astro Sphere** theme, deployed via **AWS Amplify**. This is a cybersecurity professional portfolio site for Brandon DeVault, including a consulting practice (DeVault Security).

**Theme Repository:** https://github.com/markhorn-dev/astro-sphere  
**Theme Demo:** https://astro-sphere-demo.vercel.app/  
**Domain:** devaultsecurity.com  
**DNS:** Route 53 (already configured in AWS)

---

## Current State

- **Framework:** Hugo (abandoning due to build issues)
- **Old Hosting:** S3 + CloudFront (has unresolvable SSL certificate issues)
- **New Hosting:** AWS Amplify (handles SSL automatically)
- **Content:** Existing Markdown blog posts that need to be migrated

---

## Target Site Structure

```
/                     → Landing page with professional intro
/about                → Work experience, Pluralsight courses, speaking engagements
/blog                 → Blog listing with individual post pages
/resources            → Curated cybersecurity resources
/services             → DeVault Security consulting/pentesting offerings
```

### Section Details

#### Home (`/`)
- Professional hero section
- Brief intro as a cybersecurity professional and content creator
- Quick links to key sections

#### About (`/about`)
- **Work Experience:** Professional history/resume content
- **Pluralsight Courses:** List of authored courses (I'm a contract content creator)
- **Speaking Engagements:** Conference talks and presentations with dates/venues

#### Blog (`/blog`)
- Migrate existing Hugo blog posts
- Maintain existing frontmatter where compatible (title, date, tags, description)
- Cybersecurity-focused content

#### Resources (`/resources`)
- Curated list of cybersecurity tools, references, and learning materials
- Organized by category (e.g., OSINT, Pentesting, Certifications, etc.)

#### Services (`/services`)
- DeVault Security LLC branding
- Consulting offerings
- Penetration testing services
- Contact/inquiry information

---

## Deployment: AWS Amplify

### Why Amplify (instead of S3 + CloudFront)
- Automatic SSL certificate provisioning and renewal
- Built-in CI/CD — no GitHub Actions needed
- Auto-detects Astro and configures build settings
- Simpler architecture, less to maintain

### Amplify Setup Steps

1. **Create Amplify App**
   - Go to AWS Amplify console
   - Click "New app" → "Host web app"
   - Connect to GitHub repository
   - Select the repo containing the Astro site

2. **Build Settings**
   Amplify should auto-detect Astro. If not, use:
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

3. **Custom Domain**
   - In Amplify console → Domain management
   - Add domain: `devaultsecurity.com`
   - Amplify will provide DNS records to add to Route 53
   - May auto-configure if it detects Route 53 in the same account
   - SSL certificate is provisioned automatically

4. **Environment Variables** (if needed)
   - Set any build-time environment variables in Amplify console
   - `SITE_URL=https://devaultsecurity.com`

### DNS Transition
- Current: Route 53 points to old CloudFront distribution
- After Amplify setup: Update Route 53 to point to Amplify
- Amplify provides the records needed

---

## Technical Requirements

### Repository Structure
```
/
├── src/
│   ├── content/
│   │   ├── blog/          # Markdown blog posts
│   │   ├── projects/      # Portfolio items (if using)
│   ├── pages/
│   │   ├── about.astro
│   │   ├── resources.astro
│   │   ├── services.astro
│   └── ...
├── public/                 # Static assets
├── astro.config.mjs
└── package.json
```

### Migration Tasks

1. **Initialize Astro Sphere**
   - Clone/fork the theme into a new repo (or the existing devaultsecurity repo)
   - Configure `astro.config.mjs` for static output
   - Update site metadata in config (site URL, title, description)

2. **Migrate Blog Content**
   - Copy existing Markdown posts from Hugo `content/` directory
   - Adjust frontmatter to match Astro Sphere's content collection schema
   - Verify all posts render correctly with `npm run dev`

3. **Create New Pages**
   - Build out `/about`, `/resources`, and `/services` pages
   - Use the theme's existing page components as templates

4. **Configure Navigation**
   - Update nav to include: Home, About, Blog, Resources, Services

5. **Connect to Amplify**
   - Push to GitHub
   - Create Amplify app connected to the repo
   - Configure custom domain
   - Verify automatic deployments work

6. **DNS Cutover**
   - Update Route 53 records to point to Amplify
   - Verify SSL is working
   - Test site at devaultsecurity.com

7. **Cleanup**
   - Delete old CloudFront distribution
   - Delete old S3 bucket (after confirming new site works)
   - Delete old ACM certificates

---

## AWS Access

I can provide a read-only AWS access key if helpful for:
- Verifying Amplify configuration
- Checking Route 53 records
- Confirming old resources to clean up

Let me know if you need this.

---

## Content I'll Provide

- Existing Hugo blog posts (Markdown files)
- About me content (work history, courses, speaking)
- Resources list
- Services/consulting copy
- Any logo or branding assets

---

## Preferences

- **Static output only** — no SSR
- **Minimal dependencies** — keep it simple and maintainable
- **Dark/light mode** — preserve theme's toggle functionality
- **SEO-friendly** — maintain/improve meta tags, sitemap, RSS
- **Automatic deployments** — push to main = deploy to production

---

## Getting Started

1. First, examine the Astro Sphere theme structure by cloning the repo
2. Review the theme's documentation in the README and blog posts (they serve as docs)
3. Set up the project scaffolding
4. Get a basic version deployed to Amplify to verify the pipeline works
5. Then migrate content incrementally, starting with the blog

Let me know when you're ready to begin, and I'll share my existing Hugo content directory.
