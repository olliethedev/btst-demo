# BTST Demo

Project uses @btst/stack and creates a simple plugin for a todo list.

## Getting Started

```bash
npm install
npm run dev
```

## Generate db schema

```bash
npx btst generate --config=lib/better-db.ts --orm=kysely --output=kysely.sql --database-url=postgresql://user:password@localhost:5432/better_stack  --filter-auth
```
Available ORMs:
- kysely (any dialect)
- drizzle
- prisma

