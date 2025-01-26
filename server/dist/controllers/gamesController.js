"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyboard = exports.addGameScore = exports.getGameMaxScore = exports.getAllWords = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const express_1 = require("@clerk/express");
const drizzle_orm_1 = require("drizzle-orm");
const seedersType_1 = require("../types/seedersType");
const userHelper_1 = require("../utils/userHelper");
const getAllWords = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const coursesSubjects = await db_1.db
            .select()
            .from(schema_1.Words)
            .where((0, drizzle_orm_1.eq)(schema_1.Words.userId, userId));
        res.json(coursesSubjects);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
};
exports.getAllWords = getAllWords;
/* ------------------------------------------------------------------------------------ */
const getGameMaxScore = async (req, res, gameName) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const [highestScore] = await db_1.db
            .select({ maxScore: (0, drizzle_orm_1.max)(schema_1.Games.gameScore) })
            .from(schema_1.Games)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Games.gameName, gameName), (0, drizzle_orm_1.eq)(schema_1.Games.userId, userId)));
        res.json(highestScore);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
};
exports.getGameMaxScore = getGameMaxScore;
/* ------------------------------------------------------------------------------------ */
const addGameScore = async (req, res, gameName) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const { score } = req.body;
    if (score === undefined || score === null) {
        res.status(400).send("Missing 'score' in request body");
        return;
    }
    try {
        const userGame = await db_1.db
            .select()
            .from(schema_1.Games)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Games.gameName, gameName), (0, drizzle_orm_1.eq)(schema_1.Games.userId, userId)))
            .limit(1);
        const userGameId = userGame[0]?.gameId;
        if (!userGameId) {
            res.status(404).json({ error: "Game not found for user" });
            return;
        }
        const newScore = await db_1.db
            .insert(schema_1.Games)
            .values({
            userId: userId,
            gameId: userGameId,
            gameName: gameName,
            gameScore: score,
        })
            .returning({
            gameName: schema_1.Games.gameName,
            gameScore: schema_1.Games.gameScore,
            createdAt: schema_1.Games.createdAt,
        });
        res.status(201).json(newScore);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while adding the score", error });
    }
};
exports.addGameScore = addGameScore;
/* ------------------------------------------------------------------------------------ */
const getKeyboard = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
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
        const language = userLanguage[0].language;
        const keyborad = language === seedersType_1.CourseLangauge.French
            ? userHelper_1.languageDictionaries.french
            : language === seedersType_1.CourseLangauge.Italian
                ? userHelper_1.languageDictionaries.italian
                : language === seedersType_1.CourseLangauge.Spanish
                    ? userHelper_1.languageDictionaries.spanish
                    : language === seedersType_1.CourseLangauge.German
                        ? userHelper_1.languageDictionaries.german
                        : userHelper_1.languageDictionaries.english;
        res.json(keyborad);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
};
exports.getKeyboard = getKeyboard;
