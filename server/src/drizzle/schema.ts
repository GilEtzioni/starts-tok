import { pgTable, varchar, serial, text, integer, pgEnum} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";

// enums
export const levelEnglish = pgEnum("level_english", ["A1", "A2", "B1", "B2", "C1", "C2"]);
export const levelHebrew = pgEnum("level_hebrew", ["מבוא", "בסיסי", "בינוני", "מתקדם", "מתקדם מאוד", "שפת אם"]);

// "courses" table
export const CourseNames = pgTable("courses", {
    id: serial("id").primaryKey(),
    level_english: levelEnglish("level_english"),
    level_hebrew: levelHebrew("level_hebrew"),
    course_name: text("course_name"),
    lesson_completed: integer("lesson_completed").notNull().$default(() => 0), // 0-5
});

// "words" table
export const Words = pgTable("words", {
    id: serial("id").primaryKey(),
    level_hebrew: levelHebrew("level_hebrew"),
    level_english: levelEnglish("level_english"),
    courseId: integer("course_id").references(() => CourseNames.id), // foreign key
    course_name: text("course_name"),
    GermanWord: text("german_word"),
    HebrewWord: text("hebrew_word"),
    knowlage: text("knowlage"),
});

// "lessons" table
// no primary key --> add later if needed!
export const Lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),                 // 1-150

    level_hebrew: levelHebrew("level_hebrew"),     // ״מתחילים״
    level_english: levelEnglish("level_english"),  // A1

    course_name: text("course_name"),              // Greeting
    course_id: integer("course_id"),               // 1-25

    lesson_id: integer("lesson_id"),               // 1-6

    // sentences
    sentence_one_german: text("sentence_one_german"),            // "hallo wie gehts",
    sentence_one_hebrew: text("sentence_one_hebrew"),

    sentence_two_german: text("sentence_two_german"),            // "guten morgen"
    sentence_two_hebrew: text("sentence_two_hebrew"),

    // missing sentences
    missing_sentence_one_german: text("missing_sentence_one_german"), // hallo! _____ morgen
    missing_sentence_one_hebrew: text("missing_sentence_one_hebrew"),
    missing_word_one_german: text("missing_word_one_german"),                // guten
    missing_word_one_hebrew: text("missing_word_one_hebrew"),

    missing_sentence_two_german: text("missing_sentence_two_german"),
    missing_sentence_two_hebrew: text("missing_sentence_two_hebrew"),
    missing_word_two_german: text("missing_word_two_german"),
    missing_word_two_hebrew: text("missing_word_two_hebrew"),

    // words
    word_one_german: text("word_one_german"),
    word_one_hebrew: text("word_one_hebrew"),
    word_two_german: text("word_two_german"),
    word_two_hebrew: text("word_two_hebrew"),
    word_three_german: text("word_three_german"),
    word_three_hebrew: text("word_three_hebrew"),
    word_four_german: text("word_four_german"),
    word_four_hebrew: text("word_four_hebrew"),
    word_five_german: text("word_five_german"),
    word_five_hebrew: text("word_five_hebrew"),
    word_six_german: text("word_six_german"),
    word_six_hebrew: text("word_six_hebrew"),
    word_seven_german: text("word_seven_german"),
    word_seven_hebrew: text("word_seven_hebrew"),
    word_eight_german: text("word_eight_german"),
    word_eight_hebrew: text("word_eight_hebrew"),
    word_nine_german: text("word_nine_german"),
    word_nine_hebrew: text("word_nine_hebrew"),
    word_ten_german: text("word_ten_german"),
    word_ten_hebrew: text("word_ten_hebrew"),
    word_eleven_german: text("word_eleven_german"),
    word_eleven_hebrew: text("word_eleven_hebrew"),
    word_twelve_german: text("word_twelve_german"),
    word_twelve_hebrew: text("word_twelve_hebrew"),
});