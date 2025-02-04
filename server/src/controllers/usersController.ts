import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { Language, Users} from "../drizzle/schema";
import { getAuth } from "@clerk/express";
import { eq, and, sum, sql} from "drizzle-orm";
import { DaysOfTheWeek } from "../types/userType";
import { getTodayDate, getDayDate, getLastWeekDate, convertDateToDay } from "../utils/userHelper"
import { CourseLangauge } from "../types/seedersType";
import { mainSeeder } from "../seeders/mainSeeder";

export const getAllPoints = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    } 

    try {
        const allPointsCounter = await db
        .select({ 
          points: sum(Users.points),
          userName: Users.userName,
        })
        .from(Users)
        .where(eq(Users.userId, userId))
        .groupBy(Users.userName);

        if (!allPointsCounter) {
            res.status(404).json({ error: "users not found" });
            return;
        }

        res.json(allPointsCounter[0]);
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

  /* ------------------------------------------------------------------------------------ */

  export const genericUsersData = 
  [
    { userId: "first_user", userName: "גיל", totalPoints: 55, language: CourseLangauge.German },
    { userId: "second_user", userName: "רוי", totalPoints: 51, language: CourseLangauge.French },
    { userId: "third_user", userName: "עמית", totalPoints: 48, language: CourseLangauge.Italian },
    { userId: "fourth_user", userName: "נדב", totalPoints: 47, language: CourseLangauge.English },
    { userId: "fifth_user", userName: "נעם", totalPoints: 46, language: CourseLangauge.Spanish },
  ];
  
  export const getBestUsers = async (req: Request, res: Response): Promise<void> => {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  
    const today = getTodayDate();       // e.g., "2025-01-22"
    const lastWeek = getLastWeekDate(); // e.g., "2025-01-15"
  
    try {
      const weekPoints = await db
        .select({
          userId: Users.userId,
          userName: Users.userName,
          totalPoints: sql`SUM(${Users.points})`,
          language: Language.language,
        })
        .from(Users)
        .innerJoin(Language, sql`${Language.userId} = ${Users.userId}`)
        .where(sql`${Users.pointsDate} BETWEEN ${lastWeek} AND ${today}`)
        .groupBy(Users.userId, Users.userName, Language.language);
  
      const combinedPoints = [...weekPoints, ...genericUsersData];

      // conver the point to number
      const formattedWeekPoints = combinedPoints.map((point) => ({
        ...point,
        totalPoints: Number(point.totalPoints),
      }));
  
      // add key based on the user points
      const rankedPoints = formattedWeekPoints
        .sort((a, b) => b.totalPoints - a.totalPoints) 
        .slice(0, 5)
        .map((item, index) => ({ ...item, key: index + 1 }));
  
      res.status(200).json(rankedPoints);
    } catch (error) {
      console.error("Error fetching best users:", error);
      res.status(500).json({ message: "An error occurred while fetching best users", error });
    }
  };

/* ------------------------------------------------------------------------------------ */

export const createDataBase = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
         res.status(401).json({ error: "Unauthorized" });
         return;
      }
  
      console.log(`Seeding database for user: ${userId}`);
      await mainSeeder(userId);
  
      res.status(200).json({ message: "Database seeded successfully" });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ error: "Failed to seed database" });
    } 
}