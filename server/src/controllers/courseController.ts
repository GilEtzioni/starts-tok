import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { CourseNames, Words, Sentences, MissingWords, Language } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { and, eq, sql, notInArray } from "drizzle-orm";
import { shuffleArray } from "../seeders/utils/helpingSeeders";
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
        .select().
        from(CourseNames)
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
      const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ; // string
      const course = req.params.course;                                                  // string

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

      const lessonNumber = await db.select().from(CourseNames).where(
        and(
          eq(CourseNames.englishLevel, userLevel),
          eq(CourseNames.courseNameEnglish, course),
        )
      )
      .limit(1);

      if (!lessonNumber.length) {
        res.status(404).json({ message: "Course or lesson number not found." });
        return;
      }  

      const lessonOrder = lessonNumber[0]?.courseOrder;
      if (lessonOrder == null) {
        res.status(404).json({ message: "Lesson order is missing or invalid." });
        return;
      }

      // Step 1: Find the first not completed lesson
      const currLesson = await db.select().from(MissingWords).where(
        and(
          eq(MissingWords.englishLevel, userLevel),
          eq(MissingWords.courseNameEnglish, course),
          eq(MissingWords.lessonOrder, lessonOrder),
          eq(MissingWords.userId, userId)),
        )
        .orderBy(MissingWords.lessonOrder)     // order by id (createdAt)
        .limit(1);                             // only the first completed lesson

        const result = {
          missingSentenceOneHebrew: currLesson[0].missingSentenceOneHebrew,
          missingWordOneHebrew: currLesson[0].missingWordOneHebrew,
          missingSentenceTwoHebrew: currLesson[0].missingSentenceTwoHebrew,
          missingWordTwoHebrew: currLesson[0].missingWordTwoHebrew,
          missingSentenceOneForeign: "",
          missingWordOneForeign: "",
          missingSentenceTwoForeign: "",
          missingWordTwoForeign: "",
        };
        
        if (language === CourseLangauge.German) {
          result.missingSentenceOneForeign = currLesson[0].missingSentenceOneGerman ?? "";
          result.missingWordOneForeign = currLesson[0].missingWordOneGerman ?? "";
          result.missingSentenceTwoForeign = currLesson[0].missingSentenceTwoGerman ?? "";
          result.missingWordTwoForeign = currLesson[0].missingWordTwoGerman ?? "";
        }

        if (language === CourseLangauge.French) {
          result.missingSentenceOneForeign = currLesson[0].missingSentenceOneFrench ?? "";
          result.missingWordOneForeign = currLesson[0].missingWordOneFrench ?? "";
          result.missingSentenceTwoForeign = currLesson[0].missingSentenceTwoFrench ?? "";
          result.missingWordTwoForeign = currLesson[0].missingWordTwoFrench ?? "";
        }

        if (language === CourseLangauge.Italian) {
          result.missingSentenceOneForeign = currLesson[0].missingSentenceOneItalian ?? "";
          result.missingWordOneForeign = currLesson[0].missingWordOneItalian ?? "";
          result.missingSentenceTwoForeign = currLesson[0].missingSentenceTwoItalian ?? "";
          result.missingWordTwoForeign = currLesson[0].missingWordTwoItalian ?? "";
        }

        if (language === CourseLangauge.Spanish) {
          result.missingSentenceOneForeign = currLesson[0].missingSentenceOneSpanish ?? "";
          result.missingWordOneForeign = currLesson[0].missingWordOneSpanish ?? "";
          result.missingSentenceTwoForeign = currLesson[0].missingSentenceTwoSpanish ?? "";
          result.missingWordTwoForeign = currLesson[0].missingWordTwoSpanish ?? "";
        }

      res.json(result);

  } catch (error) {
    res.status(500).json({ message: "An error occurred while ", error });
  }
};

/* ------------------------------------------------------------------------------------ */

export const getSecondLessonWords = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: User ID is missing" });
    return;
  }

  try {
    const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
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

  const lessonNumber = await db.select().from(CourseNames).where(
    and(
      eq(CourseNames.englishLevel, userLevel),
      eq(CourseNames.courseNameEnglish, course),
    )
  )
  .limit(1);

  if (!lessonNumber.length) {
    res.status(404).json({ message: "Course or lesson number not found." });
    return;
  }  

  const lessonOrder = lessonNumber[0]?.courseOrder;
  if (lessonOrder == null) {
    res.status(404).json({ message: "Lesson order is missing or invalid." });
    return;
  }

    const currLesson = await db
      .select()
      .from(Sentences)
      .where(
        and(
          eq(Sentences.englishLevel, userLevel),
          eq(Sentences.courseNameEnglish, course),
          eq(Sentences.lessonOrder, lessonOrder),
          eq(Sentences.userId, userId),
        )
      )
      .orderBy(Sentences.lessonOrder)
      .limit(1);

    if (currLesson.length === 0) {
      res.status(404).json({ error: "No lessons found" });
      return;
    }

    let firstWordsArray: string[] = [];
    if (language === CourseLangauge.Italian) {
        firstWordsArray = currLesson[0]?.sentenceOneItalian?.replace(/[.,!?]/g, "").split(" ") || [];
    } else if (language === CourseLangauge.Spanish) {
        firstWordsArray = currLesson[0]?.sentenceOneSpanish?.replace(/[.,!?]/g, "").split(" ") || [];
    } else if (language === CourseLangauge.German) {
        firstWordsArray = currLesson[0]?.sentenceOneGerman?.replace(/[.,!?]/g, "").split(" ") || [];
    } else if (language === CourseLangauge.French) {
        firstWordsArray = currLesson[0]?.sentenceOneFranch?.replace(/[.,!?]/g, "").split(" ") || [];
    }
    
    let secondWordsArray: string[] = [];
    if (language === CourseLangauge.Italian) {
        secondWordsArray = currLesson[0]?.sentenceTwoItalian?.replace(/[.,!?]/g, "").split(" ") || [];
    } else if (language === CourseLangauge.Spanish) {
        secondWordsArray = currLesson[0]?.sentenceTwoSpanish?.replace(/[.,!?]/g, "").split(" ") || [];
    } else if (language === CourseLangauge.German) {
        secondWordsArray = currLesson[0]?.sentenceTwoGerman?.replace(/[.,!?]/g, "").split(" ") || [];
    } else if (language === CourseLangauge.French) {
        secondWordsArray = currLesson[0]?.sentenceTwoFranch?.replace(/[.,!?]/g, "").split(" ") || [];
    }
    
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

    const FIRST_FAILURE_WORDS = 12 - firstWordsArray.length;
    const SECOND_FAILURE_WORDS = 12 - secondWordsArray.length;

    const firstCourseWords = await db
      .select()
      .from(Words)
      .where(
        and(
          notInArray(wordLanguage(language), firstWordsArray),
          eq(Words.englishLevel, userLevel),
          eq(Words.courseNameEnglish, course),
          eq(Words.userId, userId)
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(FIRST_FAILURE_WORDS);

    const secondCourseWords = await db
      .select()
      .from(Words)
      .where(
        and(
          notInArray(Words.italianWord, secondWordsArray),
          eq(Words.englishLevel, userLevel),
          eq(Words.courseNameEnglish, course),
          eq(Words.userId, userId)
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(SECOND_FAILURE_WORDS);

    const firstLesson: (string[])[] = [];
    const secondLesson: (string[])[] = [];
    const result: (string[])[] = [];

    firstLesson.push(shuffleArray(firstWordsArray));
    if (language === CourseLangauge.German) {
      firstLesson.push(firstCourseWords.map((word) => word.germanWord).filter((word): word is string => word !== null));
    }
    else if (language === CourseLangauge.Italian) {
      firstLesson.push(firstCourseWords.map((word) => word.italianWord).filter((word): word is string => word !== null));
    }
    else if (language === CourseLangauge.French) {
      firstLesson.push(firstCourseWords.map((word) => word.frenchWord).filter((word): word is string => word !== null));
    }
    else if (language === CourseLangauge.Spanish) {
      firstLesson.push(firstCourseWords.map((word) => word.spanishWord).filter((word): word is string => word !== null));
    }
    const firstLessonRandom = shuffleArray(firstLesson);

    secondLesson.push(shuffleArray(secondWordsArray));
    if (language === CourseLangauge.German) {
      firstLesson.push(secondCourseWords.map((word) => word.germanWord).filter((word): word is string => word !== null));
    }
    else if (language === CourseLangauge.Italian) {
      firstLesson.push(secondCourseWords.map((word) => word.italianWord).filter((word): word is string => word !== null));
    }
    else if (language === CourseLangauge.French) {
      firstLesson.push(secondCourseWords.map((word) => word.frenchWord).filter((word): word is string => word !== null));
    }
    else if (language === CourseLangauge.Spanish) {
      firstLesson.push(secondCourseWords.map((word) => word.spanishWord).filter((word): word is string => word !== null));
    }
    const secondLessonRandom = shuffleArray(secondLesson);

    result.push(firstLessonRandom.flat());
    result.push(secondLessonRandom.flat());

    const flatData = result.flat()

    if (flatData.length < 23) {
      res.status(400).json({ error: "Insufficient data to process the request" });
      return;
    }

    res.json(flatData);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching missing words.", error });
  }
};

/* ------------------------------------------------------------------------------------ */

export const getCourseSentence = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID is missing" });
      return;
  }

  try {
      const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ; // string
      const course = req.params.course;                                                  // string

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

  const lessonNumber = await db.select().from(CourseNames).where(
    and(
      eq(CourseNames.englishLevel, userLevel),
      eq(CourseNames.courseNameEnglish, course),
    )
  )
  .limit(1);

  if (!lessonNumber.length) {
    res.status(404).json({ message: "Course or lesson number not found." });
    return;
  }  

  const lessonOrder = lessonNumber[0]?.courseOrder;
  if (lessonOrder == null) {
    res.status(404).json({ message: "Lesson order is missing or invalid." });
    return;
  }

  const currLesson = await db.select().from(Sentences).where(
    and(
      eq(Sentences.englishLevel, userLevel),
      eq(Sentences.courseNameEnglish, course),
      eq(Sentences.lessonOrder, lessonOrder),
      eq(Sentences.userId, userId)),
      )
    .orderBy(Sentences.lessonOrder)
    .limit(1);

    const result: Array<{
      sentenceOneHebrew: string,
      sentenceTwoHebrew: string,
      sentenceOneForeign: string,
      sentenceTwoForeign: string,
      }> = [];

    if (language === CourseLangauge.German) {
      currLesson.map((item) => {
        result.push({
          sentenceOneHebrew: item.sentenceOneHebrew ?? "",
          sentenceTwoHebrew: item.sentenceTwoHebrew ?? "",
          sentenceOneForeign: item.sentenceOneGerman ?? "",
          sentenceTwoForeign: item.sentenceTwoGerman ?? "",
        });
      });
    }
    
    if (language === CourseLangauge.French) {
      currLesson.map((item) => {  
        result.push({
          sentenceOneHebrew: item.sentenceOneHebrew ?? "",
          sentenceTwoHebrew: item.sentenceTwoHebrew ?? "",
          sentenceOneForeign: item.sentenceOneFranch ?? "",
          sentenceTwoForeign: item.sentenceTwoFranch ?? "",
        });
      });
    }
    
    if (language === CourseLangauge.Italian) {
      currLesson.map((item) => { 
        result.push({
          sentenceOneHebrew: item.sentenceOneHebrew ?? "",
          sentenceTwoHebrew: item.sentenceTwoHebrew ?? "",
          sentenceOneForeign: item.sentenceOneItalian ?? "",
          sentenceTwoForeign: item.sentenceTwoItalian ?? "",
        });
      });
    }
    
    if (language === CourseLangauge.Spanish) {
      currLesson.map((item) => {
        result.push({
          sentenceOneHebrew: item.sentenceOneHebrew ?? "",
          sentenceTwoHebrew: item.sentenceTwoHebrew ?? "",
          sentenceOneForeign: item.sentenceOneSpanish?? "",
          sentenceTwoForeign: item.sentenceTwoSpanish ?? "",
        });
      });
    }
    res.json(result);

  } catch (error) {
    res.status(500).json({ message: "An error occurred while ", error });
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
  
        const currLesson = await db.select().from(Words).where(
          and(
            eq(Words.englishLevel, userLevel),
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