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
// debugging environment variables
console.log("Environment Variables:");
console.log("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);
// middleware
console.log("Configuring CORS...");
app.use((0, cors_1.default)({
    origin: "https://website-project-lyart.vercel.app",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
console.log("Configuring Clerk middleware...");
app.use((0, express_2.clerkMiddleware)({
    // publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    publishableKey: "promoted-camel-14.clerk.accounts.dev",
    secretKey: process.env.CLERK_SECRET_KEY,
}));
// print for every incoming request
app.use((req, res, next) => {
    console.log(`[Incoming Request]: Method=${req.method}, URL=${req.originalUrl}`);
    next();
});
// routes
console.log("Registering routes...");
app.use("/courses", courseRoutes_1.default);
app.use("/dictionary", dictionaryRoutes_1.default);
app.use("/games", gamesRouter_1.default);
app.use("/users", usersRoutes_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Server is up and running!" });
});
// catch unhandled routes
app.use((req, res) => {
    console.log(`[Unhandled Route]: Method=${req.method}, URL=${req.originalUrl}`);
    res.status(404).json({ error: "Route not found" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
