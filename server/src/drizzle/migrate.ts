
import { Pool } from "pg";
import dotenv from "dotenv";
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

const connectionString = `postgresql://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}`;

const pool = new Pool({
    connectionString: connectionString,
});

async function main() {
    console.log("Migration started...");
    
    const db = drizzle(pool); 
    
    await migrate(db, {
        migrationsFolder: "./src/drizzle/migrations",
    });
    
    console.log("Migration ended...");
    process.exit(0);
}

main().catch((error) => {
    throw error;
});