"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSeeder = userSeeder;
const schema_1 = require("../../drizzle/schema");
const db_1 = require("../../drizzle/db");
async function userSeeder(userId, userName) {
    console.log("Seeding database...");
    await db_1.db.insert(schema_1.Users).values([
        { userId, userName, points: 13, pointsDate: "2025-01-13" },
        { userId, userName, points: 14, pointsDate: "2025-01-14" },
        { userId, userName, points: 7, pointsDate: "2025-01-17" },
        { userId, userName, points: 0 },
        { userId, userName, points: 16, pointsDate: "2025-01-16" },
    ]).returning({ id: schema_1.Users.userId });
}
