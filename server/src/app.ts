import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { Pool } from "pg";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import coursesRoutes from "./routes/courseRoutes";
import gamesRoutes from "./routes/gamesRouter";
import usersRoutes from "./routes/usersRoutes";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";

// Express app setup
const app = express();
app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_live_Y2xlcmsuc3RhcnRzdG9rLmNvbSQ",
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('The program is running');
});

// Routes
app.use(coursesRoutes);
app.use(dictionaryRoutes);
app.use(gamesRoutes);
app.use(usersRoutes);

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

app.get('/api/data', requireAuth(), async (req: Request, res: Response) => {
  try {

  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID is missing" });
      return;
  }
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Database query error');
  }
});

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

console.log("Clerk Publishable Key:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log("Clerk Secret Key:", process.env.CLERK_SECRET_KEY);
console.log("Database URL:", process.env.DATABASE_URL);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
