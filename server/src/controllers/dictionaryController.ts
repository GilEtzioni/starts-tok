import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { Words, CourseNames, Language } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { eq, and, desc, count, isNotNull, ilike } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { DictionaryKnowledgeType } from "../types/dictionaryType"; 
import { CourseLangauge } from "../types/seedersType";

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

      const foreignWordColumn = 
      language === CourseLangauge.Spanish
        ? Words.spanishWord
        : language === CourseLangauge.Italian
        ? Words.italianWord
        : language === CourseLangauge.French
        ? Words.frenchWord
        : Words.germanWord;

      const allWords = await db
        .select({
          userId: Words.userId,
          wordId: Words.wordId,
          hebrewLevel: Words.hebrewLevel,
          englishLevel: Words.englishLevel,
          courseId: Words.courseId,
          courseNameEnglish: Words.courseNameEnglish,
          hebrewWord: Words.hebrewWord,
          foreignWord: 
            language === CourseLangauge.Spanish
            ? Words.spanishWord
            : language === CourseLangauge.Italian
            ? Words.italianWord
            : language === CourseLangauge.French
            ? Words.frenchWord
            : Words.germanWord,
          knowledge: 
            language === CourseLangauge.Spanish
            ? Words.spanishKnowledge
            : language === CourseLangauge.Italian
            ? Words.italianKnowledge
            : language === CourseLangauge.French
            ? Words.frenchKnowledge
            : Words.germanKnowledge,
            courseOrder: Words.courseOrder,
        })
        .from(Words)
        .where(
          and(
            eq(Words.userId, userId),
            isNotNull(foreignWordColumn)
          )
        )
        .orderBy(Words.wordOrder);
  
      res.json(allWords);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching words", error });
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
      res.status(500).json({ message: "An error occurred while fetching the word", error });
  }
};

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
      .where(eq(CourseNames.userId, userId))
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
      spanishWord: language === CourseLangauge.Spanish ? foreignWord : null,
      frenchWord: language === CourseLangauge.French ? foreignWord : null,
      germanWord: language === CourseLangauge.German ? foreignWord : null,
      italianWord: language === CourseLangauge.Italian ? foreignWord : null,
      spanishKnowledge: language === CourseLangauge.Spanish ? DictionaryKnowledgeType.QuestionMark : null,
      frenchKnowledge: language === CourseLangauge.French ? DictionaryKnowledgeType.QuestionMark : null,
      germanKnowledge: language === CourseLangauge.German ? DictionaryKnowledgeType.QuestionMark : null,
      italianKnowledge: language === CourseLangauge.Italian ? DictionaryKnowledgeType.QuestionMark : null,
    });

    const insertedWord = await db
      .select()
      .from(Words)
      .where(eq(Words.wordId, newWordId))
      .limit(1);

    res.status(201).json(insertedWord[0]);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while adding a new word", error });
  }
};


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
      .where(eq(Language.userId, userId))
      .limit(1);

    if (userLanguage.length === 0) {
      res.status(404).json({ error: "User language not found" });
      return;
    }
    const language = userLanguage[0].language;

    const updateFields: Partial<typeof Words> = {};
    if (language === CourseLangauge.German) {
      updateFields.germanKnowledge = knowledge;
    } else if (language === CourseLangauge.Italian) {
      updateFields.italianKnowledge = knowledge;
    } else if (language === CourseLangauge.Spanish) {
      updateFields.spanishKnowledge = knowledge;
    } else if (language === CourseLangauge.French) {
      updateFields.frenchKnowledge = knowledge;
    }

    if (Object.keys(updateFields).length === 0) {
      res.status(400).send("Invalid language for update");
      return;
    }

    // update only the specified language
    const updatedRows = await db
      .update(Words)
      .set(updateFields)
      .where(
        and(eq(Words.wordId, id), eq(Words.userId, userId))
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
          .where(eq(Language.userId, userId))
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
                  language === CourseLangauge.German
                      ? ilike(Words.germanKnowledge, DictionaryKnowledgeType.Vy)
                      : language === CourseLangauge.French
                      ? ilike(Words.frenchKnowledge, DictionaryKnowledgeType.Vy)
                      : language === CourseLangauge.Italian
                      ? ilike(Words.italianKnowledge, DictionaryKnowledgeType.Vy)
                      : language === CourseLangauge.Spanish
                      ? ilike(Words.spanishKnowledge, DictionaryKnowledgeType.Vy)
                      : undefined,
                  eq(Words.userId, userId)
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