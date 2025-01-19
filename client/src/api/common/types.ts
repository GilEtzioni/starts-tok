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
    userId: string,
    courseId: string,
    lessonId: string,
    hebrewLevel: HebrewLevel,
    englishLevel: EnglishLevel,
    courseNameEnglish: string,
    lessonOneToSix: number,

    sentenceOneHebrew: string,
    sentenceTwoHebrew: string,

    sentenceOneGerman: string,  
    sentenceTwoGerman: string, 

    sentenceOneItalian: string,  
    sentenceTwoItalian: string,  

    sentenceOneSpanish: string,  
    sentenceTwoSpanish: string,  

    sentenceOneFranch: string,  
    sentenceTwoFranch: string, 

    lessonOrder: number,
    finished: boolean,
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
    germanWord: string,
    hebrewLevel: HebrewLevel,
    hebrewWord: string,
    foreignWord: string,
    knowledge: DictionaryKnowledgeType,
    wordOrder: number,
    courseOrder: number,
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