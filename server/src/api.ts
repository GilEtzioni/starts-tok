import express, { Request, Response } from "express";
import { db } from "./drizzle/db";
import { CourseNames, Words, Lessons, Games } from "./drizzle/schema";
import "dotenv/config";
import cors from "cors";
import { eq, and, sql, desc, max } from "drizzle-orm";

// express
const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'PATCH', 'POST'] }));


app.get("/main", async (req: Request, res: Response) => {
    try {
        const coursesSubjects = await db.select().from(CourseNames);
        res.json(coursesSubjects);
    } catch (error) {
        throw error;
    }
});
app.get("/main/finished", async (req: Request, res: Response) => {
    try {
        const coursesSubjects = await db.select({
            level: CourseNames.levelEnglish,
            totalLessonsCompleted: sql`SUM(${CourseNames.lessonCompleted}) / 6`
        })
        .from(CourseNames)
        .groupBy(CourseNames.levelEnglish);

        res.json(coursesSubjects);
    } catch (error) {
        res.status(500).json({ error: "error" });
    }
});

// /main/course/A1/Greetings
app.get("/main/course/:userLevel/:course", async (req: Request, res: Response) => {
    try {
        const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ; // string
        const course = req.params.course;                                                  // string

        // Step 1: Find the first not completed lesson
        const currLesson = await db.select().from(Lessons).where(
                and(
                    eq(Lessons.levelEnglish, userLevel),
                    eq(Lessons.courseNameEnglish, course),
                    eq(Lessons.finished, false) // find lessons where finished is false
                )
            )
            .orderBy(Lessons.id) // order by ID
            .limit(1); // only the first completed lesson

            res.json(currLesson);

    } catch (error) {
        throw error;
    }
});


// e.g: /main/course/A2
app.get("/main/course/:userLevel", async (req: Request, res: Response) => {
    try {
        const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ;
        const coursesSubjects = await db.select().from(CourseNames).where(eq(CourseNames.levelEnglish, userLevel)).orderBy(CourseNames.courseId);
        res.json(coursesSubjects);
    } catch (err) {
        res.status(500).send("Error fetching courses");
    }
});


app.patch("/main/course/:userLevel/:course", async (req: Request, res: Response) => {
    try {
        const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" ; // string
        const course = req.params.course;                                                  // string

        // step 1 - find the first completed lesson (table lessons)
        const [lessonToUpdate] = await db
            .select()
            .from(Lessons)
            .where(
                and(
                    eq(Lessons.levelEnglish, userLevel),
                    eq(Lessons.courseNameEnglish, course),
                    eq(Lessons.finished, false)      // find lessons that - finished is false
                )
            )
            .orderBy(Lessons.id) // order by ID
            .limit(1);           // only the first completed lesson

        if (!lessonToUpdate) {
            res.status(404).json({ message: "No completed lessons found for the specified course and level." });
        }

        // step 2 - patch the lesson as finished (table lessons)
        const updatedLesson = await db
            .update(Lessons)
            .set({ finished: true }) // set finished to false
            .where(eq(Lessons.id, lessonToUpdate.id))
            .returning(); 


        // step 3 - find the course (table courses)
        const [coursesToUpdate] = await db
        .select()
        .from(CourseNames)
        .where(and(eq(CourseNames.levelEnglish, userLevel), eq(CourseNames.courseNameEnglish, course)))


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
        throw error;
    }
});



/* ------------------------------------------------------------------------------------------------------------------- */

// GET all words
app.get("/dictionary", async (req: Request, res: Response) => {
    try {
        const allWords = await db.select().from(Words);
        res.json(allWords);
    } catch (error) {
        throw error;
    }
});

// GET one word
app.get("/dictionary/:id", async (req: Request, res: Response) => {
    try {
        const wordID = parseInt(req.params.id, 10); 
        if (isNaN(wordID)) {
            res.status(400).send("Invalid word ID");
        }

        const myWord = await db.select().from(Words).where(eq(Words.id, wordID));
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
    const { GermanWord, HebrewWord } = req.body;
  
    try {
      // find the last word index
      const [lastCourseIndex] = await db
        .select()
        .from(CourseNames)
        .orderBy(desc(CourseNames.courseId))
        .limit(1);
   
      const courseId = lastCourseIndex.courseId !== null && lastCourseIndex.courseId !== undefined
      ? parseInt(lastCourseIndex.courseId.toString()) : 1;

  
      // insert the new word
      const newWord = await db
        .insert(Words)
        .values({
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
  });


/* ------------------------------------------------------------------------------------------------------------------- */

app.get("/hangman", async (req: Request, res: Response) => {
    try {
        const coursesSubjects = await db.select().from(Words);
        res.json(coursesSubjects);
    } catch (err) {
        res.status(500).send("Error fetching courses");
    }
});

app.get("/hangman/allScore", async (req: Request, res: Response) => {
    try {
        const score = await db
            .select().from(Games)
            .where(eq(Games.gameName, "hangmanGame"));

        res.json(score);
    } catch (err) {
        res.status(500).send("Error fetching game score");
    }
});

app.get("/hangman/maxScore", async (req: Request, res: Response) => {
    try {
        const [highestScore] = await db
            .select({ maxScore: max(Games.gameScore) })
            .from(Games)
            .where(eq(Games.gameName, "hangmanGame"));

        res.json(highestScore);
    } catch (err) {
        res.status(500).send("Error fetching game score");
    }
});

app.post("/hangman/score", async (req: Request, res: Response) => {
    const { score } = req.body; 

    if (score === undefined || score === null) {
        res.status(400).send("Missing 'score' in request body");
    }

    try {
        const newScore = await db
            .insert(Games)
            .values({
                gameName: "hangmanGame",
                gameScore: score,
            }).returning({
                gameId: Games.gameId,
                gameName: Games.gameName,
                gameScore: Games.gameScore,
            });

        res.status(201).json(newScore);
    } catch (error) {
        res.status(500).send("An error occurred while saving the score");
    }    
});
  

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});