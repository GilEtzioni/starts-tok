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
const allowedOrigins = [
    "http://localhost:3001",
    "https://website-project-lyart.vercel.app",
];
// middleware
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, express_2.clerkMiddleware)({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
}));
app.use(courseRoutes_1.default);
app.use(dictionaryRoutes_1.default);
app.use(gamesRouter_1.default);
app.use(usersRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
