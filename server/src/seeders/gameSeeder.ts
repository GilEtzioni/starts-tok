import { Games } from "../drizzle/schema";
import {db} from "../drizzle/db";


async function seed() {
  console.log("Seeding database...");

  const userId = "user_2rLdvxl8OaqqsqX1Jv72KhuGq32"; 

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

seed().catch((error) => {
  throw error;
});