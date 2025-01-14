import { Games } from "../../drizzle/schema";
import {db} from "../../drizzle/db";
import { GamesNamesType } from "../../types/gamesTypes";

export async function gameSeeder(userId: string, hangmanGameId: string, speedGameId: string, rowGameId: string) {

  console.log("Seeding database...");

  await db.insert(Games).values([
    { userId, gameName: GamesNamesType.Hangman, gameScore: 0, gameId: hangmanGameId },
    { userId, gameName: GamesNamesType.SpeedGame, gameScore: 0, gameId: speedGameId },
    { userId, gameName: GamesNamesType.Wordle, gameScore: 0, gameId: rowGameId },
  ]).returning({ id: Games.gameId });
}