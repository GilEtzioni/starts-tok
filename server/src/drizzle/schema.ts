import { timestamp, pgTable, text, integer, pgEnum, boolean, serial, date } from "drizzle-orm/pg-core";

// enums
export const levelEnglishEnum = pgEnum("levelEnglish", ["A1", "A2", "B1", "B2", "C1", "C2", "userWords"]);
export const levelHebrewEnum = pgEnum("levelHebrew", ["מבוא", "בסיסי", "בינוני", "מתקדם", "מתקדם מאוד", "שפת אם", "המילים שהוספתי"]);
export const gameNameEnum = pgEnum("gameName", ["speedGame", "hangmanGame", "wordleGame"]);
export const languagesEnum = pgEnum("languages", ["german", "italian", "spanish", "french" ]);

export const CourseNames = pgTable("courses", {
    userId: text("userId").notNull(),
    courseId: text("courseId").unique(), 
    englishLevel: levelEnglishEnum("englishLevel"),
    hebrewLevel: levelHebrewEnum("hebrewLevel"),
    courseNameEnglish: text("courseNameEnglish"),
    courseNameGerman: text("courseNameGerman"),
    courseNameHebrew: text("courseNameHebrew"),
    lessonCompleted: integer("lessonCompleted").notNull().$default(() => 0), // 0-5
    courseOrder: integer("courseOrder"),
    language: languagesEnum("language"),
});

export const Words = pgTable("words", {
    userId: text("userId").notNull(),
    wordId: text("wordId").primaryKey(), 
    hebrewLevel: levelHebrewEnum("hebrewLevel"),
    englishLevel: levelEnglishEnum("englishLevel"),
    courseId: text("courseId").notNull().references(() => CourseNames.courseId), // foreign key
    courseNameEnglish: text("courseNameEnglish"),
    hebrewWord: text("hebrewWord"),
    germanWord: text("germanWord"),
    italianWord: text("italianWord"),
    spanishWord: text("spanishWord"),
    frenchWord: text("frenchWord"),    
    germanKnowledge: text("germanKnowledge"),
    italianKnowledge: text("italianKnowledge"),
    spanishKnowledge: text("spanishKnowledge"),
    frenchKnowledge: text("frenchKnowledge"),
    wordOrder: serial("wordOrder"),
    courseOrder: integer("courseOrder"),
});

export const Sentences = pgTable("sentences", {
    userId: text("userId").notNull(),
    hebrewLevel: levelHebrewEnum("hebrewLevel"),     // ״מתחילים״
    englishLevel: levelEnglishEnum("englishLevel"),  // A1

    courseNameEnglish: text("courseNameEnglish"), // Greeting
    courseId: text("courseId").notNull().references(() => CourseNames.courseId), // foreign key

    lessonOrder: integer("lessonId"),               // 0-5

    // sentences
    sentenceOneHebrew: text("sentenceOneHebrew"),
    sentenceTwoHebrew: text("sentenceTwoHebrew"),

    sentenceOneGerman: text("sentenceOneGerman"), 
    sentenceTwoGerman: text("sentenceTwoGerman"), 

    sentenceOneItalian: text("sentenceOneItalian"),
    sentenceTwoItalian: text("sentenceTwoItalian"),

    sentenceOneSpanish: text("sentenceOneSpanish"),
    sentenceTwoSpanish: text("sentenceTwoSpanish"), 

    sentenceOneFranch: text("sentenceOneFranch"),
    sentenceTwoFranch: text("sentenceTwoFranch"), 

    // words
    finished: boolean("finished"),
});

export const MissingWords = pgTable("missingWords", {
    userId: text("userId").notNull(),
    hebrewLevel: levelHebrewEnum("hebrewLevel"),     // ״מתחילים״
    englishLevel: levelEnglishEnum("englishLevel"),  // A1

    courseNameEnglish: text("courseNameEnglish"), // Greeting
    courseId: text("courseId").notNull().references(() => CourseNames.courseId), // foreign key

    lessonOrder: integer("lessonId"),               // 0-5

    // missing sentences
    missingSentenceOneHebrew: text("missingSentenceOneHebrew"),
    missingWordOneHebrew: text("missingWordOneHebrew"),
    missingSentenceTwoHebrew: text("missingSentenceTwoHebrew"),
    missingWordTwoHebrew: text("missingWordTwoHebrew"),

    missingSentenceOneGerman: text("missingSentenceOneGerman"), // hallo! _____ morgen
    missingWordOneGerman: text("missingWordOneGerman"),         // guten
    missingSentenceTwoGerman: text("missingSentenceTwoGerman"),
    missingWordTwoGerman: text("missingWordTwoGerman"),

    missingSentenceOneItalian: text("missingSentenceOneItalian"),
    missingWordOneItalian: text("missingWordOneItalian"),
    missingSentenceTwoItalian: text("missingSentenceTwoItalian"),
    missingWordTwoItalian: text("missingWordTwoItalian"),

    missingSentenceOneSpanish: text("missingSentenceOneSpanish"),
    missingWordOneSpanish: text("missingWordOneSpanish"),
    missingSentenceTwoSpanish: text("missingSentenceTwoSpanish"),
    missingWordTwoSpanish: text("missingWordTwoSpanish"),

    missingSentenceOneFrench: text("missingSentenceOneFrench"),
    missingWordOneFrench: text("missingWordOneFrench"),
    missingSentenceTwoFrench: text("missingSentenceFrench"),
    missingWordTwoFrench: text("missingWordTwoFrench"),

    // words
    finished: boolean("finished"),
});

// "games" table
export const Games = pgTable("games", {
    userId: text("userId").notNull(),
    gameId: text("gameId").notNull(),
    gameName: gameNameEnum("gameName"),
    gameScore: integer("gameScore"),
    createdAt: timestamp("createdAt").defaultNow(), //filter by created time
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