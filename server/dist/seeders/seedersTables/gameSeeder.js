"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameSeeder = gameSeeder;
const schema_1 = require("../../drizzle/schema");
const db_1 = require("../../drizzle/db");
const gamesTypes_1 = require("../../types/gamesTypes");
async function gameSeeder(userId, hangmanGameId, speedGameId, rowGameId) {
    console.log("Seeding database...");
    await db_1.db.insert(schema_1.Games).values([
        { userId, gameName: gamesTypes_1.GamesNamesType.Hangman, gameScore: 0, gameId: hangmanGameId },
        { userId, gameName: gamesTypes_1.GamesNamesType.SpeedGame, gameScore: 0, gameId: speedGameId },
        { userId, gameName: gamesTypes_1.GamesNamesType.Wordle, gameScore: 0, gameId: rowGameId },
    ]).returning({ id: schema_1.Games.gameId });
}
