import dotenv from "dotenv";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

dotenv.config();

const dbCredentials = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME,
};

const pool = new Pool({
    user: dbCredentials.user,
    password: dbCredentials.password,
    host: dbCredentials.host,
    port: dbCredentials.port,
    database: dbCredentials.database,
});

export const db = drizzle(pool, { schema });
