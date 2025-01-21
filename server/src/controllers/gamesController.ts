import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { Games, Language, Words } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { eq, and, max } from "drizzle-orm";
import { GamesNamesType } from "../types/gamesTypes";
import { CourseLangauge } from "../types/seedersType";
import { languageDictionaries } from "../utils/userHelper";

export const getAllWords = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    } 

    try {
        const coursesSubjects = await db
        .select()
        .from(Words)
        .where(
            eq(Words.userId, userId)
        );
        res.json(coursesSubjects);

    } catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
}

/* ------------------------------------------------------------------------------------ */

export const getGameMaxScore = async (req: Request, res: Response, gameName: GamesNamesType): Promise<void> => {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    } 

    try {
        const [highestScore] = await db
            .select({ maxScore: max(Games.gameScore) })
            .from(Games)
            .where(
                and(
                    eq(Games.gameName, gameName),
                    eq(Games.userId, userId),
                ));

        res.json(highestScore);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
}

/* ------------------------------------------------------------------------------------ */

export const addGameScore = async (req: Request, res: Response, gameName: GamesNamesType): Promise<void> => {
    const { userId } = getAuth(req);

    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const { score } = req.body;

    if (score === undefined || score === null) {
        res.status(400).send("Missing 'score' in request body");
        return;
    }

    try {
        const userGame = await db
            .select()
            .from(Games)
            .where(
                and(
                    eq(Games.gameName, gameName),
                    eq(Games.userId, userId)
                )
            )
            .limit(1);

        const userGameId = userGame[0]?.gameId;
        if (!userGameId) {
            res.status(404).json({ error: "Game not found for user" });
            return;
        }

        const newScore = await db
            .insert(Games)
            .values({
                userId: userId,
                gameId: userGameId,
                gameName: gameName,
                gameScore: score,
            })
            .returning({
                gameName: Games.gameName,
                gameScore: Games.gameScore,
                createdAt: Games.createdAt,
            });

        res.status(201).json(newScore);
    } catch (error) {
        console.error("Error adding hangman score:", error);
        res.status(500).json({ message: "An error occurred while adding the score", error });
    }
};

/* ------------------------------------------------------------------------------------ */

export const getKeyboard = async (req: Request, res: Response): Promise<void> => {

    const { userId } = getAuth(req);
  
    if (!userId) {
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }
  
    try {
      const userLanguage = await db
      .select()
      .from(Language)
      .where(eq(Language.userId, userId))
      .limit(1);
  
    if (userLanguage.length === 0) {
      res.status(404).json({ error: "User language not found" });
      return;
    }
    const language = userLanguage[0].language;

    const keyborad = 
    language === CourseLangauge.French
      ? languageDictionaries.french
      : language === CourseLangauge.Italian
      ? languageDictionaries.italian
      : language === CourseLangauge.Spanish
      ? languageDictionaries.spanish
      : language === CourseLangauge.German
      ? languageDictionaries.german
      : languageDictionaries.english

      res.json(keyborad);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while ", error });
    }
}