# Next 13 starters with authentication and database set up

Starter templates for Next.js 13 full-stack projects. Built with Tailwind CSS, ShadCn, authentication, and database. Several branches contain several different configurations, including serverless databases like PostgreSQL with Neon, or MySQL with PlanetScale, Drizzle ORM, Prisma ORM v.5 (serverless-compatible), but also MongoDB and Supabase.

### PostgreSQL at [Neon](https://neon.tech) with [Drizzle ORM](https://orm.drizzle.team/)

This branch contains a Next.js 13 starter with [Next-Auth](https://next-auth.js.org/) authentication and a PostgreSQL database at [Neon](https://neon.tech). It uses the official Drizzle adapter from Next-Auth, overwritten to automatically create a username during sign up.

#### Commands:

- `npm run db:check` (equivalent to `drizzle-kit check:pg`)
- `npm run db:generate` (equivalent to `drizzle-kit generate:pg`)
- `npm run db:push` (equivalent to `drizzle-kit push:pg`)
- `npm run db:introspect` (equivalent to `drizzle-kit introspect:pg`)
- `npm run db:studio` (equivalent to `drizzle-kit studio --port 4000 --verbose`)
