# [Next 14 starters with authentication and database set up](https://saasyland.com)

#### See the live demo [here](https://saasyland.com)

## Description:

Starter templates for [Next.js 14](https://nextjs.org/) full-stack projects. Built with [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCn/ui](https://ui.shadcn.com/), authentication, and database. Several branches contain several different configurations, including serverless databases like PostgreSQL with [Neon](https://neon.tech), or MySQL with [PlanetScale](https://planetscale.com), [Drizzle ORM](https://orm.drizzle.team/), [Prisma ORM v.5](https://www.prisma.io/) (serverless-compatible), but also [MongoDB Atlas](https://www.mongodb.com/atlas/database), [Supabase](https://supabase.com/), and even [Nest.js](https://nestjs.com/), [Express (MERN stack)](https://expressjs.com/), or [Django](https://www.djangoproject.com/). All users are stored in a database, regardless of whether they signed up with email and password, magic link, or via an OAuth provider.

### PostgreSQL at [Neon](https://neon.tech) with [Drizzle](https://orm.drizzle.team)

This branch contains a Next.js 14 starter with Next-Auth authentication using JSON Web Tokens (JWT), and a PostgreSQL database set up at [Neon](https://neon.tech). The database is connected with [Drizzle ORM](https://orm.drizzle.team/), which is serverless-compatible. OAuth authentication is also set up for GitHub and Google providers. **This branch takes advantage of [prepared statements](https://orm.drizzle.team/docs/perf-queries), which are designed to massively improve query performance.** The set up contains email verification and password reset functionality, both set up with [Resend](https://resend.com) and [React Email](https://react.email/).

<br />

> **Warning**
> This project is still in active development.
>
> It uses new technologies (server actions, serverless database connection, etc. ), which are subject to change and may break your application.
> It is not recommended to use this project in production yet.

<br />

## Features:

- [x] Authentication with NextAuth
- [x] Database and ORM set up
- [x] Magic link authentication
- [x] OAuth authentication
- [x] Email and password authentication
- [x] Email verification
- [x] Password reset
- [x] Email templates with React Email
- [x] Functional contact form
- [x] Functional newsletter sign up
- [x] Functional blog with Contentlayer and MDX
- [x] Functional and styled landing page with pricing, features, testimonials, and FAQ sections
- [x] Functional and styled sign in and sign up pages
- [x] Input validation with Zod
- [x] Rigorous linting and TypeScript type checking

<br />

- [ ] Documentation pages
- [ ] Stripe payments integration
- [ ] Opt out from newsletter
- [ ] User profile and settings pages
- [ ] Custom loading pages with skeleton loaders
- [ ] Custom error pages
- [ ] Add pages for menu items
- [ ] Improve MDX blog styling
- [ ] Improve performance and make Edge compatible
- [ ] Add tests

<br />

![public/images/screenshots/screenshot_1](./public/images/screenshots/screenshot_1.png)

![public/images/screenshots/screenshot_2](./public/images/screenshots/screenshot_2.png)

![public/images/screenshots/screenshot_3](./public/images/screenshots/screenshot_3.png)

![public/images/screenshots/screenshot_4](./public/images/screenshots/screenshot_4.png)
