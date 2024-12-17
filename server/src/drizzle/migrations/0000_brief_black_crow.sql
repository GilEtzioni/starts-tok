CREATE TYPE "public"."level_english" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2');--> statement-breakpoint
CREATE TYPE "public"."level_hebrew" AS ENUM('מבוא', 'בסיסי', 'בינוני', 'מתקדם', 'מתקדם מאוד', 'שפת אם');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"level_english" "level_english",
	"level_hebrew" "level_hebrew",
	"course_name" text,
	"lesson_completed" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"level_hebrew" "level_hebrew",
	"level_english" "level_english",
	"course_name" text,
	"course_id" integer,
	"lesson_id" integer,
	"sentence_one_german" text,
	"sentence_one_hebrew" text,
	"sentence_two_german" text,
	"sentence_two_hebrew" text,
	"missing_sentence_one_german" text,
	"missing_sentence_one_hebrew" text,
	"missing_word_one_german" text,
	"missing_word_one_hebrew" text,
	"missing_sentence_two_german" text,
	"missing_sentence_two_hebrew" text,
	"missing_word_two_german" text,
	"missing_word_two_hebrew" text,
	"word_one_german" text,
	"word_one_hebrew" text,
	"word_two_german" text,
	"word_two_hebrew" text,
	"word_three_german" text,
	"word_three_hebrew" text,
	"word_four_german" text,
	"word_four_hebrew" text,
	"word_five_german" text,
	"word_five_hebrew" text,
	"word_six_german" text,
	"word_six_hebrew" text,
	"word_seven_german" text,
	"word_seven_hebrew" text,
	"word_eight_german" text,
	"word_eight_hebrew" text,
	"word_nine_german" text,
	"word_nine_hebrew" text,
	"word_ten_german" text,
	"word_ten_hebrew" text,
	"word_eleven_german" text,
	"word_eleven_hebrew" text,
	"word_twelve_german" text,
	"word_twelve_hebrew" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "words" (
	"id" serial PRIMARY KEY NOT NULL,
	"level_hebrew" "level_hebrew",
	"level_english" "level_english",
	"course_id" integer,
	"course_name" text,
	"german_word" text,
	"hebrew_word" text,
	"knowlage" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "words" ADD CONSTRAINT "words_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
