# [Next 13 starters with authentication and database set up](https://saasyland.com)

Starter templates for [Next.js 13](https://nextjs.org/) full-stack projects. Built with [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCn/ui](https://ui.shadcn.com/), authentication, and database. Several branches contain several different configurations, including serverless databases like PostgreSQL with [Neon](https://neon.tech), or MySQL with [PlanetScale](https://planetscale.com), [Drizzle ORM](https://orm.drizzle.team/), [Prisma ORM v.5](https://www.prisma.io/) (serverless-compatible), but also [MongoDB Atlas](https://www.mongodb.com/atlas/database), [Supabase](https://supabase.com/), and even [Nest.js](https://nestjs.com/), [Express (MERN stack)](https://expressjs.com/), or [Django](https://www.djangoproject.com/). All users are stored in a database, regardless of whether they signed up with email and password, magic link, or via an OAuth provider.

**The project is currently under active development and is not ready for production use. Please check back soon**

![public/images/screenshots/screenshot_1](./public/images/screenshots/screenshot_1.png)

![public/images/screenshots/screenshot_2](./public/images/screenshots/screenshot_2.png)

![public/images/screenshots/screenshot_3](./public/images/screenshots/screenshot_3.png)

![public/images/screenshots/screenshot_4](./public/images/screenshots/screenshot_4.png)

## Postgresql at [Neon](https://neon.tech) with [Prisma](https://prisma.io) v.5 (serverless-compatible)

This branch contains a Next.js 13 starter with Next-Auth authentication using JSON Web Tokens (JWT), and a MySQL database set up at [PlanetScale](https://planetscale.com). The database is connected via [Prisma v.5](https://prisma.io), which is now serverless-compatible. OAuth authentication is also set up for GitHub and Google providers. The set up contains email verification and password reset functionality, both set up with [Resend](https://resend.com) and [React Email](https://react.email/).

#### TODO:

- [ ] Set up database connection
- [ ] Define database schema
- [ ] Set up authentication with Next-Auth and connect to database
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
