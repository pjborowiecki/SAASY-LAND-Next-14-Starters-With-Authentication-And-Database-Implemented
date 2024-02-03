# [Next 14 starters with authentication and database set up](https://saasyland.com)

#### See the live demo [here](https://saasyland.com)

## Description:

Starter templates for [Next.js 14](https://nextjs.org/) full-stack projects. Built with [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCn/ui](https://ui.shadcn.com/), authentication, and database. Several branches contain several different configurations, including serverless databases like PostgreSQL with [Neon](https://neon.tech), or MySQL with [PlanetScale](https://planetscale.com), [Drizzle ORM](https://orm.drizzle.team/), [Prisma ORM v.5](https://www.prisma.io/) (serverless-compatible), but also [MongoDB Atlas](https://www.mongodb.com/atlas/database), [Supabase](https://supabase.com/), and even [Nest.js](https://nestjs.com/), [Express (MERN stack)](https://expressjs.com/), or [Django](https://www.djangoproject.com/). All users are stored in a database, regardless of whether they signed up with email and password, magic link, or via an OAuth provider, such a Google or GitHub.

#### MySQL at [PlanetScale](https://planetscale.com) with [Prisma](https://prisma.io) v.5 (serverless-compatible)

This branch contains a Next.js 14 starter with Next-Auth v.5 authentication using JSON Web Tokens (JWT), and a MySQL database set up at [PlanetScale](https://planetscale.com). The database is connected via [Prisma v.5](https://prisma.io), which is now serverless-compatible. OAuth authentication is also set up for GitHub and Google providers. The set up contains email verification and password reset functionality, both set up with [Resend](https://resend.com) and [React Email](https://react.email/).

> **Warning**
> This project is still in active development. See a feature list below to get a better understanding of what has been implemented to date and what is yet to come.

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

### NOTES:

To use PlanetScale's MySQL database with Prisma, it is necessary to create a shadow database. See [https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database) for more information.

**PlanetScale does not support the use of foreign keys**. The use of Prisma's `@relation` is discouraged by Prisma itself with the following message: "With `relationMode = "prisma"`, no foreign keys are used, so relation fields will not benefit from the index usually created by the relational database under the hood. This can lead to poor performance when querying these fields. We recommend adding an index manually. Learn more at [https://pris.ly/d/relation-mode-prisma-indexes](https://pris.ly/d/relation-mode-prisma-indexes)". The schema in this branch has been updated to reflect this.

See the following resources for more information on this:

- [Operating without foreign key constraints (PlanetScale guides)](https://planetscale.com/docs/learn/operating-without-foreign-key-constraints#:%7E:text=PlanetScale%20doesn%27t%20support%20FOREIGN%20KEY%20constraints)
- [Prisma best practices (PlanetScale guides)](https://planetscale.com/docs/prisma/prisma-best-practices)
- [Using Prisma with PlanetScale (Prisma docs)](https://www.prisma.io/docs/guides/database/planetscale#how-to-emulate-relations-in-prisma-client)
- [Relation mode (Prisma docs)](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode#indexes)

In short, with Prisma you can still maintain foreign key relationships in your data and allow the use of [referential actions](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-actions) by using Prisma's ability to [emulate relations in Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode#emulate-relations-in-prisma-with-the-prisma-relation-mode) with the prisma relation mode. For more information, see [How to emulate relations in Prisma Client](https://www.prisma.io/docs/guides/database/planetscale#how-to-emulate-relations-in-prisma-client).

Prisma recommends not using `prisma migrate` when making schema changes with PlanetScale. Instead, we recommend that you use the `prisma db push` command. Scripts in the package.json file have been updated to reflect this.
