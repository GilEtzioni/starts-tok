"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dictionaryRoutes_1 = __importDefault(require("./routes/dictionaryRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const gamesRouter_1 = __importDefault(require("./routes/gamesRouter"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const express_2 = require("@clerk/express");
// express
const app = (0, express_1.default)();
app.use(express_1.default.json());
// middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:3001",
    // origin: "*", 
    // origin: "https://website-project-lyart.vercel.app", 
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] Incoming Request: ${req.method} ${req.originalUrl}`);
//   console.log("Headers:", req.headers);
//   console.log("Body:", req.body);
//   next();
// });
app.use((0, express_2.clerkMiddleware)({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
}));
app.use((req, res, next) => {
    console.log("Routing request...");
    next();
});
app.use(courseRoutes_1.default);
app.use(dictionaryRoutes_1.default);
app.use(gamesRouter_1.default);
app.use(usersRoutes_1.default);
app.use((req, res) => {
    console.log(`Unhandled Route: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "Route not found" });
});
console.log("Environment Variables:");
console.log("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
