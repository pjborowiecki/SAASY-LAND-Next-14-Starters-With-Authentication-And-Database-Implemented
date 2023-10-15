const links = {
  github:
    "https://github.com/pjborowiecki/next-13-starter-with-authentication-and-database-implemented",
  twitter: "https://twitter.com/pjborowiecki",
  linkedin: "https://www.linkedin.com/in/pjborowiecki",
  discord: "",
}

export const siteConfig = {
  name: "SaaSy Land",
  description:
    "An open source starter for Next.js 13 full-stack projects with advanced authentication and several database configurations. The aim of this project is to provide a solid foundation for faster building and launching SaaS products, marketing sites, blogs, and more.",
  links,
  url: "https://saasyland.com",
  // ogImage: "https://saasyland.com/opengraph-image.png",
  hostingRegion: "fra1",
  navItems: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Features",
      href: "/features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  navItemsMobile: [],
  navItemsFooter: [],
}
