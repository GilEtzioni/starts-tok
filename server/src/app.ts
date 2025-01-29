import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { Pool } from "pg";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import coursesRoutes from "./routes/courseRoutes";
import gamesRoutes from "./routes/gamesRouter";
import usersRoutes from "./routes/usersRoutes";
import { clerkMiddleware } from "@clerk/express";

// Express app setup
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: process.env.FRONT_END_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

app.use(coursesRoutes);
app.use(dictionaryRoutes);
app.use(gamesRoutes);
app.use(usersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('The program is running');
});

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
  ssl: { rejectUnauthorized: false },
});

// Connect to PostgreSQL database
async function connectDB() {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');
    client.release();
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
}

connectDB();

// Handle Clerk errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ClerkAuthError") {
    console.error("Clerk authentication error:", err.message);
    res.status(401).json({ error: "Authentication failed" });
  } else {
    next(err);
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  try {
    await pool.end();
    console.log('Closed PostgreSQL connection');
    process.exit(0);
  } catch (err) {
    console.error('Error closing PostgreSQL connection:', err);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  try {
    await pool.end();
    console.log('Closed PostgreSQL connection');
    process.exit(0);
  } catch (err) {
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
