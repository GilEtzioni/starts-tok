CREATE TYPE "public"."gameName" AS ENUM('speedGame', 'hangmanGame', 'wordleGame');--> statement-breakpoint
CREATE TYPE "public"."languages" AS ENUM('german', 'italian', 'spanish', 'french', 'english', 'hebrew');--> statement-breakpoint
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
	"language" "languages",
	CONSTRAINT "courses_courseId_unique" UNIQUE("courseId")
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
CREATE TABLE IF NOT EXISTS "language" (
	"userId" text NOT NULL,
	"language" "languages" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "missingWords" (
	"courseId" text NOT NULL,
	"userId" text NOT NULL,
	"courseNameEnglish" text,
	"missingSentenceOrder" integer NOT NULL,
	"language" "languages" NOT NULL,
	"missingSentence" text NOT NULL,
	"missingWord" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sentences" (
	"courseId" text NOT NULL,
	"userId" text NOT NULL,
	"courseNameEnglish" text,
	"senteceOrder" integer NOT NULL,
	"language" "languages" NOT NULL,
	"sentence" text NOT NULL
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
	"wordId" text,
	"hebrewLevel" "levelHebrew",
	"englishLevel" "levelEnglish",
	"courseId" text NOT NULL,
	"courseNameEnglish" text,
	"hebrewWord" text,
	"foreignWord" text,
	"language" "languages" NOT NULL,
	"knowledge" text,
	"wordOrder" serial NOT NULL,
	"courseOrder" integer
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
