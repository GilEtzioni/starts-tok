import { Games } from "../drizzle/schema";
import {db} from "../drizzle/db";


async function seed() {
  console.log("Seeding database...");

  const userId = "user_2rLdvxl8OaqqsqX1Jv72KhuGq32"; 

  await db.insert(Games).values([
    // hangman
    {clerkUserId: userId, gameName: "hangmanGame", gameScore: 5 },
    {clerkUserId: userId, gameName: "hangmanGame", gameScore: 3 },
    {clerkUserId: userId, gameName: "hangmanGame", gameScore: 7 },
    {clerkUserId: userId, gameName: "hangmanGame", gameScore: 8 },

    // speed-game
    {clerkUserId: userId, gameName: "speedGame", gameScore: 5 },
    {clerkUserId: userId, gameName: "speedGame", gameScore: 3 },
    {clerkUserId: userId, gameName: "speedGame", gameScore: 7 },

    // row-game
    {clerkUserId: userId, gameName: "rowGame", gameScore: 5 },
    {clerkUserId: userId, gameName: "rowGame", gameScore: 3 },
    {clerkUserId: userId, gameName: "rowGame", gameScore: 2 },
    
  ]).returning({ id: Games.gameId });
}

seed().catch((error) => {
  throw error;
});