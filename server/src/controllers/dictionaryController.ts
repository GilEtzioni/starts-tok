import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { Words, CourseNames, Language } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { eq, and, desc, count, inArray, isNotNull } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { EnglishLevel } from "../types/seedersType";
import { DictionaryKnowledgeType } from "../types/dictionaryType";

export const getAllWords = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
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

      const allWords = await db
        .select()
        .from(Words)
        .where(
            and(
                eq(Words.userId, userId),
                eq(Words.language, language)
            )
        )
        .orderBy(Words.wordOrder);
  
      res.json(allWords);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching words", error });
    }
  };

  /* ----------------------------------------------------------------------------------------- */

  export const getFilterWords = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    const { levelArray, knowledgeArray } = req.query as {
      levelArray: string;
      knowledgeArray: string;
    };
  
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  
    if (!levelArray || !knowledgeArray) {
      res.status(400).json({ error: "Missing 'levelArray' or 'knowledgeArray' in query parameters" });
      return;
    }
  
    try {
      const parsedLevelArray = JSON.parse(levelArray) as EnglishLevel[];
      const parsedKnowledgeArray = JSON.parse(knowledgeArray) as DictionaryKnowledgeType[];

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
  
      const filters = [
        eq(Words.userId, userId),
        eq(Words.language, language),
        isNotNull(Words.knowledge)
      ];
  
      if (parsedKnowledgeArray.length > 0) {
        filters.push(inArray(Words.knowledge, parsedKnowledgeArray));
      }
  
      if (parsedLevelArray.length > 0) {
        filters.push(inArray(Words.englishLevel, parsedLevelArray));
      }
  
      const allWords = await db
        .select()
        .from(Words)
        .where(and(...filters)) 
        .orderBy(Words.wordOrder);
  
  
      res.json(allWords);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching words", error: error });
    }
  };
  
/* ----------------------------------------------------------------------------------------- */

export const addNewWord = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: User ID is missing" });
    return;
  }

  const { foreignWord, hebrewWord } = req.body;

  if (!foreignWord || !hebrewWord) {
    res.status(400).json({ error: "Missing 'foreignWord' or 'hebrewWord' in request body" });
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

    const [lastCourseIndex] = await db
      .select()
      .from(CourseNames)
      .where(
        and(
            eq(CourseNames.userId, userId),
            eq(CourseNames.language, language)
        )
      )
      .orderBy(desc(CourseNames.courseId))
      .limit(1);

    const courseId = lastCourseIndex?.courseId || "default-course-id";

    const newWordId = uuidv4();
    await db.insert(Words).values({
      wordId: newWordId,
      userId,
      hebrewLevel: "המילים שהוספתי",
      englishLevel: "userWords",
      courseId,
      courseNameEnglish: "userWords",
      hebrewWord,
      foreignWord,
      language,
      knowledge: DictionaryKnowledgeType.Ex,
    });

    const insertedWord = await db
      .select()
      .from(Words)
      .where(
        eq(Words.wordId, newWordId)
      )
      .limit(1);

    res.status(201).json(insertedWord[0]);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while adding a new word", error });
  }
};

/* ----------------------------------------------------------------------------------------- */

export const editWord = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { knowledge } = req.body;
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: User ID is missing" });
    return;
  }

  if (!knowledge) {
    res.status(400).send("Missing 'knowledge' in request body");
    return;
  }

  try {
    const userLanguage = await db
      .select()
      .from(Language)
      .where(
        eq(Language.userId, userId)
      )
      .limit(1);

    if (userLanguage.length === 0) {
      res.status(404).json({ error: "User language not found" });
      return;
    }
    const language = userLanguage[0].language;

    const updatedRows = await db
      .update(Words)
      .set({
        knowledge: knowledge
      })
      .where(
        and(
            eq(Words.wordId, id), 
            eq(Words.userId, userId),
            eq(Words.language, language)
        )
      )
      .returning();

    if (updatedRows.length === 0) {
      res.status(404).send("Word not found");
      return;
    }

    res.json(updatedRows[0]);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the word", error });
  }
};

/* ----------------------------------------------------------------------------------------- */

export const getFinishedWordsCounter = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
  }

  try {
      const userLanguage = await db
          .select()
          .from(Language)
          .where(
            eq(Language.userId, userId)
          )
          .limit(1);

      if (userLanguage.length === 0) {
          res.status(404).json({ error: "User language not found" });
          return;
      }

      const language = userLanguage[0].language;

      const wordFinishCounter = await db
          .select({ count: count() })
          .from(Words)
          .where(
              and(
                eq(Words.language, language),
                eq(Words.userId, userId),
                eq(Words.knowledge, DictionaryKnowledgeType.Vy)
              )
          );

      if (!wordFinishCounter || wordFinishCounter.length === 0) {
          res.status(404).json({ error: "Words not found in /dictionary/finished" });
          return;
      }

      res.json(wordFinishCounter[0].count);
  } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching the word count", error });
  }
};