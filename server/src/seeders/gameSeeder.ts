import { Games } from "../drizzle/schema";
import {db} from "../drizzle/db";

export async function gameSeeder(userId: string) {

  console.log("Seeding database...");

  await db.insert(Games).values([
    // hangman
    {userId: userId, gameName: "hangmanGame", gameScore: 5 },
    {userId: userId, gameName: "hangmanGame", gameScore: 3 },
    {userId: userId, gameName: "hangmanGame", gameScore: 7 },
    {userId: userId, gameName: "hangmanGame", gameScore: 8 },

    // speed-game
    {userId: userId, gameName: "speedGame", gameScore: 5 },
    {userId: userId, gameName: "speedGame", gameScore: 3 },
    {userId: userId, gameName: "speedGame", gameScore: 7 },

    // row-game
    {userId: userId, gameName: "rowGame", gameScore: 5 },
    {userId: userId, gameName: "rowGame", gameScore: 3 },
    {userId: userId, gameName: "rowGame", gameScore: 2 },
    
  ]).returning({ id: Games.gameId });
}