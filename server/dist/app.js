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
    origin: "https://www.startstok.com", // Front-end URL
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Respond to OPTIONS preflight requests
app.options("*", (0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://www.startstok.com");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
// Clerk middleware
app.use((0, express_2.clerkMiddleware)({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    jwtKey: process.env.CLERK_JWT_KEY, // Use the PEM public key for JWT verification
    authorizedParties: ["https://www.startstok.com"], // Prevent subdomain cookie leaks
    audience: "your-audience-id", // Validate the 'aud' claim in the token (optional)
    clockSkewInMs: 5000, // Allow 5 seconds of clock skew
    enableHandshake: true, // Enable Clerk's handshake flow (default)
    debug: true, // Enable debug logging for troubleshooting
}));
// Test route
// app.get("/", (req, res) => {
//   res.send("Backend is working!");
// });
// Routes
app.use(courseRoutes_1.default);
app.use(dictionaryRoutes_1.default);
app.use(gamesRouter_1.default);
app.use(usersRoutes_1.default);
// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
