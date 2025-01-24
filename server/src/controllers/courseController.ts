import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { CourseNames, Words, Sentences, MissingWords, Language } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { and, desc, eq, notInArray, sql } from "drizzle-orm";
import { CourseLangauge } from "../types/seedersType";

export const getCourses = async (req: Request, res: Response): Promise<void> => {
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

    const coursesSubjects = await db
    .select().
    from(CourseNames)
    .where(
      and(
          eq(CourseNames.userId, userId),
          eq(CourseNames.language ,language)
      )
    );
    res.json(coursesSubjects);

  } catch (error) {
    res.status(500).json({ message: "An error occurred while ", error });
  }
};

/* ------------------------------------------------------------------------------------ */

export const getFinishedCourses = async (req: Request, res: Response): Promise<void> => {
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

    const coursesSubjects = await db.select({
      level: CourseNames.englishLevel,
      totalLessonsCompleted: sql`SUM(${CourseNames.lessonCompleted}) / 6`
      })
      .from(CourseNames)
      .where(
        and(
            eq(CourseNames.userId, userId),
            eq(CourseNames.language ,language)
        )
      )
      .groupBy(CourseNames.englishLevel);

      res.json(coursesSubjects);

  } catch (error) {
    res.status(500).json({ message: "An error occurred while ", error });
  }
};

/* ------------------------------------------------------------------------------------ */

export const getLevelLessons = async (req: Request, res: Response): Promise<void> => {

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

    const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ;

    const coursesSubjects = await db
    .select()
    .from(CourseNames)
    .where(
      and(
        eq(CourseNames.englishLevel, userLevel),
        eq(CourseNames.userId, userId),
        eq(CourseNames.language ,language)
      )
    )
    .orderBy(CourseNames.courseOrder);

      res.json(coursesSubjects);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while ", error });
    }
}

/* ------------------------------------------------------------------------------------ */

export const getThirdLesson = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID is missing" });
      return;
  }

  try {
      const course = req.params.course;

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

    const maxRandomNumber = await db
    .select()
    .from(MissingWords)
    .where(
      eq(MissingWords.courseNameEnglish, course),
    )
    .orderBy(
      desc(MissingWords.missingSentenceOrder)
    )

  const randomNumber = Math.floor(Math.random() * (maxRandomNumber[0].missingSentenceOrder - 1) + 1)

  const currentForeignLesson = await db
    .select()
    .from(MissingWords)
    .where(
      and(
        eq(MissingWords.courseNameEnglish, course),
        eq(MissingWords.userId, userId),
        eq(MissingWords.language, language),
        eq(MissingWords.missingSentenceOrder, randomNumber)
      )
    );

  const currentHebrewLesson = await db
    .select()
    .from(MissingWords)
    .where(
      and(
        eq(MissingWords.courseNameEnglish, course),
        eq(MissingWords.userId, userId),
        eq(MissingWords.language, CourseLangauge.Hebrew),
        eq(MissingWords.missingSentenceOrder, randomNumber)
      )
    );
    const result = {
      hebrewSentence: currentHebrewLesson[0]?.missingSentence,
      hebrewWord: currentHebrewLesson[0]?.missingWord,
      foreignSentence: currentForeignLesson[0]?.missingSentence,
      foreignWord: currentForeignLesson[0]?.missingWord
    };
    
    res.json(result);
  
  } catch (error) {
    res.status(500).json({ message: "An error occurred while ", error });
  }
};

/* ------------------------------------------------------------------------------------ */

export const getSecondLesson = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: User ID is missing" });
    return;
  }

  try {
    const course = req.params.course;

    // find the user language
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

  // get random lesson
  const maxRandomNumber = await db
    .select()
    .from(Sentences)
    .where(
      eq(Sentences.courseNameEnglish, course),
    )
    .orderBy(
      desc(Sentences.senteceOrder)
    )
    .limit(1);

  const randomNumber = Math.floor(Math.random() * (maxRandomNumber[0].senteceOrder - 1) + 1)

  // get the lesson's words
  const currentLesson = await db
    .select()
    .from(Sentences)
    .where(
      and(
        eq(Sentences.courseNameEnglish, course),
        eq(Sentences.senteceOrder, randomNumber),
        eq(Sentences.userId, userId),
        eq(Sentences.language, language),
      )
    )
    .limit(1);

  const correctLessonWords = currentLesson[0].sentence.split(" ");

  const wordLanguage = (language: string) => {
    switch (language) {
      case CourseLangauge.German:
        return Words.germanWord; 
      case CourseLangauge.Italian:
        return Words.italianWord;
      case CourseLangauge.French:
        return Words.frenchWord;
      case CourseLangauge.Spanish:
        return Words.spanishWord;
      default:
        return Words.germanWord; 
    }
  };

  const FAILURE_WORDS = 12 - correctLessonWords.length;

  const failureLessonWords = await db
    .select({
      foreignWord: 
      language === CourseLangauge.Spanish
      ? Words.spanishWord
      : language === CourseLangauge.Italian
      ? Words.italianWord
      : language === CourseLangauge.French
      ? Words.frenchWord
      : Words.germanWord,
    })
    .from(Words)
    .where(
      and(
        notInArray(wordLanguage(language), correctLessonWords),
        eq(Words.courseNameEnglish, course),
        eq(Words.userId, userId),
      )
    )
    .limit(FAILURE_WORDS);

    const failureLessonWordsArray = failureLessonWords.map((item) => item.foreignWord);
    const WordsResult =[...correctLessonWords, failureLessonWordsArray].flat();

    // get lesson's sentence
    const currentForeignSentence = await db
    .select()
    .from(Sentences)
    .where(
      and(
        eq(Sentences.courseNameEnglish, course),
        eq(Sentences.userId, userId),
        eq(Sentences.senteceOrder, randomNumber),
        eq(Sentences.language, language)
      )
    );

  const currentHebrewSentence = await db
    .select()
    .from(Sentences)
    .where(
      and(
        eq(Sentences.courseNameEnglish, course),
        eq(Sentences.userId, userId),
        eq(Sentences.senteceOrder, randomNumber),
        eq(Sentences.language, CourseLangauge.Hebrew),
      )
    );

    const SentecncesResult = {
      hebrewSentence: currentHebrewSentence[0]?.sentence,
      foreignSentence: currentForeignSentence[0]?.sentence,
    };

    const result = {
      words: WordsResult,
      hebrewSentence: SentecncesResult.hebrewSentence,
      foreignSentence: SentecncesResult.foreignSentence
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the sentences.", error });
  }
};

/* ------------------------------------------------------------------------------------ */

export const updateLesson = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: User ID is missing" });
    return;
  }

  try {
    const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ; // string
    const course = req.params.course;                                                   // string

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

    // step 1: find current lesson order
    const lessonNumber = await db
      .select()
      .from(CourseNames)
      .where(
        and(
          eq(CourseNames.userId, userId),
          eq(CourseNames.englishLevel, userLevel),
          eq(CourseNames.courseNameEnglish, course),
          eq(CourseNames.language, language)
        )
      )
      .limit(1);

    if (!lessonNumber.length) {
      res.status(404).json({ message: "Course or lesson number not found." });
      return;
    }

    const lessonOrder = lessonNumber[0]?.lessonCompleted;
    if (lessonOrder == null) {
      res.status(404).json({ message: "Lesson order is missing or invalid." });
      return;
    }

    if (lessonOrder === 6) {
      return;
    }

    // step 2: find the course
    const [courseToUpdate] = await db
      .select()
      .from(CourseNames)
      .where(
        and(
          eq(CourseNames.englishLevel, userLevel),
          eq(CourseNames.courseNameEnglish, course),
          eq(CourseNames.userId, userId),
          eq(CourseNames.language, language)
        )
      )
      .limit(1);

    if (!courseToUpdate || !courseToUpdate.courseId) {
      res.status(404).json({ message: "Course not found or invalid courseId." });
      return;
    }

    // step 3: update the course
    const updatedCourse = await db
      .update(CourseNames)
      .set({ lessonCompleted: lessonOrder + 1 }) 
      .where(
        and(
          eq(CourseNames.userId, userId),
          eq(CourseNames.courseId, courseToUpdate.courseId),
          eq(CourseNames.englishLevel, userLevel),
          eq(CourseNames.courseNameEnglish, course),
          eq(CourseNames.language, language)
        )
      )
      .returning();

    res.json({ updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the lesson.", error });
  }
};

/* ------------------------------------------------------------------------------------ */

export const getFirstLessonWords = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
  
    if (!userId) {
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }
  
    try {
        const course = req.params.course;

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
  
        const currLesson = await db.select().from(Words).where(
          and(
            eq(Words.courseNameEnglish, course),
            eq(Words.userId, userId))
        )
        .orderBy(sql`RANDOM()`)
        .limit(6)

        const result: Array<{hebrewWord: string, foreignWord: string, coupleId: number}> = [];

        if (language === CourseLangauge.German) {
          currLesson.map((item, coupleId) => {
            result.push({
              hebrewWord: item.hebrewWord ?? "",
              foreignWord: item.germanWord ?? "",
              coupleId: coupleId + 1, 
            });
          });
        }
        
        if (language === CourseLangauge.French) {
          currLesson.map((item, coupleId) => {  
            result.push({
              hebrewWord: item.hebrewWord ?? "",
              foreignWord: item.frenchWord ?? "",
              coupleId: coupleId + 1, 
            });
          });
        }
        
        if (language === CourseLangauge.Italian) {
          currLesson.map((item, coupleId) => { 
            result.push({
              hebrewWord: item.hebrewWord ?? "",
              foreignWord: item.italianWord ?? "",
              coupleId: coupleId + 1, 
            });
          });
        }
        
        if (language === CourseLangauge.Spanish) {
          currLesson.map((item, coupleId) => {
            result.push({
              hebrewWord: item.hebrewWord ?? "",
              foreignWord: item.spanishWord ?? "",
              coupleId: coupleId + 1, 
            });
          });
        }
        
        res.json(result);
        

  
    } catch (error) {
      res.status(500).json({ message: "An error occurred while ", error });
    }
  };

