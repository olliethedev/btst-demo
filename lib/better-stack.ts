import { createKyselyAdapter } from "@btst/adapter-kysely"
import { betterStack } from "@btst/stack"
import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"
import { todosBackendPlugin } from "./plugins/todo/api/backend"

// Configure PostgreSQL connection based on Docker setup
const dialect = new PostgresDialect({
    pool: new Pool({
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT || "5432", 10),
        database: process.env.DATABASE_NAME || "better_stack",
        user: process.env.DATABASE_USER || "user",
        password: process.env.DATABASE_PASSWORD || "password"
    })
})

// Create Kysely instance
// biome-ignore lint/suspicious/noExplicitAny: lib limitation
const kysely = new Kysely<any>({
    dialect
})

// Convert Better DB schema to Better Auth schema format
// const schema = db.toBetterAuthSchema();

const { handler, dbSchema } = betterStack({
    plugins: {
        todos: todosBackendPlugin
    },
    adapter: (db) => createKyselyAdapter(kysely, db)({})
})

export { handler, dbSchema }
