import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { Users} from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { eq, and, sum, sql} from "drizzle-orm";

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

        // check if no users were found
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

const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const getTodayPoints = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    } 

    const today = getTodayDate();

    try {
        const [todayPointsCounter] = await db
            .select({ value: sum(Users.points) })
            .from(Users)
            .where(
                and(
                    eq(Users.userId, userId),
                    eq(Users.pointsDate, today)
                )
            );

        // check if no users were found
        if (!todayPointsCounter) {
            res.status(404).json({ error: "users not found" });
            return;
        }

        res.json(todayPointsCounter.value);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the word count", error });
    }
};

/* ------------------------------------------------------------------------------------ */

const getLastWeekDate = (): string => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return lastWeek.toISOString().split('T')[0];
};

export const getLastWeekPoints = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);

    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const today = getTodayDate();
    const lastWeek = getLastWeekDate();

    try {
        const [weekPointsCounter] = await db
            .select({ value: sum(Users.points) })
            .from(Users)
            .where(
                and(
                    eq(Users.userId, userId),
                    sql`DATE(${Users.pointsDate}) BETWEEN ${lastWeek} AND ${today}`
                )
            );

        if (!weekPointsCounter?.value) {
            res.status(404).json({ error: "No points found for the last week" });
            return;
        }

        res.status(200).json({ lastWeekPoints: weekPointsCounter.value });
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
