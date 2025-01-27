import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import coursesRoutes from "./routes/courseRoutes";
import gamesRoutes from "./routes/gamesRouter";
import usersRoutes from "./routes/usersRoutes";
import { clerkMiddleware } from "@clerk/express";

// express
const app = express();
app.use(express.json());

// middleware
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.startstok.com");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Clerk middleware
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    authorizedParties: ["https://www.startstok.com"], // Prevent subdomain cookie leaks
    clockSkewInMs: 5000, // Allow 5 seconds of clock skew
    enableHandshake: true, // Enable Clerk's handshake flow (default)
    debug: true, // Enable debug logging for troubleshooting
  })
);

// Custom middleware to add SameSite and Secure options for Clerk cookies
app.use((req, res, next) => {
  const cookieSettings: express.CookieOptions = {
    sameSite: "none", // Set to "none" for cross-site requests
    secure: true, // Ensure cookies are only sent over HTTPS
  };
  if (req.cookies["__clerk_db_jwt"]) {
    res.cookie("__clerk_db_jwt", req.cookies["__clerk_db_jwt"], cookieSettings);
  }
  if (req.cookies["__clerk_db_jwt_8AXyZN2z"]) {
    res.cookie(
      "__clerk_db_jwt_8AXyZN2z",
      req.cookies["__clerk_db_jwt_8AXyZN2z"],
      cookieSettings
    );
  }
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Routes
app.use(coursesRoutes);
app.use(dictionaryRoutes);
app.use(gamesRoutes);
app.use(usersRoutes);

// Server
const PORT = process.env.PORT || 5432;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});