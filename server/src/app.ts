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

const allowedOrigins = [
  "http://localhost:3001",
  "https://website-project-lyart.vercel.app",
];

// middleware
app.use(cors({
  origin: allowedOrigins,
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

app.use(coursesRoutes);
app.use(dictionaryRoutes);
app.use(gamesRoutes);
app.use(usersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});