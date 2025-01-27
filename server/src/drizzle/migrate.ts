import dotenv from "dotenv";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

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
    ssl: {
        rejectUnauthorized: false, // Allows SSL but does not validate certificates
    },
});

async function main() {
    console.log("Migration started...");

    const db = drizzle(pool);

    await migrate(db, {
        migrationsFolder: "./src/drizzle/migrations", // Adjust the path to your migrations folder
    });

    console.log("Migration ended...");
    process.exit(0);
}

main().catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
});
