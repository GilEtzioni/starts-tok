"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstLessonWords = exports.updateLesson = exports.getSecondLesson = exports.getThirdLesson = exports.getForthLesson = exports.getLevelLessons = exports.getFinishedCourses = exports.getCourses = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const express_1 = require("@clerk/express");
const drizzle_orm_1 = require("drizzle-orm");
const seedersType_1 = require("../types/seedersType");
const helpingSeeders_1 = require("../seeders/utils/helpingSeeders");
const helperSentece_1 = require("../seeders/utils/helperSentece");
const userHelper_1 = require("../utils/userHelper");
const getCourses = async (req, res) => {
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
        const coursesSubjects = await db_1.db
            .select().
            from(schema_1.CourseNames)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.CourseNames.userId, userId), (0, drizzle_orm_1.eq)(schema_1.CourseNames.language, language)));
        res.cookie("session", "your_session_value", {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json(coursesSubjects);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
};
exports.getCourses = getCourses;
/* ------------------------------------------------------------------------------------ */
const getFinishedCourses = async (req, res) => {
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
        const coursesSubjects = await db_1.db.select({
            level: schema_1.CourseNames.englishLevel,
            totalLessonsCompleted: (0, drizzle_orm_1.sql) `SUM(${schema_1.CourseNames.lessonCompleted}) / 6`
        })
            .from(schema_1.CourseNames)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.CourseNames.userId, userId), (0, drizzle_orm_1.eq)(schema_1.CourseNames.language, language)))
            .groupBy(schema_1.CourseNames.englishLevel);
        res.json(coursesSubjects);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
};
exports.getFinishedCourses = getFinishedCourses;
/* ------------------------------------------------------------------------------------ */
const getLevelLessons = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    const userLevel = req.params.userLevel;
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
        const coursesSubjects = await db_1.db
            .select()
            .from(schema_1.CourseNames)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.CourseNames.englishLevel, userLevel), (0, drizzle_orm_1.eq)(schema_1.CourseNames.userId, userId), (0, drizzle_orm_1.eq)(schema_1.CourseNames.language, language)))
            .orderBy(schema_1.CourseNames.courseOrder);
        res.json(coursesSubjects);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
};
exports.getLevelLessons = getLevelLessons;
/* ------------------------------------------------------------------------------------ */
const getForthLesson = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }
    try {
        const course = req.params.course;
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
        const maxRandomNumber = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.Lesson.sentenceOrder));
        const randomNumber = Math.floor(Math.random() * (maxRandomNumber[0].sentenceOrder - 1) + 1);
        const currentForeignLesson = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Lesson.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Lesson.language, language), (0, drizzle_orm_1.eq)(schema_1.Lesson.sentenceOrder, randomNumber)));
        const currentHebrewLesson = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Lesson.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Lesson.language, seedersType_1.CourseLangauge.Hebrew), (0, drizzle_orm_1.eq)(schema_1.Lesson.sentenceOrder, randomNumber)));
        const translatedArray = await (0, helperSentece_1.processSentence)(currentHebrewLesson[0]?.sentence ?? "", language);
        const { firstPart: firstPartForeign, secondPart: secondPartForeign } = (0, helperSentece_1.splitTheSentence)(currentForeignLesson[0]?.sentence ?? "", currentForeignLesson[0]?.missingWord ?? "");
        const currentSimillarWords = (await db_1.db
            .select({ foreignWord: schema_1.Words.foreignWord })
            .from(schema_1.Words)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Words.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Words.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Words.language, language), (0, drizzle_orm_1.ne)(schema_1.Words.foreignWord, currentForeignLesson[0]?.missingWord), (0, drizzle_orm_1.ne)(schema_1.Words.hebrewWord, currentHebrewLesson[0]?.missingWord)))
            .limit(3)).map((item) => ({
            foreignWord: item.foreignWord ?? "",
            isRightWord: false,
            isSelected: seedersType_1.IsSelected.NotSelected,
        }));
        currentSimillarWords.unshift({
            foreignWord: currentForeignLesson[0]?.missingWord ?? "",
            isRightWord: true,
            isSelected: seedersType_1.IsSelected.NotSelected,
        });
        const shuffleWords = (0, helpingSeeders_1.shuffleArray)(currentSimillarWords);
        const result = {
            hebrewSentence: currentHebrewLesson[0]?.sentence,
            hebrewWord: currentHebrewLesson[0]?.missingWord,
            foreignSentence: currentForeignLesson[0]?.sentence,
            foreignWord: currentForeignLesson[0]?.missingWord,
            gameWords: shuffleWords,
            translatedArray,
            firstPartForeign,
            secondPartForeign
        };
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred on forth lesson data while ", error });
    }
};
exports.getForthLesson = getForthLesson;
/* ------------------------------------------------------------------------------------ */
const getThirdLesson = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }
    try {
        const course = req.params.course;
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
        const maxRandomNumber = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.Lesson.sentenceOrder));
        const randomNumber = Math.floor(Math.random() * (maxRandomNumber[0].sentenceOrder - 1) + 1);
        const currentForeignLesson = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Lesson.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Lesson.language, language), (0, drizzle_orm_1.eq)(schema_1.Lesson.sentenceOrder, randomNumber)));
        const currentHebrewLesson = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Lesson.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Lesson.language, seedersType_1.CourseLangauge.Hebrew), (0, drizzle_orm_1.eq)(schema_1.Lesson.sentenceOrder, randomNumber)));
        const translatedArray = await (0, helperSentece_1.processSentence)(currentHebrewLesson[0]?.sentence ?? "", language);
        const { firstPart: firstPartForeign, secondPart: secondPartForeign } = (0, helperSentece_1.splitTheSentence)(currentForeignLesson[0]?.sentence ?? "", currentForeignLesson[0]?.missingWord ?? "");
        const letters = language === seedersType_1.CourseLangauge.French
            ? userHelper_1.languageLetters.french
            : language === seedersType_1.CourseLangauge.Italian
                ? userHelper_1.languageLetters.italian
                : language === seedersType_1.CourseLangauge.Spanish
                    ? userHelper_1.languageLetters.spanish
                    : language === seedersType_1.CourseLangauge.German
                        ? userHelper_1.languageLetters.german
                        : userHelper_1.languageLetters.english;
        const result = {
            hebrewSentence: currentHebrewLesson[0]?.sentence,
            hebrewWord: currentHebrewLesson[0]?.missingWord,
            foreignSentence: currentForeignLesson[0]?.sentence,
            foreignWord: currentForeignLesson[0]?.missingWord,
            translatedArray,
            firstPartForeign,
            secondPartForeign,
            letters
        };
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while ", error });
    }
};
exports.getThirdLesson = getThirdLesson;
/* ------------------------------------------------------------------------------------ */
const getSecondLesson = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }
    try {
        const course = req.params.course;
        // find the user language
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
        // get random lesson
        const maxRandomNumber = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.Lesson.sentenceOrder))
            .limit(1);
        const randomNumber = Math.floor(Math.random() * (maxRandomNumber[0].sentenceOrder - 1) + 1);
        // get the lesson's words
        const currentLesson = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Lesson.sentenceOrder, randomNumber), (0, drizzle_orm_1.eq)(schema_1.Lesson.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Lesson.language, language)))
            .limit(1);
        const correctLessonWords = currentLesson[0].sentence.toLowerCase().split(" ");
        const FAILURE_WORDS = Math.max(12 - correctLessonWords.length, 0);
        const failureLessonWords = await db_1.db
            .select({
            foreignWord: (0, drizzle_orm_1.sql) `LOWER(${schema_1.Words.foreignWord})`.as("foreignWord"),
        })
            .from(schema_1.Words)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.notInArray)((0, drizzle_orm_1.sql) `LOWER(${schema_1.Words.foreignWord})`, correctLessonWords), (0, drizzle_orm_1.eq)(schema_1.Words.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Words.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Words.language, language)))
            .orderBy((0, drizzle_orm_1.sql) `RANDOM()`)
            .limit(FAILURE_WORDS);
        const failureLessonWordsArray = failureLessonWords.map((item) => item.foreignWord);
        const flatWords = [...correctLessonWords, failureLessonWordsArray].flat();
        const WordsResult = [];
        flatWords.forEach((item, index) => {
            WordsResult.push({
                id: index,
                containerOrder: index,
                word: item ?? "",
                container: "down",
            });
        });
        const shuffleWords = (0, helpingSeeders_1.shuffleArray)(WordsResult);
        // get lesson's sentence
        const currentForeignSentence = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Lesson.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Lesson.sentenceOrder, randomNumber), (0, drizzle_orm_1.eq)(schema_1.Lesson.language, language)));
        const currentHebrewSentence = await db_1.db
            .select()
            .from(schema_1.Lesson)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Lesson.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Lesson.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Lesson.sentenceOrder, randomNumber), (0, drizzle_orm_1.eq)(schema_1.Lesson.language, seedersType_1.CourseLangauge.Hebrew)));
        const translatedArray = await (0, helperSentece_1.processSentence)(currentHebrewSentence[0]?.sentence ?? "", language);
        const result = {
            words: shuffleWords,
            hebrewSentence: currentHebrewSentence[0]?.sentence,
            foreignSentence: currentForeignSentence[0]?.sentence,
            translatedArray,
        };
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the sentences.", error });
    }
};
exports.getSecondLesson = getSecondLesson;
/* ------------------------------------------------------------------------------------ */
const updateLesson = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized: User ID is missing" });
        return;
    }
    try {
        const userLevel = req.params.userLevel; // string
        const course = req.params.course; // string
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
        // step 1: find current lesson order
        const lessonNumber = await db_1.db
            .select()
            .from(schema_1.CourseNames)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.CourseNames.userId, userId), (0, drizzle_orm_1.eq)(schema_1.CourseNames.englishLevel, userLevel), (0, drizzle_orm_1.eq)(schema_1.CourseNames.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.CourseNames.language, language)))
            .limit(1);
        if (!lessonNumber.length) {
            res.status(404).json({ message: "Course or lesson number not found." });
            return;
        }
        const lessonOrder = lessonNumber[0]?.lessonCompleted;
        if (lessonOrder == null) {
            res.status(404).json({ message: "Lesson order is missing or invalid." });
            return;
        }
        if (lessonOrder === 6) {
            return;
        }
        // step 2: find the course
        const [courseToUpdate] = await db_1.db
            .select()
            .from(schema_1.CourseNames)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.CourseNames.englishLevel, userLevel), (0, drizzle_orm_1.eq)(schema_1.CourseNames.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.CourseNames.userId, userId), (0, drizzle_orm_1.eq)(schema_1.CourseNames.language, language)))
            .limit(1);
        if (!courseToUpdate || !courseToUpdate.courseId) {
            res.status(404).json({ message: "Course not found or invalid courseId." });
            return;
        }
        // step 3: update the course
        const updatedCourse = await db_1.db
            .update(schema_1.CourseNames)
            .set({ lessonCompleted: lessonOrder + 1 })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.CourseNames.userId, userId), (0, drizzle_orm_1.eq)(schema_1.CourseNames.courseId, courseToUpdate.courseId), (0, drizzle_orm_1.eq)(schema_1.CourseNames.englishLevel, userLevel), (0, drizzle_orm_1.eq)(schema_1.CourseNames.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.CourseNames.language, language)))
            .returning();
        res.json({ updatedCourse });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while updating the lesson.", error });
    }
};
exports.updateLesson = updateLesson;
/* ------------------------------------------------------------------------------------ */
const getFirstLessonWords = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    const course = req.params.course;
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
        const currentLesson = await db_1.db
            .select({
            hebrewWord: schema_1.Words.hebrewWord,
            foreignWord: (0, drizzle_orm_1.sql) `LOWER(${schema_1.Words.foreignWord})`.as("word"),
            courseNameEnglish: schema_1.Words.courseNameEnglish,
            userId: schema_1.Words.userId,
            language: schema_1.Words.language,
        })
            .from(schema_1.Words)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.Words.courseNameEnglish, course), (0, drizzle_orm_1.eq)(schema_1.Words.userId, userId), (0, drizzle_orm_1.eq)(schema_1.Words.language, language)))
            .orderBy((0, drizzle_orm_1.sql) `RANDOM()`)
            .limit(6);
        const hebrewResult = [];
        const foreignResult = [];
        currentLesson.map((item, coupleId) => {
            hebrewResult.push({
                word: item.hebrewWord ?? "",
                coupleId: coupleId + 1,
                isSelected: "notSelected",
            });
            foreignResult.push({
                word: item.foreignWord ?? "",
                coupleId: coupleId + 1,
                isSelected: "notSelected",
            });
        });
        const result = {
            hebrew: (0, helpingSeeders_1.shuffleArray)(hebrewResult),
            foreign: (0, helpingSeeders_1.shuffleArray)(foreignResult),
        };
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the lesson words.", error });
    }
};
exports.getFirstLessonWords = getFirstLessonWords;
