import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { Words, CourseNames } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { eq, and, desc } from "drizzle-orm";

export const getAllWords = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } 

  try {
    const allWords = await db.select().from(Words).where(eq(Words.userId, userId));
    res.json(allWords);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while ", error });
  }
};

export const getWordById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);
  const wordID = req.params.id;

  if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
  }
  if (!wordID || typeof wordID !== "string") {
      res.status(400).json({ error: "Invalid word ID" });
      return;
  }

  try {
      const word = await db
          .select()
          .from(Words)
          .where(
              and(
                  eq(Words.wordId, wordID),
                  eq(Words.userId, userId)
              )
          );

      if (!word.length) {
          res.status(404).json({ error: "Word not found" });
          return;
      }

      res.json(word[0]);
  } catch (error) {
      console.error("Error fetching word:", error);
      res.status(500).json({ message: "An error occurred while fetching the word", error });
  }
};

export const addNewWord = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID is missing" });
      return;
  }

  const { germanWord, hebrewWord } = req.body;

  if (!germanWord || !hebrewWord) {
      res.status(400).json({ error: "Missing 'germanWord' or 'hebrewWord' in request body" });
      return;
  }

  try {
      const [lastCourseIndex] = await db
          .select()
          .from(CourseNames)
          .where(eq(CourseNames.userId, userId))
          .orderBy(desc(CourseNames.courseId))
          .limit(1);

      const courseId = lastCourseIndex?.courseId || "default-course-id"; 

      const newWord = await db
          .insert(Words)
          .values({
              wordId: userId,
              userId: userId,
              hebrewLevel: "המילים שהוספתי",
              englishLevel: "userWords",
              courseId,
              courseNameEnglish: "userWords",
              germanWord,
              hebrewWord,
              knowlage: "?",
          })
          .returning({
              id: Words.wordId,
              germanWord: Words.germanWord,
              hebrewWord: Words.hebrewWord,
              hebrewLevel: Words.hebrewLevel,
              englishLevel: Words.englishLevel,
              courseId: Words.courseId,
              courseNameEnglish: Words.courseNameEnglish,
              knowlage: Words.knowlage,
          });

      res.status(201).json(newWord[0]);
  } catch (error) {
      console.error("Error adding new word:", error);
      res.status(500).json({ message: "An error occurred while adding a new word", error });
  }
};

export const editWord = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; 
  const { knowlage } = req.body; 

  if (!knowlage) {
      res.status(400).send("Missing 'knowlage' in request body");
      return;
  }

  try {
      const updatedRows = await db
          .update(Words)
          .set({ knowlage }) 
          .where(eq(Words.wordId, id))
          .returning();

      if (updatedRows.length === 0) {
          res.status(404).send("Word not found");
          return;
      }

      res.json(updatedRows[0]);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while ", error });
  }
};
