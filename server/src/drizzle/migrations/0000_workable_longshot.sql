CREATE TYPE "public"."gameName" AS ENUM('speedGame', 'hangmanGame', 'wordleGame');--> statement-breakpoint
CREATE TYPE "public"."languages" AS ENUM('german', 'italian', 'spanish', 'french');--> statement-breakpoint
CREATE TYPE "public"."levelEnglish" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'userWords');--> statement-breakpoint
CREATE TYPE "public"."levelHebrew" AS ENUM('מבוא', 'בסיסי', 'בינוני', 'מתקדם', 'מתקדם מאוד', 'שפת אם', 'המילים שהוספתי');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"userId" text NOT NULL,
	"courseId" text,
	"englishLevel" "levelEnglish",
	"hebrewLevel" "levelHebrew",
	"courseNameEnglish" text,
	"courseNameGerman" text,
	"courseNameHebrew" text,
	"lessonCompleted" integer NOT NULL,
	"courseOrder" integer,
	"createdAt" timestamp DEFAULT now(),
	"language" "languages",
	CONSTRAINT "courses_courseId_unique" UNIQUE("courseId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "current_language" (
	"userId" text NOT NULL,
	"language" "languages" NOT NULL
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
CREATE TABLE IF NOT EXISTS "missingWords" (
	"userId" text NOT NULL,
	"hebrewLevel" "levelHebrew",
	"englishLevel" "levelEnglish",
	"courseNameEnglish" text,
	"courseId" text NOT NULL,
	"lessonId" integer,
	"missingSentenceOneHebrew" text,
	"missingWordOneHebrew" text,
	"missingSentenceTwoHebrew" text,
	"missingWordTwoHebrew" text,
	"missingSentenceOneGerman" text,
	"missingWordOneGerman" text,
	"missingSentenceTwoGerman" text,
	"missingWordTwoGerman" text,
	"missingSentenceOneItalian" text,
	"missingWordOneItalian" text,
	"missingSentenceTwoItalian" text,
	"missingWordTwoItalian" text,
	"missingSentenceOneSpanish" text,
	"missingWordOneSpanish" text,
	"missingSentenceTwoSpanish" text,
	"missingWordTwoSpanish" text,
	"missingSentenceOneFrench" text,
	"missingWordOneFrench" text,
	"missingSentenceFrench" text,
	"missingWordTwoFrench" text,
	"finished" boolean,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sentences" (
	"userId" text NOT NULL,
	"hebrewLevel" "levelHebrew",
	"englishLevel" "levelEnglish",
	"courseNameEnglish" text,
	"courseId" text NOT NULL,
	"lessonId" integer,
	"sentenceOneHebrew" text,
	"sentenceTwoHebrew" text,
	"sentenceOneGerman" text,
	"sentenceTwoGerman" text,
	"sentenceOneItalian" text,
	"sentenceTwoItalian" text,
	"sentenceOneSpanish" text,
	"sentenceTwoSpanish" text,
	"sentenceOneFranch" text,
	"sentenceTwoFranch" text,
	"finished" boolean,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"userId" text NOT NULL,
	"userName" text NOT NULL,
	"points" integer,
	"pointsDate" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "words" (
	"userId" text NOT NULL,
	"wordId" text PRIMARY KEY NOT NULL,
	"hebrewLevel" "levelHebrew",
	"englishLevel" "levelEnglish",
	"courseId" text NOT NULL,
	"courseNameEnglish" text,
	"hebrewWord" text,
	"germanWord" text,
	"italianWord" text,
	"spanishWord" text,
	"frenchWord" text,
	"knowledge" text,
	"wordOrder" serial NOT NULL,
	"courseOrder" integer,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "missingWords" ADD CONSTRAINT "missingWords_courseId_courses_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("courseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sentences" ADD CONSTRAINT "sentences_courseId_courses_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("courseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "words" ADD CONSTRAINT "words_courseId_courses_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("courseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
