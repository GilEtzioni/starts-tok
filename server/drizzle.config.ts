import dotenv from "dotenv";
dotenv.config();

const dbCredentials = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false, // Disable SSL verification (safe for development only; do not use in production)
    },
};

const connectionString = `postgresql://${dbCredentials.user}:${dbCredentials.password}@${dbCredentials.host}:${dbCredentials.port}/${dbCredentials.database}?sslmode=require`;

const config = {
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        connectionString,
        ssl: dbCredentials.ssl, // Explicitly include SSL settings here
    },
    verbose: true,
    strict: true,
};

export default config;
