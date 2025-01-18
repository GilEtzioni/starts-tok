import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { CourseNames, Lessons, Words } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { and, eq, sql } from "drizzle-orm";

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
          eq(CourseNames.userId, userId)
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
      .where(eq(CourseNames.userId, userId))
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
        from(CourseNames).
        where(and(
            eq(CourseNames.englishLevel, userLevel),
            eq(CourseNames.userId, userId)
        ))
        .orderBy(CourseNames.courseOrder);

        res.json(coursesSubjects);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while ", error });
    }
}

/* ------------------------------------------------------------------------------------ */

export const getCourseLessons = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID is missing" });
      return;
  }

  try {
      const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ; // string
      const course = req.params.course;                                                  // string

      // Step 1: Find the first not completed lesson
      const currLesson = await db.select().from(Lessons).where(
              and(
                  eq(Lessons.englishLevel, userLevel),
                  eq(Lessons.courseNameEnglish, course),
                  eq(Lessons.finished, false), // find lessons where finished is false
                  eq(Lessons.userId, userId))
              )
          .orderBy(Lessons.createdAt) // order by id (createdAt)
          .limit(1); // only the first completed lesson

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
      const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ; // string
      const course = req.params.course;                                                  // string

      // step 1 - find the first completed lesson (table lessons)
      const [lessonToUpdate] = await db
      .select()
      .from(Lessons)
      .innerJoin(
          CourseNames,
          and(
              eq(Lessons.englishLevel, CourseNames.englishLevel),
              eq(Lessons.courseNameEnglish, CourseNames.courseNameEnglish),
              eq(CourseNames.userId, userId)
          )
      )
      .where(
          and(
              eq(Lessons.englishLevel, userLevel),
              eq(Lessons.courseNameEnglish, course),
              eq(Lessons.finished, false) // find lessons that - finished is false
          )
      )
      .orderBy(Lessons.createdAt) // order by id (createdAt)
      .limit(1);

      if (!lessonToUpdate) {
          res.status(404).json({ message: "No completed lessons found for the specified course and level." });
      }

      // step 2 - patch the lesson as finished (table lessons)
      const updatedLesson = await db
          .update(Lessons)
          .set({ finished: true }) // set finished to false
          .where(eq(Lessons.courseId, lessonToUpdate.lessons.courseId))
          .returning(); 

      // step 3 - find the course (table courses)
      const [coursesToUpdate] = await db
      .select()
      .from(CourseNames)
      .where(
          and(
              eq(CourseNames.englishLevel, userLevel), 
              eq(CourseNames.courseNameEnglish, course),
              eq(CourseNames.userId, userId)
          ))


      // step 4 - patch the course (table courses)
      const updatedCourse = await db
      .update(CourseNames)
      .set({ lessonCompleted: coursesToUpdate.lessonCompleted +1 }) // set completed courses to +1
      .where(eq(CourseNames.courseId, coursesToUpdate.courseId))
      .returning(); 

      res.json({
          lesson: updatedLesson,
          course: updatedCourse
      });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while ", error });
  }
};

/* ------------------------------------------------------------------------------------ */

export const getCourseWords = async (req: Request, res: Response): Promise<void> => {
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