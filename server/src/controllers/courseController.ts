import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { CourseNames, Lessons } from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { and, eq, sql } from "drizzle-orm";

export const getCourses = async (req: Request, res: Response): Promise<any> => {
  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID is missing" });
      return;
  }

  try {
      const coursesSubjects = await db
      .select().from(CourseNames)
      .where(
          eq(CourseNames.clerkUserId, userId)
      );
      res.json(coursesSubjects);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFinishedCourses = async (req: Request, res: Response): Promise<any> => {
  const { userId } = getAuth(req);

  if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID is missing" });
      return;
  }

  try {
      const coursesSubjects = await db.select({
          level: CourseNames.levelEnglish,
          totalLessonsCompleted: sql`SUM(${CourseNames.lessonCompleted}) / 6`
      })
      .from(CourseNames)
      .where(eq(CourseNames.clerkUserId, userId))
      .groupBy(CourseNames.levelEnglish);

      res.json(coursesSubjects);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLevelLessons = async (req: Request, res: Response): Promise<any> => {

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
          eq(CourseNames.levelEnglish, userLevel),
          eq(CourseNames.clerkUserId, userId)
      ))
          .orderBy(CourseNames.courseId);
      res.json(coursesSubjects);
  } catch (err) {
      res.status(500).send("Error fetching courses");
  }
}

export const getCourseLessons = async (req: Request, res: Response): Promise<any> => {
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
                  eq(Lessons.levelEnglish, userLevel),
                  eq(Lessons.courseNameEnglish, course),
                  eq(Lessons.finished, false), // find lessons where finished is false
                  eq(Lessons.clerkUserId, userId))
              )
          .orderBy(Lessons.id) // order by ID
          .limit(1); // only the first completed lesson

          res.json(currLesson);

  } catch (error) {
    res.status(401).json({ error: "eror" });
  }
};

export const updateLesson = async (req: Request, res: Response): Promise<any> => {
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
              eq(Lessons.levelEnglish, CourseNames.levelEnglish),
              eq(Lessons.courseNameEnglish, CourseNames.courseNameEnglish),
              eq(CourseNames.clerkUserId, userId)
          )
      )
      .where(
          and(
              eq(Lessons.levelEnglish, userLevel),
              eq(Lessons.courseNameEnglish, course),
              eq(Lessons.finished, false) // find lessons that - finished is false
          )
      )
      .orderBy(Lessons.id)
      .limit(1);

      if (!lessonToUpdate) {
          res.status(404).json({ message: "No completed lessons found for the specified course and level." });
      }

      // step 2 - patch the lesson as finished (table lessons)
      const updatedLesson = await db
          .update(Lessons)
          .set({ finished: true }) // set finished to false
          .where(eq(Lessons.id, lessonToUpdate.lessons.id))
          .returning(); 

      // step 3 - find the course (table courses)
      const [coursesToUpdate] = await db
      .select()
      .from(CourseNames)
      .where(
          and(
              eq(CourseNames.levelEnglish, userLevel), 
              eq(CourseNames.courseNameEnglish, course),
              eq(CourseNames.clerkUserId, userId)
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
    res.status(401).json({ error: "eror" });
  }
};
