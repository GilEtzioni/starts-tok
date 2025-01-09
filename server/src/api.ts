import express, { Request, Response } from "express";
import { db } from "./drizzle/db";
import { CourseNames, Words, Lessons } from "./drizzle/schema";
import "dotenv/config";
import cors from "cors";
import { eq, and, sql, desc } from "drizzle-orm";
import { clerkClient, clerkMiddleware, getAuth, requireAuth } from "@clerk/express";

// express
const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(
    clerkMiddleware({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    })
);

console.log("CLERK_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);

app.get("/protected", requireAuth(), async (req, res) => {

    const { userId } = getAuth(req);
  
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: No user ID found" });
      return;
    }
  
    try {
      const user = await clerkClient.users.getUser(userId);
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch user details" });
    }
  });


app.get("/main", requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        console.error("Unauthorized: Missing userId");
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }

    try {
        const coursesSubjects = await db
        .select().from(CourseNames).
        where(
            eq(CourseNames.clerkUserId, userId)
        );
        res.json(coursesSubjects);
    } catch (error) {
        throw error;
    }
});


app.get("/main/finished", requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        console.error("Unauthorized: Missing userId");
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
        console.error("Error fetching coursesSubjects:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// /main/course/A1/Greetings
app.get("/main/course/:userLevel/:course", requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        console.error("Unauthorized: Missing userId");
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
        throw error;
    }
});


// e.g: /main/course/A2
app.get("/main/course/:userLevel", requireAuth(), async (req: Request, res: Response) => {

    const { userId } = getAuth(req);

    if (!userId) {
        console.error("Unauthorized: Missing userId");
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
});

// e.g. /main/course/Weather/A1/
app.patch("/main/course/:userLevel/:course", requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        console.error("Unauthorized: Missing userId");
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
        console.log("\n\nthe error is in /main/course/:userLevel/:course\n\n")
        throw error;
    }
});

// /* ------------------------------------------------------------------------------------------------------------------- */

// GET all words
app.get("/dictionary",requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        console.error("Unauthorized: Missing userId");
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }
    try {
        const allWords = await db
        .select()
        .from(Words)
        .where(eq(Words.clerkUserId, userId));

        res.json(allWords);
    } catch (error) {
        throw error;
    }
});

// GET one word
app.get("/dictionary/:id", requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        console.error("Unauthorized: Missing userId");
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }

    try {
        const wordID = parseInt(req.params.id, 10); 
        if (isNaN(wordID)) {
            res.status(400).send("Invalid word ID");
        }

        const myWord = await db
        .select()
        .from(Words).
        where(
            and(
                eq(Words.id, wordID),
                eq(Words.clerkUserId, userId),
            ));
        if (myWord.length === 0) {
            res.status(404).send("Word not found");
        }

        res.json(myWord[0]); 
    } catch (error) {
        throw error;
    }
});

// PATCH a specific word
app.patch("/dictionary/:id", async (req: Request, res: Response) => {
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
});

// add new word
app.post("/dictionary/new", async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        console.error("Unauthorized: Missing userId");
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
      console.error(error);
      res.status(500).json({ error: "Failed to add the new word." });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});