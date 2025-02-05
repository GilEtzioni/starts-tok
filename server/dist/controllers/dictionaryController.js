"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinishedWordsCounter = exports.editWord = exports.addNewWord = exports.getFilterWords = exports.getAllWords = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const express_1 = require("@clerk/express");
const drizzle_orm_1 = require("drizzle-orm");
const uuid_1 = require("uuid");
const dictionaryType_1 = require("../types/dictionaryType");
const getAllWords = async (req, res) => {
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
        const language = userLanguage[0].language;
        const allWords = await db_1.db
            .select()
            .from(schema_1.Words)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Words.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Words.language, language), (0, drizzle_orm_1.isNotNull)(schema_1.Words.knowledge)))
            .orderBy(schema_1.Words.wordOrder);
        res.json(allWords);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching words", error });
    }
};
exports.getAllWords = getAllWords;
/* ----------------------------------------------------------------------------------------- */
const getFilterWords = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    const { levelArray, knowledgeArray } = req.query;
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    if (!levelArray || !knowledgeArray) {
        res.status(400).json({ error: "Missing 'levelArray' or 'knowledgeArray' in query parameters" });
        return;
    }
    try {
        const parsedLevelArray = JSON.parse(levelArray);
        const parsedKnowledgeArray = JSON.parse(knowledgeArray);
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
        const filters = [
            (0, drizzle_orm_1.eq)(schema_1.Words.userId, userId),
            (0, drizzle_orm_1.eq)(schema_1.Words.language, language),
            (0, drizzle_orm_1.isNotNull)(schema_1.Words.knowledge)
        ];
        if (parsedKnowledgeArray.length > 0) {
            filters.push((0, drizzle_orm_1.inArray)(schema_1.Words.knowledge, parsedKnowledgeArray));
        }
        if (parsedLevelArray.length > 0) {
            filters.push((0, drizzle_orm_1.inArray)(schema_1.Words.englishLevel, parsedLevelArray));
        }
        const allWords = await db_1.db
            .select()
            .from(schema_1.Words)
            .where((0, drizzle_orm_1.and)(...filters))
            .orderBy(schema_1.Words.wordOrder);
        res.json(allWords);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching words", error: error });
    }
};
exports.getFilterWords = getFilterWords;
/* ----------------------------------------------------------------------------------------- */
const addNewWord = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }
    const { foreignWord, hebrewWord } = req.body;
    if (!foreignWord || !hebrewWord) {
        res.status(400).json({ error: "Missing 'foreignWord' or 'hebrewWord' in request body" });
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
        const [lastCourseIndex] = await db_1.db
            .select()
            .from(schema_1.CourseNames)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.CourseNames.userId, userId), (0, drizzle_orm_1.eq)(schema_1.CourseNames.language, language)))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.CourseNames.courseId))
            .limit(1);
        const courseId = lastCourseIndex?.courseId || "default-course-id";
        const newWordId = (0, uuid_1.v4)();
        await db_1.db.insert(schema_1.Words).values({
            wordId: newWordId,
            userId,
            hebrewLevel: "המילים שהוספתי",
            englishLevel: "userWords",
            courseId,
            courseNameEnglish: "userWords",
            hebrewWord,
            foreignWord,
            language,
            knowledge: dictionaryType_1.DictionaryKnowledgeType.Ex,
        });
        const insertedWord = await db_1.db
            .select()
            .from(schema_1.Words)
            .where((0, drizzle_orm_1.eq)(schema_1.Words.wordId, newWordId))
            .limit(1);
        res.status(201).json(insertedWord[0]);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while adding a new word", error });
    }
};
exports.addNewWord = addNewWord;
/* ----------------------------------------------------------------------------------------- */
const editWord = async (req, res) => {
    const { id } = req.params;
    const { knowledge } = req.body;
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }
    if (!knowledge) {
        res.status(400).send("Missing 'knowledge' in request body");
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
        const updatedRows = await db_1.db
            .update(schema_1.Words)
            .set({
            knowledge: knowledge
        })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Words.wordId, id), (0, drizzle_orm_1.eq)(schema_1.Words.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Words.language, language)))
            .returning();
        if (updatedRows.length === 0) {
            res.status(404).send("Word not found");
            return;
        }
        res.json(updatedRows[0]);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while updating the word", error });
    }
};
exports.editWord = editWord;
/* ----------------------------------------------------------------------------------------- */
const getFinishedWordsCounter = async (req, res) => {
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
        const language = userLanguage[0].language;
        const wordFinishCounter = await db_1.db
            .select({ count: (0, drizzle_orm_1.count)() })
            .from(schema_1.Words)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Words.language, language), (0, drizzle_orm_1.eq)(schema_1.Words.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Words.knowledge, dictionaryType_1.DictionaryKnowledgeType.Vy)));
        if (!wordFinishCounter || wordFinishCounter.length === 0) {
            res.status(404).json({ error: "Words not found in /dictionary/finished" });
            return;
        }
        res.json(wordFinishCounter[0].count);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the word count", error });
    }
};
exports.getFinishedWordsCounter = getFinishedWordsCounter;
