import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "DeVault Security",
  DESCRIPTION: "Cybersecurity professional, content creator, and consultant specializing in threat hunting, incident response, and security operations.",
  AUTHOR: "Brandon DeVault",
}

// Work Page
export const WORK: Page = {
  TITLE: "About",
  DESCRIPTION: "Work experience, speaking engagements, and professional background.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Technical writing on cybersecurity, threat hunting, incident response, and security operations.",
}

// Projects Page
export const PROJECTS: Page = {
  TITLE: "Resources",
  DESCRIPTION: "Curated cybersecurity tools, references, and learning materials.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and resources by keyword.",
}

// Services Page (custom addition)
export const SERVICES: Page = {
  TITLE: "Services",
  DESCRIPTION: "DeVault Security consulting and penetration testing services.",
}

// Links
export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: "/",
  },
  {
    TEXT: "About",
    HREF: "/work",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
  {
    TEXT: "Resources",
    HREF: "/projects",
  },
  {
    TEXT: "Services",
    HREF: "/services",
  },
]

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "brandondevault",
    HREF: "https://www.linkedin.com/in/brandondevault/",
  },
  {
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "SolderSwag",
    HREF: "https://twitter.com/SolderSwag",
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "Oofles",
    HREF: "https://github.com/Oofles"
  },
]

