# Next 13 starters with authentication and database set up

Starter templates for Next.js 13 full-stack projects. Built with Tailwind CSS, ShadCn, authentication, and database. Several branches contain several different configurations, including serverless databases like PostgreSQL with Neon, or MySQL with PlanetScale, Drizzle ORM, Prisma ORM v.5 (serverless-compatible), but also MongoDB and Supabase.

### MySQL at [PlanetScale](https://planetscale.com)

This branch contains a Next.js 13 starter with authentication and a MySQL database at [PlanetScale](https://planetscale.com). It uses Prisma 5 as an ORM, which is serverless-compatible.

#### CommandsL

- `npx prisma init`
- `npx prisma generate`
- `npx prisma migrate dev --name init`

## NOTES:

- This configuration does not work yet. It is a work in progress. There is an error: P3014:
  "Prisma Migrate could not create the shadow database. Please make sure the database user has permission to create databases. Read more about the shadow database (and workarounds) at https://pris.ly/d/migrate-shadow

Original error:
VT12001: unsupported: create database by failDBDDL
0: schema_core::state::DevDiagnostic
at schema-engine/core/src/state.rs:270"
