import { Games } from "../../drizzle/schema";
import {db} from "../../drizzle/db";

export async function gameSeeder(userId: string, hangmanGameId: string, speedGameId: string, rowGameId: string) {

  console.log("Seeding database...");

  await db.insert(Games).values([
    // hangman
    { userId, gameName: "hangmanGame", gameScore: 5, gameId: hangmanGameId },
    { userId, gameName: "hangmanGame", gameScore: 3, gameId: hangmanGameId },
    { userId, gameName: "hangmanGame", gameScore: 7, gameId: hangmanGameId },
    { userId, gameName: "hangmanGame", gameScore: 8, gameId: hangmanGameId },

    // speed-game
    { userId, gameName: "speedGame", gameScore: 5, gameId: speedGameId },
    { userId, gameName: "speedGame", gameScore: 3, gameId: speedGameId },
    { userId, gameName: "speedGame", gameScore: 7, gameId: speedGameId },

    // row-game
    { userId, gameName: "rowGame", gameScore: 5, gameId: rowGameId },
    { userId, gameName: "rowGame", gameScore: 3, gameId: rowGameId },
    { userId, gameName: "rowGame", gameScore: 2, gameId: rowGameId },
    
  ]).returning({ id: Games.gameId });
}