import express, { Request, Response } from "express";
import { db } from "./drizzle/db";
import { CourseNames, Words, Lessons } from "./drizzle/schema";
import "dotenv/config";
import cors from "cors";
import { eq, and } from "drizzle-orm";

// express
const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'PATCH'] }));


// e.g: /main/course/A2
app.get("/main/course/:userLevel", async (req: Request, res: Response) => {
    try {
        const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
        const coursesSubjects = await db.select().from(CourseNames).where(eq(CourseNames.levelEnglish, userLevel));
        res.json(coursesSubjects);
    } catch (err) {
        res.status(500).send("Error fetching courses");
    }
});


app.get("/main", async (req: Request, res: Response) => {
    try {
        const coursesSubjects = await db.select().from(CourseNames);
        res.json(coursesSubjects);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
    }
});

app.patch("/dictionary", async (req: Request, res: Response) => {
});

// /main/course/A1/Greeting
app.get("/main/course/:userLevel/:course/:completed", async (req: Request, res: Response) => {
    try {
        const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
        const course = req.params.course;
        const completed = Number(req.params.completed);

        const lesson = await db.select().from(Lessons).where(and(eq(Lessons.levelEnglish, userLevel), eq(Lessons.courseNameEnglish, course)))
        .limit(1)                   // get only 1 row
        .offset(completed);   // Skip the first 3 rows (4th row starts at index 3)


        res.json(lesson);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
    }
});

/* ------------------------------------------------------------------------------------------------------------------- */

// GET all words
app.get("/dictionary", async (req: Request, res: Response) => {
    try {
        const allWords = await db.select().from(Words);
        res.json(allWords);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
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
    } catch (err) {
        console.error("Error fetching word:", err);
        res.status(500).send("Error fetching word");
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
    } catch (err) {
        console.error("Error updating knowledge:", err);
        res.status(500).send("Error updating knowledge");
    }
});



app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
