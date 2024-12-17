import express, { Request, Response } from "express";
import { db } from "./drizzle/db";
import { CourseNames , Words , Lessons} from "./drizzle/schema";
import "dotenv/config";
import cors from "cors";
import { eq, and } from "drizzle-orm";

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' })); //allow all origins for testing

// e.g: /main/course/A2
app.get("/main/course/:userLevel", async (req: Request, res: Response) => {
    try {
        const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
        // console.log(`Fetching courses for level: ${userLevel}`); // Log the requested user level
        const coursesSubjects = await db.select().from(CourseNames).where(eq(CourseNames.level_english, userLevel));
        // console.log("Fetched coursesSubjects:", coursesSubjects); // Log fetched data for debugging
        res.json(coursesSubjects);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
    }
});


app.get("/main", async (req: Request, res: Response) => {
    try {
        const coursesSubjects = await db.select().from(CourseNames);
        // console.log("Fetched coursesSubjects:", coursesSubjects); 
        res.json(coursesSubjects);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
    }
});

// I will cahnge the pwd later...
app.get("/dictionary", async (req: Request, res: Response) => {
    try {
        const allWords = await db.select().from(Words);
        // console.log("Fetched coursesSubjects:", allWords); 
        res.json(allWords);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
    }
});

app.patch("/dictionary", async (req: Request, res: Response) => {
    /*
    try {
        const allWords = await db.select().from(Words);
        // console.log("Fetched coursesSubjects:", allWords); 
        res.json(allWords);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
    }
    */
});

// /main/course/A1/Greeting
app.get("/main/course/:userLevel/:course", async (req: Request, res: Response) => {
    try {
        const userLevel = req.params.userLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
        const course = req.params.course;

        const lesson = await db.select().from(Lessons).where(and(eq(Lessons.level_english, userLevel), eq(Lessons.course_name, course)));

        res.json(lesson);
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
    }
});


const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
