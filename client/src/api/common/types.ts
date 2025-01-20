import { KnowledgeType } from "../../components/dictionary/types/DictionaryType";

export enum EnglishLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export enum HebrewLevel {
  מבוא = "מבוא",
  בסיסי = "בסיסי",
  בינוני = "בינוני",
  מתקדם = "מתקדם",
  מתקדםמאוד = "מתקדם מאוד",
  שפתאם = "שפת אם",
}
  export type SenteceType = {
    sentenceOneForeign: string, 
    sentenceTwoForeign: string, 
    sentenceOneHebrew: string, 
    sentenceTwoHebrew: string,
  }
  
  export type MissingWordType = {
    missingSentenceOneHebrew: string,
    missingWordOneHebrew: string,
    missingSentenceTwoHebrew: string,
    missingWordTwoHebrew: string,
    missingSentenceOneForeign: string,
    missingWordOneForeign: string,
    missingSentenceTwoForeign: string,
    missingWordTwoForeign: string,
  }

  export type CourseType = {
    userId: string,
    courseId: string;
    englishLevel: EnglishLevel;
    hebrewLevel: HebrewLevel;
    courseNameEnglish: string;
    courseNameGerman: string;
    courseNameHebrew: string;
    lessonCompleted: number;
    courseOrder: number,
    language: string,
};
  
  export interface WordsType {
    courseId: string,
    userId: string,
    wordId: string,
    courseNameEnglish: string,
    englishLevel: EnglishLevel,
    hebrewLevel: HebrewLevel,
    hebrewWord: string,
    foreignWord: string,
    knowledge: DictionaryKnowledgeType,
    courseOrder: number,
    wordOrder: number
  }

export interface GamesType {
    userId: string,
    gameId?: string,
    gameName: string,
    gameScore: number,
  }

export enum DictionaryKnowledgeType {
    Vy = "V",
    Ex = "X",
    QuestionMark = "?",
}

export interface UserType {
  userId: string,
  userName: string,
  points: number,
  pointsDate: Date,
}

export type weekPointsType = {
  date: string,
  points: number,
  day: string
}

export enum CourseLangauge {
  German = "german",
  Italian = "italian",
  Spanish = "spanish",
  French = "french",
}