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

// Middleware
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

app.use((req, res, next) => {
  res.cookie("cookie2", "value2", { sameSite: "none", secure: true });
  next();
});

app.use((req, res, next) => {
  res.cookie("__clerk_db_jwt_8AXyZN2z", "value", {
    sameSite: "none",
    secure: true, // Ensure secure cookies for HTTPS
  });
  next();
});

// Clerk middleware
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    authorizedParties: ["https://www.startstok.com"], // Prevent subdomain cookie leaks
    audience: "your-audience-id", // Validate the 'aud' claim in the token (optional)
    clockSkewInMs: 5000, // Allow 5 seconds of clock skew
    enableHandshake: true, // Enable Clerk's handshake flow (default)
    debug: true, // Enable debug logging for troubleshooting
  })
);

// app.get("/", (req, res) => {
//   res.send("Backend is working!");
// });

app.post ("/", (req, res, next) => { 
  const cookie = "samesite=none";
  res.setHeader("set-cookie", [cookie]);
  next();
}, (req, res) => {
  res.send("Cookie is set and request continues!");
});


// Routes
app.use(coursesRoutes);
app.use(dictionaryRoutes);
app.use(gamesRoutes);
app.use(usersRoutes);

// Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
