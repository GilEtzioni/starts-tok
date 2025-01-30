import dotenv from "dotenv";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

dotenv.config();

const requiredEnvVars = ["DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT", "DB_NAME"];
for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
}

const dbCredentials = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME!,
};

const pool = new Pool({
    ...dbCredentials,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on("connect", (client) => {
    client.query("SET idle_in_transaction_session_timeout = 60000;");
});

process.on("SIGTERM", async () => {
    console.log("Closing database connection...");
    await pool.end();
    console.log("Database connection closed.");
    process.exit(0);
});

process.on("SIGINT", async () => {
    console.log("Closing database connection...");
    await pool.end();
    console.log("Database connection closed.");
    process.exit(0);
});

export const db = drizzle(pool, { schema });