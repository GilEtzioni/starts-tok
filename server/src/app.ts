import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import coursesRoutes from "./routes/courseRoutes";
import gamesRoutes from "./routes/gamesRouter";
import usersRoutes from "./routes/usersRoutes";
import { clerkMiddleware } from "@clerk/express";

// Express app setup
const app = express();
app.use(express.json());
// app.use(cookieParser())


// CORS middleware
app.use(
  cors({
    origin: 'https://www.startstok.com', // Front-end URL
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Respond to OPTIONS preflight requests
app.options("*", cors());


app.use((req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('__clerk_db_jwt', 'cookieValue', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'none', 
  });
  next();
});

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