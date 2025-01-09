import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { Words, CourseNames } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { eq, and, desc } from "drizzle-orm";

export const getAllWords = async (req: Request, res: Response): Promise<any> => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } 

  try {
    const allWords = await db.select().from(Words).where(eq(Words.clerkUserId, userId));
    res.json(allWords);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getWordById = async (req: Request, res: Response): Promise<any> => {
  const { userId } = getAuth(req);
  const wordID = parseInt(req.params.id, 10);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }   
  if (isNaN(wordID)) {
    res.status(400).json({ error: "Invalid word ID" });
    return;
  } 

  try {
    const word = await db
      .select()
      .from(Words)
      .where(and(
        eq(Words.id, wordID),
        eq(Words.clerkUserId, userId)
    ));

    if (!word.length){
      res.status(404).json({ error: "Word not found" });
      return;
    } 

    res.json(word[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addNewWord = async (req: Request, res: Response): Promise<any> => {
  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID is missing" });
      return;
  }

  const { GermanWord, HebrewWord } = req.body;

  try {
    // find the last word index
    const [lastCourseIndex] = await db
      .select()
      .from(CourseNames)
      .where(
          eq(CourseNames.clerkUserId, userId)
      )
      .orderBy(desc(CourseNames.courseId))
      .limit(1);
 
    const courseId = lastCourseIndex.courseId !== null && lastCourseIndex.courseId !== undefined
    ? parseInt(lastCourseIndex.courseId.toString()) : 1;


    // insert the new word
    const newWord = await db
      .insert(Words)
      .values({
        clerkUserId: userId,
        levelHebrew: "המילים שהוספתי",
        levelEnglish: "userWords",
        courseId,
        courseNameEnglish: "userWords",
        GermanWord,
        HebrewWord,
        knowlage: "?",
      })
      .returning({
        id: Words.id,
        GermanWord: Words.GermanWord,
        HebrewWord: Words.HebrewWord,
        levelHebrew: Words.levelHebrew,
        levelEnglish: Words.levelEnglish,
        courseId: Words.courseId,
        courseNameEnglish: Words.courseNameEnglish,
        knowlage: Words.knowlage,
      });

    res.json(newWord[0]); 
  } catch (error) {
    res.status(500).json({ error: "Failed to add the new word." });
  }
};

export const editWord = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params; 
  const { knowlage } = req.body; 

  if (!knowlage) {
      res.status(400).send("Missing 'knowlage' in request body");
  }

  try {
      const updatedRows = await db
          .update(Words)
          .set({ knowlage }) 
          .where(eq(Words.id, parseInt(id, 10)))
          .returning();

      if (updatedRows.length === 0) {
          res.status(404).send("Word not found");
      }

      res.json(updatedRows[0]); 
  } catch (error) {
      throw error;
  }
}