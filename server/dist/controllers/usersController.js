"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestUsers = exports.genericUsersData = exports.getUserLanguage = exports.changeLanguage = exports.getOneDayPoints = exports.addPoints = exports.getLastWeekPoints = exports.getAllPoints = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const express_1 = require("@clerk/express");
const drizzle_orm_1 = require("drizzle-orm");
const userType_1 = require("../types/userType");
const userHelper_1 = require("../utils/userHelper");
const seedersType_1 = require("../types/seedersType");
const getAllPoints = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const allPointsCounter = await db_1.db
            .select({
            points: (0, drizzle_orm_1.sum)(schema_1.Users.points),
            userName: schema_1.Users.userName,
        })
            .from(schema_1.Users)
            .where((0, drizzle_orm_1.eq)(schema_1.Users.userId, userId))
            .groupBy(schema_1.Users.userName);
        if (!allPointsCounter) {
            res.status(404).json({ error: "users not found" });
            return;
        }
        res.json(allPointsCounter[0]);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the word count", error });
    }
};
exports.getAllPoints = getAllPoints;
/* ------------------------------------------------------------------------------------ */
const getLastWeekPoints = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const today = (0, userHelper_1.getTodayDate)(); // e.g. "15.01.2025"
    const lastWeek = (0, userHelper_1.getLastWeekDate)(); // e.g. "08.01.2025"
    try {
        const userRecord = await db_1.db
            .select()
            .from(schema_1.Users)
            .where((0, drizzle_orm_1.eq)(schema_1.Users.userId, userId))
            .limit(1);
        if (!userRecord.length) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const weekPoints = await db_1.db
            .select({
            date: schema_1.Users.pointsDate,
            points: (0, drizzle_orm_1.sql) `SUM(${schema_1.Users.points})`,
            day: (0, drizzle_orm_1.sql) `TO_CHAR(${schema_1.Users.pointsDate}, 'Day')`,
        })
            .from(schema_1.Users)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Users.userId, userId), (0, drizzle_orm_1.sql) `${schema_1.Users.pointsDate} BETWEEN ${lastWeek} AND ${today}`))
            .groupBy(schema_1.Users.pointsDate);
        const formattedPoints = weekPoints.map(point => ({
            date: point.date,
            points: Number(point.points),
            day: (0, userHelper_1.convertDateToDay)(point.date),
        }));
        res.status(200).json(formattedPoints);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the points for the last week",
            error: error,
        });
    }
};
exports.getLastWeekPoints = getLastWeekPoints;
/* ------------------------------------------------------------------------------------ */
const addPoints = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    const { newPoints } = req.body;
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    if (!newPoints) {
        res.status(400).send("Missing 'newPoints' in request body");
        return;
    }
    const today = (0, userHelper_1.getTodayDate)();
    try {
        const [userRecord] = await db_1.db
            .select()
            .from(schema_1.Users)
            .where((0, drizzle_orm_1.eq)(schema_1.Users.userId, userId))
            .limit(1);
        if (!userRecord) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const [insertedRecord] = await db_1.db
            .insert(schema_1.Users)
            .values({
            userId: userId,
            userName: userRecord.userName,
            points: newPoints,
            pointsDate: today,
        })
            .returning();
        res.status(201).json(insertedRecord);
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while POST new points",
            error: error,
        });
    }
};
exports.addPoints = addPoints;
/* ------------------------------------------------------------------------------------ */
const getOneDayPoints = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    const targetDay = req.params.day;
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    if (!Object.values(userType_1.DaysOfTheWeek).includes(targetDay)) {
        res.status(400).json({ error: "Invalid day" });
        return;
    }
    const targetDate = (0, userHelper_1.getDayDate)(targetDay);
    try {
        const [dayPointsCounter] = await db_1.db
            .select({ value: (0, drizzle_orm_1.sum)(schema_1.Users.points) })
            .from(schema_1.Users)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Users.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Users.pointsDate, targetDate)));
        if (!dayPointsCounter) {
            res.status(404).json({ error: "No points found for the selected day" });
            return;
        }
        res.json(Number(dayPointsCounter.value));
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the points", error });
    }
};
exports.getOneDayPoints = getOneDayPoints;
/* ------------------------------------------------------------------------------------ */
const changeLanguage = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    const { newLanguage } = req.body;
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    if (!newLanguage) {
        res.status(400).send("Missing 'newLanguage' in request body");
        return;
    }
    if (!Object.values(seedersType_1.CourseLangauge).includes(newLanguage)) {
        res.status(400).send("Incorrect language type");
        return;
    }
    try {
        const updatedUser = await db_1.db
            .update(schema_1.Language)
            .set({ language: newLanguage })
            .where((0, drizzle_orm_1.eq)(schema_1.Language.userId, userId))
            .returning();
        res.json(updatedUser[0].language);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the language", error });
    }
};
exports.changeLanguage = changeLanguage;
/* ------------------------------------------------------------------------------------ */
const getUserLanguage = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const userLanguage = await db_1.db
            .select()
            .from(schema_1.Language)
            .where((0, drizzle_orm_1.eq)(schema_1.Language.userId, userId))
            .limit(1);
        if (userLanguage.length === 0) {
            res.status(404).json({ error: "User language not found" });
            return;
        }
        res.json(userLanguage[0]?.language);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching words", error });
    }
};
exports.getUserLanguage = getUserLanguage;
/* ------------------------------------------------------------------------------------ */
exports.genericUsersData = [
    { userId: "first_user", userName: "גיל", totalPoints: 55, language: seedersType_1.CourseLangauge.German },
    { userId: "second_user", userName: "רוי", totalPoints: 51, language: seedersType_1.CourseLangauge.French },
    { userId: "third_user", userName: "עמית", totalPoints: 48, language: seedersType_1.CourseLangauge.Italian },
    { userId: "fourth_user", userName: "נדב", totalPoints: 47, language: seedersType_1.CourseLangauge.English },
    { userId: "fifth_user", userName: "נעם", totalPoints: 46, language: seedersType_1.CourseLangauge.Spanish },
];
const getBestUsers = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const today = (0, userHelper_1.getTodayDate)(); // e.g., "2025-01-22"
    const lastWeek = (0, userHelper_1.getLastWeekDate)(); // e.g., "2025-01-15"
    try {
        const weekPoints = await db_1.db
            .select({
            userId: schema_1.Users.userId,
            userName: schema_1.Users.userName,
            totalPoints: (0, drizzle_orm_1.sql) `SUM(${schema_1.Users.points})`,
            language: schema_1.Language.language,
        })
            .from(schema_1.Users)
            .innerJoin(schema_1.Language, (0, drizzle_orm_1.sql) `${schema_1.Language.userId} = ${schema_1.Users.userId}`)
            .where((0, drizzle_orm_1.sql) `${schema_1.Users.pointsDate} BETWEEN ${lastWeek} AND ${today}`)
            .groupBy(schema_1.Users.userId, schema_1.Users.userName, schema_1.Language.language);
        const combinedPoints = [...weekPoints, ...exports.genericUsersData];
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
    }
    catch (error) {
        console.error("Error fetching best users:", error);
        res.status(500).json({ message: "An error occurred while fetching best users", error });
    }
};
exports.getBestUsers = getBestUsers;
