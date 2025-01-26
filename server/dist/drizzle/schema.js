"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = exports.Users = exports.Games = exports.Words = exports.MissingWords = exports.Sentences = exports.CourseNames = exports.languagesEnum = exports.gameNameEnum = exports.levelHebrewEnum = exports.levelEnglishEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// enums
exports.levelEnglishEnum = (0, pg_core_1.pgEnum)("levelEnglish", ["A1", "A2", "B1", "B2", "C1", "C2", "userWords"]);
exports.levelHebrewEnum = (0, pg_core_1.pgEnum)("levelHebrew", ["מבוא", "בסיסי", "בינוני", "מתקדם", "מתקדם מאוד", "שפת אם", "המילים שהוספתי"]);
exports.gameNameEnum = (0, pg_core_1.pgEnum)("gameName", ["speedGame", "hangmanGame", "wordleGame"]);
exports.languagesEnum = (0, pg_core_1.pgEnum)("languages", ["german", "italian", "spanish", "french", "english", "hebrew"]);
exports.CourseNames = (0, pg_core_1.pgTable)("courses", {
    userId: (0, pg_core_1.text)("userId").notNull(),
    courseId: (0, pg_core_1.text)("courseId").unique(),
    englishLevel: (0, exports.levelEnglishEnum)("englishLevel"),
    hebrewLevel: (0, exports.levelHebrewEnum)("hebrewLevel"),
    courseNameEnglish: (0, pg_core_1.text)("courseNameEnglish"),
    courseNameGerman: (0, pg_core_1.text)("courseNameGerman"),
    courseNameHebrew: (0, pg_core_1.text)("courseNameHebrew"),
    lessonCompleted: (0, pg_core_1.integer)("lessonCompleted").notNull().$default(() => 0),
    courseOrder: (0, pg_core_1.integer)("courseOrder"),
    language: (0, exports.languagesEnum)("language"),
});
exports.Sentences = (0, pg_core_1.pgTable)("sentences", {
    courseId: (0, pg_core_1.text)("courseId").notNull().references(() => exports.CourseNames.courseId),
    userId: (0, pg_core_1.text)("userId").notNull(),
    courseNameEnglish: (0, pg_core_1.text)("courseNameEnglish"),
    senteceOrder: (0, pg_core_1.integer)("sentenceOrder").notNull(),
    language: (0, exports.languagesEnum)("language").notNull(),
    sentence: (0, pg_core_1.text)("sentence").notNull(),
}, (table) => ({
    compositePrimaryKey: (0, pg_core_1.primaryKey)(table.userId, table.courseId, table.senteceOrder, table.language),
}));
exports.MissingWords = (0, pg_core_1.pgTable)("missingWords", {
    courseId: (0, pg_core_1.text)("courseId").notNull().references(() => exports.CourseNames.courseId),
    userId: (0, pg_core_1.text)("userId").notNull(),
    courseNameEnglish: (0, pg_core_1.text)("courseNameEnglish"),
    missingSentenceOrder: (0, pg_core_1.integer)("missingSentenceOrder").notNull(),
    language: (0, exports.languagesEnum)("language").notNull(),
    missingSentence: (0, pg_core_1.text)("missingSentence").notNull(),
    missingWord: (0, pg_core_1.text)("missingWord").notNull(),
}, (table) => ({
    compositePrimaryKey: (0, pg_core_1.primaryKey)(table.userId, table.courseId, table.missingSentenceOrder, table.language),
}));
exports.Words = (0, pg_core_1.pgTable)("words", {
    userId: (0, pg_core_1.text)("userId").notNull(),
    wordId: (0, pg_core_1.text)("wordId"),
    hebrewLevel: (0, exports.levelHebrewEnum)("hebrewLevel"),
    englishLevel: (0, exports.levelEnglishEnum)("englishLevel"),
    courseId: (0, pg_core_1.text)("courseId").notNull().references(() => exports.CourseNames.courseId),
    courseNameEnglish: (0, pg_core_1.text)("courseNameEnglish"),
    hebrewWord: (0, pg_core_1.text)("hebrewWord"),
    foreignWord: (0, pg_core_1.text)("foreignWord"),
    language: (0, exports.languagesEnum)("language").notNull(),
    knowledge: (0, pg_core_1.text)("knowledge"),
    wordOrder: (0, pg_core_1.serial)("wordOrder"),
    courseOrder: (0, pg_core_1.integer)("courseOrder"),
});
exports.Games = (0, pg_core_1.pgTable)("games", {
    userId: (0, pg_core_1.text)("userId").notNull(),
    gameId: (0, pg_core_1.text)("gameId").notNull(),
    gameName: (0, exports.gameNameEnum)("gameName"),
    gameScore: (0, pg_core_1.integer)("gameScore"),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
});
exports.Users = (0, pg_core_1.pgTable)("users", {
    userId: (0, pg_core_1.text)("userId").notNull(),
    userName: (0, pg_core_1.text)("userName").notNull(),
    points: (0, pg_core_1.integer)("points"),
    pointsDate: (0, pg_core_1.date)("pointsDate").defaultNow(),
});
exports.Language = (0, pg_core_1.pgTable)("language", {
    userId: (0, pg_core_1.text)("userId").notNull(),
    language: (0, exports.languagesEnum)("language").notNull(),
});
