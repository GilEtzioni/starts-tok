import { drizzle } from "drizzle-orm/node-postgres";
import { Games, gameNameEnum } from "../drizzle/schema";
import {db} from "../drizzle/db";


async function seed() {
  console.log("Seeding database...");

  const items = await db.insert(Games).values([
    // hangman
    {gameName: "hangmanGame", gameScore: 5 },
    {gameName: "hangmanGame", gameScore: 3 },
    {gameName: "hangmanGame", gameScore: 7 },
    {gameName: "hangmanGame", gameScore: 8 },

    // speed-game
    {gameName: "speedGame", gameScore: 5 },
    {gameName: "speedGame", gameScore: 3 },
    {gameName: "speedGame", gameScore: 7 },

    // row-game
    {gameName: "rowGame", gameScore: 5 },
    {gameName: "rowGame", gameScore: 3 },
    {gameName: "rowGame", gameScore: 2 },
    
  ]).returning({ id: Games.gameId });
}

seed().catch((error) => {
  throw error;
});