import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import coursesRoutes from "./routes/courseRoutes";
import gamesRoutes from "./routes/gamesRouter";
import usersRoutes from "./routes/usersRoutes";
// import { clerkMiddleware } from "@clerk/express";

// Express app setup
const app = express();
app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: 'https://www.startstok.com', // Front-end URL
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.get('/', (req, res) => {
  res.send('The program is running');
});


// Routes
app.use(coursesRoutes);
app.use(dictionaryRoutes);
app.use(gamesRoutes);
app.use(usersRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});