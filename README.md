# [Next 14 starters with authentication and database set up](https://saasyland.com)

#### See the live demo [here](https://saasyland.com)

## Description:

Starter templates for [Next.js 14](https://nextjs.org/) full-stack projects. Built with [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCn/ui](https://ui.shadcn.com/), authentication, and database. Several branches contain several different configurations, including serverless databases like PostgreSQL with [Neon](https://neon.tech), or MySQL with [PlanetScale](https://planetscale.com), [Drizzle ORM](https://orm.drizzle.team/), [Prisma ORM v.5](https://www.prisma.io/) (serverless-compatible), but also [MongoDB Atlas](https://www.mongodb.com/atlas/database), [Supabase](https://supabase.com/), and even [Nest.js](https://nestjs.com/), [Express (MERN stack)](https://expressjs.com/), or [Django](https://www.djangoproject.com/). All users are stored in a database, regardless of whether they signed up with email and password, magic link, or via an OAuth provider, such a Google or GitHub.

<br />

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

<br />

## Available configurations:

- ### [next-auth-drizzle-neon-postgres](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/next-auth-drizzle-planetscale-mysql)

This branch contains a Next.js 14 starter with Next-Auth authentication using JSON Web Tokens (JWT), and a PostgreSQL database set up at [Neon](https://neon.tech). The database is connected with [Drizzle ORM](https://orm.drizzle.team), which is serverless-compatible. OAuth authentication is also set up for GitHub and Google providers. The set up contains email verification and password reset functionality, both set up with [Resend](https://resend.com) and [React Email](https://react).

- ### [next-auth-drizzle-planetscale-mysql](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/next-auth-drizzle-planetscale-mysql)

This branch contains a Next.js 14 starter with Next-Auth authentication using JSON Web Tokens (JWT), and a MySQL database set up at [PlanetScale](https://planetscale.com). The database is connected with [Drizzle ORM](https://orm.drizzle.team/), which is serverless-compatible. OAuth authentication is also set up for GitHub and Google providers. The set up contains email verification and password reset functionality, both set up with [Resend](https://resend.com) and [React Email](https://react.email/).

- ### [next-auth-prisma5-serverless-neon-postgres](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/next-auth-prisma5-serverless-neon-postgres)

This branch contains a Next.js 14 starter with Next-Auth authentication using JSON Web Tokens (JWT), and a PostgreSQL database set up at [Neon](https://neon.tech). The database is connected via [Prisma](https://prisma.io) v.5, which is serverless-compatible. OAuth authentication is also set up for GitHub and Google. The set up contains email verification and password reset functionality, both set up with [Resend](https://resend.com) and [React Email](https://react.email/).

- ### [next-auth-prisma5-serverless-planetscale-mysql](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/next-auth-prisma5-serverless-planetscale-mysql)

This branch contains a Next.js 14 starter with Next-Auth authentication using JSON Web Tokens (JWT), and a MySQL database set up at [PlanetScale](https://planetscale.com). The database is connected via [Prisma](https://prisma.io) v.5, which is serverless-compatible. OAuth authentication is also set up for GitHub and Google. The set up contains email verification and password reset functionality, both set up with [Resend](https://resend.com) and [React Email](https://react.email/).

- ### [next-auth-docker-local-postgres-drizzle](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/next-auth-docker-local-postgres-drizzle)

Under construction

- ### [next-auth-docker-local-postgres-prisma](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/next-auth-docker-local-postgres-prisma)

Under construction

- ### [next-auth-mongoose-mongodb](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/next-auth-mongoose-mongodb)

Under construction

- ### [nestjs-nextjs-next-auth-prisma-sqlite](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/nestjs-nextjs-next-auth-prisma-sqlite)

Under construction

- ### [nestjs-nextjs-next-auth-drizzle-sqlite](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/nestjs-nextjs-next-auth-drizzle-sqlite)

Under construction

- ### [mern-nextjs-redux](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/mern-nextjs-redux)

Under construction

- ### [mern-vite-plain-react-redux](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/mern-vite-plain-react-redux)

Under construction

- ### [next-auth-supabase-postgres](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/next-auth-supabase-postgres)

Under construction

- ### [supabase-postgres](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/supabase-postgres)

Under construction

- ### [django-rest-djoser-digital-ocean-spaces-aws-ses-next-redux](https://github.com/pjborowiecki/SAASY-LAND-Next-14-Starters-With-Authentication-And-Database-Implemented/tree/django-rest-djoser-digital-ocean-spaces-aws-ses-next-redux)

Under construction
