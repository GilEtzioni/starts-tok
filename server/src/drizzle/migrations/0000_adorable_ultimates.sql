CREATE TYPE "public"."levelEnglish" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2');--> statement-breakpoint
CREATE TYPE "public"."levelHebrew" AS ENUM('מבוא', 'בסיסי', 'בינוני', 'מתקדם', 'מתקדם מאוד', 'שפת אם');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"courseId" serial PRIMARY KEY NOT NULL,
	"levelEnglish" "levelEnglish",
	"levelHebrew" "levelHebrew",
	"courseNameEnglish" text,
	"courseNameGerman" text,
	"courseNameHebrew" text,
	"lessonCompleted" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"levelHebrew" "levelHebrew",
	"levelEnglish" "levelEnglish",
	"courseNameEnglish" text,
	"courseId" integer,
	"lessonId" integer,
	"sentenceOneGerman" text,
	"sentenceOneHebrew" text,
	"sentenceTwoGerman" text,
	"sentenceTwoHebrew" text,
	"missingSentenceOneGerman" text,
	"missingSentenceOneHebrew" text,
	"missingWordOneGerman" text,
	"missingWordOneHebrew" text,
	"missingSentenceTwoGerman" text,
	"missingSentenceTwoHebrew" text,
	"missingWordTwoGerman" text,
	"missingWordTwoHebrew" text,
	"wordOneGerman" text,
	"wordOneHebrew" text,
	"wordTwoGerman" text,
	"wordTwoHebrew" text,
	"wordThreeGerman" text,
	"wordThreeHebrew" text,
	"wordFourGerman" text,
	"wordFourHebrew" text,
	"wordFiveGerman" text,
	"wordFiveHebrew" text,
	"wordSixGerman" text,
	"wordSixHebrew" text,
	"wordSevenGerman" text,
	"wordSevenHebrew" text,
	"wordEightGerman" text,
	"wordEightHebrew" text,
	"wordNineGerman" text,
	"wordNineHebrew" text,
	"wordTenGerman" text,
	"wordTenHebrew" text,
	"wordElevenGerman" text,
	"wordElevenHebrew" text,
	"wordTwelveGerman" text,
	"wordTwelveHebrew" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "words" (
	"id" serial PRIMARY KEY NOT NULL,
	"levelHebrew" "levelHebrew",
	"levelEnglish" "levelEnglish",
	"courseId" integer,
	"courseNameEnglish" text,
	"GermanWord" text,
	"HebrewWord" text,
	"knowlage" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_courseId_courses_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("courseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "words" ADD CONSTRAINT "words_courseId_courses_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("courseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
