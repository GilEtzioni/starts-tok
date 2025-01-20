import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { Language, Users} from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { eq, and, sum, sql} from "drizzle-orm";
import { DaysOfTheWeek } from "../types/userType";
import { getTodayDate, getDayDate, getLastWeekDate, convertDateToDay } from "../utils/userHelper"
import { CourseLangauge } from "../types/seedersType";

export const getAllPoints = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    } 

    try {
        const [allPointsCounter] = await db
            .select({ value: sum(Users.points) })
            .from(Users)
            .where(
                and(
                    eq(Users.userId, userId)
                )
            );

        if (!allPointsCounter) {
            res.status(404).json({ error: "users not found" });
            return;
        }

        res.json(allPointsCounter.value);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the word count", error });
    }
};

/* ------------------------------------------------------------------------------------ */

export const getLastWeekPoints = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);

    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const today = getTodayDate();       // e.g. "15.01.2025"
    const lastWeek = getLastWeekDate(); // e.g. "08.01.2025"

    try {
        const userRecord = await db
            .select()
            .from(Users)
            .where(eq(Users.userId, userId))
            .limit(1);

        if (!userRecord.length) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const weekPoints = await db
            .select({
                date: Users.pointsDate,
                points: sql`SUM(${Users.points})`, 
                day: sql`TO_CHAR(${Users.pointsDate}, 'Day')`,
            })
            .from(Users)
            .where(
                and(
                    eq(Users.userId, userId),
                    sql`${Users.pointsDate} BETWEEN ${lastWeek} AND ${today}`
                )
            )
            .groupBy(Users.pointsDate);

        const formattedPoints = weekPoints.map(point => ({
            date: point.date,
            points: Number(point.points),
            day: convertDateToDay(point.date),
        }));

        res.status(200).json(formattedPoints);
    } catch (error) {
        console.error("Error fetching points:", error);
        res.status(500).json({
            message: "An error occurred while fetching the points for the last week",
            error: error,
        });
    }
};

/* ------------------------------------------------------------------------------------ */

export const addPoints = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    const { newPoints } = req.body; 

    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (!newPoints) {
        res.status(400).send("Missing 'newPoints' in request body");
        return;
    }

    const today = getTodayDate();

    try {
        const [userRecord] = await db
            .select()
            .from(Users)
            .where(eq(Users.userId, userId))
            .limit(1);

        if (!userRecord) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const [insertedRecord] = await db
            .insert(Users)
            .values({
                userId: userId,
                userName: userRecord.userName,
                points: newPoints,
                pointsDate: today,
            })
            .returning();

        res.status(201).json(insertedRecord);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while POST new points",
            error: error,
        });
    }
};

/* ------------------------------------------------------------------------------------ */

export const getOneDayPoints = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    const targetDay = req.params.day as DaysOfTheWeek;

    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (!Object.values(DaysOfTheWeek).includes(targetDay as DaysOfTheWeek)) {
        res.status(400).json({ error: "Invalid day" });
        return;
    }

    const targetDate = getDayDate(targetDay);

    try {
        const [dayPointsCounter] = await db
            .select({ value: sum(Users.points) })
            .from(Users)
            .where(
                and(
                    eq(Users.userId, userId),
                    eq(Users.pointsDate, targetDate)
                )
            );

        if (!dayPointsCounter) {
            res.status(404).json({ error: "No points found for the selected day" });
            return;
        }

        res.json(Number(dayPointsCounter.value));
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the points", error });
    }
};

/* ------------------------------------------------------------------------------------ */

export const changeLanguage = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    const { newLanguage } = req.body;

    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (!newLanguage) {
        res.status(400).send("Missing 'newLanguage' in request body");
        return;
    }

    if (!Object.values(CourseLangauge).includes(newLanguage)) {
        res.status(400).send("Incorrect language type");
        return;
    }

    try {
        const updatedUser = await db
        .update(Language)
        .set({ language: newLanguage })
        .where(
            eq(Language.userId, userId)
        )
        .returning();


        res.json(updatedUser[0].language);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the language", error });
    }
};

/* ------------------------------------------------------------------------------------ */

export const getUserLanguage = async (req: Request, res: Response): Promise<void> => {
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

      res.json(userLanguage[0]?.language);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching words", error });
    }
  };