"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSeeder = userSeeder;
const schema_1 = require("../../drizzle/schema");
const db_1 = require("../../drizzle/db");
async function userSeeder(userId, userName) {
    console.log("Seeding database...");
    await db_1.db.insert(schema_1.Users).values([
        { userId, userName, points: 0 },
    ]).returning({ id: schema_1.Users.userId });
}
