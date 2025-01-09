// Ensure dotenv is loaded first
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import coursesRoutes from "./routes/courseRoutes";
import { clerkMiddleware } from "@clerk/express";

// express
const app = express();
app.use(express.json());

// Middleware
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// Add routes after middleware
app.use(coursesRoutes);
app.use(dictionaryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
