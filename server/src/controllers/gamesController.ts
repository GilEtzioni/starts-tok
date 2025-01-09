import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { Words, Games } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { eq, and, max } from "drizzle-orm";

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
            eq(Words.clerkUserId, userId)
        );
        res.json(coursesSubjects);

    } catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
}

export const getHangmanScore = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    } 

    try {
        const score = await db
            .select().from(Games)
            .where(
                and(
                eq(Games.gameName, "hangmanGame"),
                eq(Games.clerkUserId, userId)
            ));

        res.json(score);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
}

export const getHangmanMaxScore = async (req: Request, res: Response): Promise<void> => {
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
                    eq(Games.gameName, "hangmanGame"),
                    eq(Games.clerkUserId, userId),
                ));

        res.json(highestScore);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
}

export const addHangmanScore = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    } 

    const { score } = req.body; 

    if (score === undefined || score === null) {
        res.status(400).send("Missing 'score' in request body");
    }

    try {
        const newScore = await db
            .insert(Games)
            .values({
                clerkUserId: userId,
                gameName: "hangmanGame",
                gameScore: score,
            }).returning({
                gameId: Games.gameId,
                gameName: Games.gameName,
                gameScore: Games.gameScore,
            });

        res.status(201).json(newScore);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }    
}
