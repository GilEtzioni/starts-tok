CREATE TYPE "public"."gameName" AS ENUM('speedGame', 'hangmanGame', 'wordleGame');--> statement-breakpoint
CREATE TYPE "public"."levelEnglish" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'userWords');--> statement-breakpoint
CREATE TYPE "public"."levelHebrew" AS ENUM('מבוא', 'בסיסי', 'בינוני', 'מתקדם', 'מתקדם מאוד', 'שפת אם', 'המילים שהוספתי');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"userId" text NOT NULL,
	"courseId" text PRIMARY KEY NOT NULL,
	"englishLevel" "levelEnglish",
	"hebrewLevel" "levelHebrew",
	"courseNameEnglish" text,
	"courseNameGerman" text,
	"courseNameHebrew" text,
	"lessonCompleted" integer NOT NULL,
	"courseOrder" serial NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"userId" text NOT NULL,
	"gameId" text NOT NULL,
	"gameName" "gameName",
	"gameScore" integer,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lessons" (
	"userId" text NOT NULL,
	"hebrewLevel" "levelHebrew",
	"englishLevel" "levelEnglish",
	"courseNameEnglish" text,
	"courseId" text NOT NULL,
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
	"wordTwelveHebrew" text,
	"finished" boolean,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "words" (
	"userId" text NOT NULL,
	"wordId" text PRIMARY KEY NOT NULL,
	"hebrewLevel" "levelHebrew",
	"englishLevel" "levelEnglish",
	"courseId" text NOT NULL,
	"courseNameEnglish" text,
	"germanWord" text,
	"hebrewWord" text,
	"knowledge" text,
	"courseOrder" serial NOT NULL,
	"createdAt" timestamp DEFAULT now()
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
