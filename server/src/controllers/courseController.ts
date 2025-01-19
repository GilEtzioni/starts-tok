import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { CourseNames, Words, Sentences, MissingWords } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { and, eq, sql, notInArray } from "drizzle-orm";
import { shuffleArray } from "../seeders/utils/helpingSeeders";

export const getCourses = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID is missing" });
      return;
  }

  try {
      const coursesSubjects = await db
      .select().from(CourseNames)
      .where(
        and(
            eq(CourseNames.userId, userId),
            eq(CourseNames.language ,"german")
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
      const coursesSubjects = await db.select({
          level: CourseNames.englishLevel,
          totalLessonsCompleted: sql`SUM(${CourseNames.lessonCompleted}) / 6`
      })
      .from(CourseNames)
      .where(
        and(
            eq(CourseNames.userId, userId),
            eq(CourseNames.language ,"german")
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
        const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ;
        const coursesSubjects = await db
        .select().
        from(CourseNames)
        .where(
            and(
                eq(CourseNames.englishLevel, userLevel),
                eq(CourseNames.userId, userId),
                eq(CourseNames.language ,"german")
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

          res.json(currLesson);

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

    const firstWordsArray = currLesson[0].sentenceOneGerman
    ? currLesson[0].sentenceOneGerman.replace(/[.,!?]/g, "").split(" ")
    : [];
  const secondWordsArray = currLesson[0].sentenceTwoGerman
    ? currLesson[0].sentenceTwoGerman.replace(/[.,!?]/g, "").split(" ")
    : [];
  
    const FIRST_FAILURE_WORDS = 12 - firstWordsArray.length;
    const SECOND_FAILURE_WORDS = 12 - secondWordsArray.length;

    const firstCourseWords = await db
      .select()
      .from(Words)
      .where(
        and(
          notInArray(Words.germanWord, firstWordsArray),
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
          notInArray(Words.germanWord, secondWordsArray),
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
    firstLesson.push(firstCourseWords.map((word) => word.germanWord).filter((word): word is string => word !== null));
    const firstLessonRandom = shuffleArray(firstLesson);

    secondLesson.push(shuffleArray(secondWordsArray));
    secondLesson.push(secondCourseWords.map((word) => word.germanWord).filter((word): word is string => word !== null));
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

          res.json(currLesson);

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
    const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
    const course = req.params.course;

    // step 1: find current lesson order
    const lessonNumber = await db
      .select()
      .from(CourseNames)
      .where(
        and(
          eq(CourseNames.userId, userId),
          eq(CourseNames.englishLevel, userLevel),
          eq(CourseNames.courseNameEnglish, course),
          eq(CourseNames.language, "german")
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
          eq(CourseNames.language, "german")
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
          eq(CourseNames.language, "german")
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
        const course = req.params.course;                                                  // string
  
        const currLesson = await db.select().from(Words).where(
                and(
                    eq(Words.englishLevel, userLevel),
                    eq(Words.courseNameEnglish, course),
                    eq(Words.userId, userId))
                )
                .orderBy(sql`RANDOM()`)
                .limit(6)
  
            res.json(currLesson);

  
    } catch (error) {
      res.status(500).json({ message: "An error occurred while ", error });
    }
  };