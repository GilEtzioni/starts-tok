import { pgTable, varchar, serial, text, integer, pgEnum } from "drizzle-orm/pg-core";

// enums
export const levelEnglish = pgEnum("level_english", ["A1", "A2", "B1", "B2", "C1", "C2"]);
export const levelHebrew = pgEnum("level_hebrew", ["מבוא", "בסיסי", "בינוני", "מתקדם", "מתקדם מאוד", "שפת אם"]);

// "courses" table
export const CourseNames = pgTable("courses", {
    id: serial("id").primaryKey(),
    level_english: levelEnglish("level_english"),
    level_hebrew: levelHebrew("level_hebrew"),
    courseName: text("courseName"),
});

// "words" table
export const Words = pgTable("words", {
    id: serial("id").primaryKey(),
    level_hebrew: levelHebrew("level_hebrew"),
    level_english: levelEnglish("level_english"),
    courseId: integer("course_id").references(() => CourseNames.id), // foreign key
    courseName: text("courseName"),
    GermanWord: text("german_word"),
    HebrewWord: text("hebrew_word"),
});

