import { timestamp, pgTable, text, integer, pgEnum, serial, date } from "drizzle-orm/pg-core";

// enums
export const levelEnglishEnum = pgEnum("levelEnglish", ["A1", "A2", "B1", "B2", "C1", "C2", "userWords"]);
export const levelHebrewEnum = pgEnum("levelHebrew", ["מבוא", "בסיסי", "בינוני", "מתקדם", "מתקדם מאוד", "שפת אם", "המילים שהוספתי"]);
export const gameNameEnum = pgEnum("gameName", ["speedGame", "hangmanGame", "wordleGame"]);
export const languagesEnum = pgEnum("languages", ["german", "italian", "spanish", "french", "english", "hebrew" ]);

export const CourseNames = pgTable("courses", {
    userId: text("userId").notNull(),
    courseId: text("courseId").unique(), 
    englishLevel: levelEnglishEnum("englishLevel"),
    hebrewLevel: levelHebrewEnum("hebrewLevel"),
    courseNameEnglish: text("courseNameEnglish"),
    courseNameGerman: text("courseNameGerman"),
    courseNameHebrew: text("courseNameHebrew"),
    lessonCompleted: integer("lessonCompleted").notNull().$default(() => 0),
    courseOrder: integer("courseOrder"),
    language: languagesEnum("language"),
});


export const Lesson = pgTable("lesson", {
    courseId: text("courseId").notNull().references(() => CourseNames.courseId),
    userId: text("userId").notNull(),
    courseNameEnglish: text("courseNameEnglish"),
    sentenceOrder: integer("missingSentenceOrder").notNull(),
    language: languagesEnum("language").notNull(),
    sentence: text("missingSentence").notNull(),
    missingWord: text("missingWord").notNull(),
});

export const Words = pgTable("words", {
    userId: text("userId").notNull(),
    wordId: text("wordId"), 
    hebrewLevel: levelHebrewEnum("hebrewLevel"),
    englishLevel: levelEnglishEnum("englishLevel"),
    courseId: text("courseId").notNull().references(() => CourseNames.courseId),
    courseNameEnglish: text("courseNameEnglish"),
    hebrewWord: text("hebrewWord"),
    foreignWord: text("foreignWord"),
    language: languagesEnum("language").notNull(),
    knowledge: text("knowledge"),
    wordOrder: serial("wordOrder"),
    courseOrder: integer("courseOrder"),
});

export const Games = pgTable("games", {
    userId: text("userId").notNull(),
    gameId: text("gameId").notNull(),
    gameName: gameNameEnum("gameName"),
    gameScore: integer("gameScore"),
    createdAt: timestamp("createdAt").defaultNow(),
});

export const Users = pgTable("users", {
    userId: text("userId").notNull(),
    userName: text("userName").notNull(),
    points: integer("points"),
    pointsDate: date("pointsDate").defaultNow(),
});

export const Language = pgTable("language", {
    userId: text("userId").notNull(),
    language: languagesEnum("language").notNull(),
});