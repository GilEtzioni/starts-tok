import { pgTable, varchar, serial, text, integer, pgEnum} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";

// enums
export const levelEnglishEnum = pgEnum("levelEnglish", ["A1", "A2", "B1", "B2", "C1", "C2"]);
export const levelHebrewEnum = pgEnum("levelHebrew", ["מבוא", "בסיסי", "בינוני", "מתקדם", "מתקדם מאוד", "שפת אם"]);

// "courses" table
export const CourseNames = pgTable("courses", {
    courseId: serial("courseId").primaryKey(),
    levelEnglish: levelEnglishEnum("levelEnglish"),
    levelHebrew: levelHebrewEnum("levelHebrew"),
    courseNameEnglish: text("courseNameEnglish"),
    courseNameGerman: text("courseNameGerman"),
    courseNameHebrew: text("courseNameHebrew"),
    lessonCompleted: integer("lessonCompleted").notNull().$default(() => 0), // 0-5
});

// "words" table
export const Words = pgTable("words", {
    id: serial("id").primaryKey(),
    levelHebrew: levelHebrewEnum("levelHebrew"),
    levelEnglish: levelEnglishEnum("levelEnglish"),
    courseId: integer("courseId").references(() => CourseNames.courseId), // foreign key
    courseNameEnglish: text("courseNameEnglish"),
    GermanWord: text("GermanWord"),
    HebrewWord: text("HebrewWord"),
    knowlage: text("knowlage"),
});

// "lessons" table
// no primary key --> add later if needed!
export const Lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),               // 1-150

    levelHebrew: levelHebrewEnum("levelHebrew"),     // ״מתחילים״
    levelEnglish: levelEnglishEnum("levelEnglish"),  // A1

    courseNameEnglish: text("courseNameEnglish"), // Greeting
    courseId: integer("courseId").references(() => CourseNames.courseId), // foreign key

    lessonId: integer("lessonId"),               // 1-6

    // sentences
    sentenceOneGerman: text("sentenceOneGerman"), // "hallo wie gehts",
    sentenceOneHebrew: text("sentenceOneHebrew"),

    sentenceTwoGerman: text("sentenceTwoGerman"), // "guten morgen"
    sentenceTwoHebrew: text("sentenceTwoHebrew"),

    // missing sentences
    missingSentenceOneGerman: text("missingSentenceOneGerman"), // hallo! _____ morgen
    missingSentenceOneHebrew: text("missingSentenceOneHebrew"),
    missingWordOneGerman: text("missingWordOneGerman"),         // guten
    missingWordOneHebrew: text("missingWordOneHebrew"),

    missingSentenceTwoGerman: text("missingSentenceTwoGerman"),
    missingSentenceTwoHebrew: text("missingSentenceTwoHebrew"),
    missingWordTwoGerman: text("missingWordTwoGerman"),
    missingWordTwoHebrew: text("missingWordTwoHebrew"),

    // words
    wordOneGerman: text("wordOneGerman"),
    wordOneHebrew: text("wordOneHebrew"),
    wordTwoGerman: text("wordTwoGerman"),
    wordTwoHebrew: text("wordTwoHebrew"),
    wordThreeGerman: text("wordThreeGerman"),
    wordThreeHebrew: text("wordThreeHebrew"),
    wordFourGerman: text("wordFourGerman"),
    wordFourHebrew: text("wordFourHebrew"),
    wordFiveGerman: text("wordFiveGerman"),
    wordFiveHebrew: text("wordFiveHebrew"),
    wordSixGerman: text("wordSixGerman"),
    wordSixHebrew: text("wordSixHebrew"),
    wordSevenGerman: text("wordSevenGerman"),
    wordSevenHebrew: text("wordSevenHebrew"),
    wordEightGerman: text("wordEightGerman"),
    wordEightHebrew: text("wordEightHebrew"),
    wordNineGerman: text("wordNineGerman"),
    wordNineHebrew: text("wordNineHebrew"),
    wordTenGerman: text("wordTenGerman"),
    wordTenHebrew: text("wordTenHebrew"),
    wordElevenGerman: text("wordElevenGerman"),
    wordElevenHebrew: text("wordElevenHebrew"),
    wordTwelveGerman: text("wordTwelveGerman"),
    wordTwelveHebrew: text("wordTwelveHebrew"),
});