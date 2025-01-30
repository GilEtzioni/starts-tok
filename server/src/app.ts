import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction, Router } from "express";
import cors from "cors";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import coursesRoutes from "./routes/courseRoutes";
import gamesRoutes from "./routes/gamesRouter";
import usersRoutes from "./routes/usersRoutes";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import { mainSeeder } from "./seeders/mainSeeder";

const app = express();
app.use(express.json());
const router = Router();
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
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

router.post("/create-db", requireAuth(), async (req: Request, res: Response): Promise<void>  => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
       res.status(401).json({ error: "Unauthorized" });
       return;
    }

    console.log(`Seeding database for user: ${userId}`);
    await mainSeeder(userId);

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: "Failed to seed database" });
  }

});

app.use("/api", router);
app.use(coursesRoutes);
app.use(dictionaryRoutes);
app.use(gamesRoutes);
app.use(usersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('The program is running');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ClerkAuthError") {
    console.error("Clerk authentication error:", err.message);
    res.status(401).json({ error: "Authentication failed" });
  } else {
    next(err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});