import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import coursesRoutes from "./routes/courseRoutes";
import gamesRoutes from "./routes/gamesRouter";
import usersRoutes from "./routes/usersRoutes";
import { clerkMiddleware } from "@clerk/express";

// express
const app = express();
app.use(express.json());

// debugging environment variables
console.log("Environment Variables:");
console.log("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);

// middleware
console.log("Configuring CORS...");
app.use(
  cors({
    origin: "https://website-project-lyart.vercel.app", // frontend deployment domain
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("Configuring Clerk middleware...");
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// print for every incoming request
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[Incoming Request]: Method=${req.method}, URL=${req.originalUrl}`);
  next();
});

// routes
console.log("Registering routes...");
app.use("/courses", coursesRoutes);
app.use("/dictionary", dictionaryRoutes);
app.use("/games", gamesRoutes);
app.use("/users", usersRoutes);

// catch unhandled routes
app.use((req: Request, res: Response) => {
  console.log(`[Unhandled Route]: Method=${req.method}, URL=${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});