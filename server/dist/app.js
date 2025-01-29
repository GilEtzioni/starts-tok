"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const dictionaryRoutes_1 = __importDefault(require("./routes/dictionaryRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const gamesRouter_1 = __importDefault(require("./routes/gamesRouter"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const express_2 = require("@clerk/express");
// Express app setup
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONT_END_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH"],
}));
app.use((0, express_2.clerkMiddleware)({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_live_Y2xlcmsuc3RhcnRzdG9rLmNvbSQ",
    secretKey: process.env.CLERK_SECRET_KEY,
}));
app.use("/api", courseRoutes_1.default);
app.use("/api", dictionaryRoutes_1.default);
app.use("/api", gamesRouter_1.default);
app.use("/api", usersRoutes_1.default);
app.get('/', (req, res) => {
    res.send('The program is running');
});
// Initialize PostgreSQL connection pool
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
// Connect to PostgreSQL database
async function connectDB() {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL');
        client.release();
    }
    catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
}
connectDB();
// Handle Clerk errors
app.use((err, req, res, next) => {
    if (err.name === "ClerkAuthError") {
        console.error("Clerk authentication error:", err.message);
        res.status(401).json({ error: "Authentication failed" });
    }
    else {
        next(err);
    }
});
// Graceful shutdown
process.on('SIGTERM', async () => {
    try {
        await pool.end();
        console.log('Closed PostgreSQL connection');
        process.exit(0);
    }
    catch (err) {
        console.error('Error closing PostgreSQL connection:', err);
        process.exit(1);
    }
});
process.on('SIGINT', async () => {
    try {
        await pool.end();
        console.log('Closed PostgreSQL connection');
        process.exit(0);
    }
    catch (err) {
        console.error('Error closing PostgreSQL connection:', err);
        process.exit(1);
    }
});
console.log("frotn end URL:", process.env.FRONT_END_URL);
console.log("Clerk Publishable Key:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log("Clerk Secret Key:", process.env.CLERK_SECRET_KEY);
console.log("Database URL:", process.env.DATABASE_URL);
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
