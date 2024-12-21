
import dotenv from "dotenv";
dotenv.config();

// Connection string
const dbCredentials = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
};

const connectionString = `postgresql://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}`;

const config = {
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        connectionString,
    },
    verbose: true,
    strict: true,
};

export default config;