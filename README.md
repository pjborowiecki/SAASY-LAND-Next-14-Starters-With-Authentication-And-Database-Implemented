# [Next 13 starters with authentication and database set up](https://saasyland.com)

Starter templates for Next.js 13 full-stack projects. Built with Tailwind CSS, ShadCn, authentication, and database. Several branches contain several different configurations, including serverless databases like PostgreSQL with Neon, or MySQL with PlanetScale, Drizzle ORM, Prisma ORM v.5 (serverless-compatible), but also MongoDB and Supabase.

**The project is currently under active development and is not ready for production use. Please check back soon**

![public/images/screenshots/screenshot_1](./public/images/screenshots/screenshot_1.png)

![public/images/screenshots/screenshot_2](./public/images/screenshots/screenshot_2.png)

![public/images/screenshots/screenshot_3](./public/images/screenshots/screenshot_3.png)

![public/images/screenshots/screenshot_3](./public/images/screenshots/screenshot_4.png)

## Postgresql at [Neon](https://neon.tech) with [Prisma](https://prisma.io) v.5 (serverless-compatible)

This branch contains a Next.js 13 starter with Next-Auth authentication using JSON Web Tokens (JWT), and a PostgreSQL database set up at [Neon](https://neon.tech). The database is connected via [Prisma](https://prisma.io) v.5, which is serverless-compatible. OAuth authentication is also set up for GitHub and Google. The set up contains email verification and password reset functionality, both set up with [Resend](https://resend.com) and [React Email](https://react.email/). The project is written in TypeScript, styled with [Tailwind CSS](https://tailwindcss.com) and [ShadCn](https://shadcn.com).

#### TODO:

- [x] Implement sign up with email and password
- [x] Implement sign in with email and password
- [x] Implement sign out functionality
- [x] Set up OAuth sign in with GitHub and Google
- [x] Set up email verification
- [x] Set up password reset
- [x] Set up sign in with magic link
- [x] Improve email templates with [React Email](https://react.email/)
- [ ] Add welcome email to the sign up flow
- [ ] Fix TypeScript warnings
- [ ] Set up a user profile page with a form to update user information
- [ ] Set up file upload for user profile pictures
- [ ] Complete the landing page sections and footer
- [ ] Add terms of service and privacy policy pages
- [ ] Set up a newsletter sign up
- [ ] Add contact form
- [ ] Implement payments with [Stripe](https://stripe.com)
- [ ] Set up blogging with Markdown and MDX (or [Payload 2](https://payloadcms.com/) and [Lexical](https://lexical.dev/))

#### NOTES:

- Adding username:

  - https://www.youtube.com/watch?v=bicCg4GxOP8
  - https://www.youtube.com/watch?v=Ev8FceRvBmA
