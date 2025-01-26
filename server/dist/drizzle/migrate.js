"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
dotenv_1.default.config();
const dbCredentials = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME,
};
const connectionString = `postgresql://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}`;
const pool = new pg_1.Pool({
    connectionString: connectionString,
});
async function main() {
    console.log("Migration started...");
    const db = (0, node_postgres_1.drizzle)(pool);
    await (0, migrator_1.migrate)(db, {
        migrationsFolder: "./src/drizzle/migrations",
    });
    console.log("Migration ended...");
    process.exit(0);
}
main().catch((error) => {
    throw error;
});
