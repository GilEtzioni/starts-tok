import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import coursesRoutes from "./routes/courseRoutes";
import gamesRoutes from "./routes/gamesRouter";
import usersRoutes from "./routes/usersRoutes";
import { clerkMiddleware } from "@clerk/express";

// Express app setup
const app = express();
app.use(express.json());

// Cookie session middleware
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "default_secret"],
    maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    sameSite: "none", // Use "none" for cross-origin in production
    secure: true, // Secure only in production (HTTPS)
    httpOnly: true, // Helps mitigate XSS attacks
  })
);

// CORS middleware
app.use(
  cors({
    origin: "https://www.startstok.com", // Front-end URL
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Respond to OPTIONS preflight requests
app.options("*", cors());

// Clerk middleware
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
    secretKey: process.env.CLERK_SECRET_KEY || "",
    debug: true, // Enable debug logs
  })
);

// Routes
app.use(coursesRoutes);
app.use(dictionaryRoutes);
app.use(gamesRoutes);
app.use(usersRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});