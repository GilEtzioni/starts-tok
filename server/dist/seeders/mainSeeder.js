"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainSeeder = void 0;
const courseSeeder_1 = require("./seedersTables/courseSeeder");
const wordSeeder_1 = require("./seedersTables/wordSeeder");
const gameSeeder_1 = require("./seedersTables/gameSeeder");
const missingWordSeeder_1 = require("./seedersTables/missingWordSeeder");
const sentenceSeeder_1 = require("./seedersTables/sentenceSeeder");
const userSeeder_1 = require("./seedersTables/userSeeder");
const helpingSeeders_1 = require("./utils/helpingSeeders");
const seedersType_1 = require("../types/seedersType");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const express_1 = require("@clerk/express");
const mainSeeder = async (userId) => {
    const user = await express_1.clerkClient.users.getUser(userId);
    const userName = user?.username ?? "unknown user";
    const courseIds = (0, helpingSeeders_1.generateCourseIds)();
    console.log("\nstart seeding courses...");
    await (0, courseSeeder_1.courseSeeder)(userId, courseIds);
    console.log("courses seeded\n");
    console.log("\nstart seeding words...");
    await (0, wordSeeder_1.wordSeeder)(userId, courseIds);
    console.log("words seeded\n");
    console.log("\nstart seeding games...");
    await (0, gameSeeder_1.gameSeeder)(userId, helpingSeeders_1.hangmanGameId, helpingSeeders_1.speedGameId, helpingSeeders_1.rowGameId);
    console.log("games seeded\n");
    console.log("\nstart seeding missingWord...");
    await (0, missingWordSeeder_1.missingWordSeeder)(userId, courseIds);
    console.log("missingWord seeded\n");
    console.log("\nstart seeding sentence...");
    await (0, sentenceSeeder_1.sentenceSeeder)(userId, courseIds);
    console.log("sentence seeded\n");
    console.log("\nstart seeding users...");
    await (0, userSeeder_1.userSeeder)(userId, userName);
    console.log("users seeded\n");
    console.log("\nstart seeding CurrentLanguage...");
    await db_1.db.insert(schema_1.Language).values({
        userId,
        language: seedersType_1.CourseLangauge.Italian,
    });
    console.log("CurrentLanguage seeded\n");
    console.log("\n\n---- seeding completed successfully ----\n\n");
};
exports.mainSeeder = mainSeeder;
if (require.main === module) {
    const args = process.argv.slice(2);
    const userId = args[0];
    if (!userId) {
        process.exit(1);
    }
    (0, exports.mainSeeder)(userId);
}
