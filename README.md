# [Next 13 starters with authentication and database set up](https://saasyland.com)

Starter templates for [Next.js 13](https://nextjs.org/) full-stack projects. Built with [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCn/ui](https://ui.shadcn.com/), authentication, and database. Several branches contain several different configurations, including serverless databases like PostgreSQL with [Neon](https://neon.tech), or MySQL with [PlanetScale](https://planetscale.com), [Drizzle ORM](https://orm.drizzle.team/), [Prisma ORM v.5](https://www.prisma.io/) (serverless-compatible), but also [MongoDB Atlas](https://www.mongodb.com/atlas/database), [Supabase](https://supabase.com/), and even [Nest.js](https://nestjs.com/), [Express (MERN stack)](https://expressjs.com/), or [Django](https://www.djangoproject.com/). All users are stored in a database, regardless of whether they signed up with email and password, magic link, or via an OAuth provider.

**The project is currently under active development and is not ready for production use. Please check back soon**

![public/images/screenshots/screenshot_1](./public/images/screenshots/screenshot_1.png)

![public/images/screenshots/screenshot_2](./public/images/screenshots/screenshot_2.png)

![public/images/screenshots/screenshot_3](./public/images/screenshots/screenshot_3.png)

![public/images/screenshots/screenshot_4](./public/images/screenshots/screenshot_4.png)

## Postgresql at [Neon](https://neon.tech) with [Prisma](https://prisma.io) v.5 (serverless-compatible)

This branch contains a Next.js 13 starter with Next-Auth authentication using JSON Web Tokens (JWT), and a PostgreSQL database set up at [Neon](https://neon.tech). The database is connected via [Prisma v.5](https://prisma.io), which is now serverless-compatible. OAuth authentication is also set up for GitHub and Google providers. The set up contains email verification and password reset functionality, both set up with [Resend](https://resend.com) and [React Email](https://react.email/).

#### TODO:

- [x] Implement sign up with email and password
- [x] Implement sign in with email and password
- [x] Implement sign out functionality
- [x] Set up OAuth sign in with GitHub and Google
- [x] Set up email verification
- [x] Set up password reset
- [x] Set up sign in with magic link
- [x] Improve email templates with [React Email](https://react.email/)
- [x] Fix linting warnings
- [ ] Set up a user profile page with a form to update user information
- [ ] Set up file upload for user profile pictures
- [ ] Complete the landing page sections and footer
- [ ] Add terms of service and privacy policy pages
- [ ] Set up a newsletter sign up
- [ ] Add contact form
- [ ] Implement payments with [Stripe](https://stripe.com)
- [ ] Set up blogging with Markdown and MDX (or [Payload 2](https://payloadcms.com/) and [Lexical](https://lexical.dev/))
