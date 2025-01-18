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

    finished: boolean,
    createdAt: Date,
  }
  
  export type MissingWordType = {
    userId: string,
    courseId: string,
    lessonId: string,
    hebrewLevel: HebrewLevel,
    englishLevel: EnglishLevel,
    courseNameEnglish: string,
    lessonOneToSix: number,

    missingSentenceOneHebrew: string,
    missingWordOneHebrew: string,
    missingSentenceTwoHebrew: string,
    missingWordTwoHebrew: string,

    missingSentenceOneGerman: string,
    missingWordOneGerman: string,
    missingSentenceTwoGerman: string,
    missingWordTwoGerman: string,

    missingSentenceOneItalian: string,
    missingWordOneItalian: string,
    missingSentenceTwoItalian: string,
    missingWordTwoItalian: string,

    missingSentenceOneSpanish: string,
    missingWordOneSpanish: string,
    missingSentenceTwoSpanish: string,
    missingWordTwoSpanish: string,

    missingSentenceOneFrench: string,
    missingWordOneFrench: string,
    missingSentenceFrench: string,
    missingWordTwoFrench: string,

    createdAt: Date,
    finished: boolean,
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
};
  
  export interface WordsType {
    courseId: string,
    userId: string,
    wordId: string,
    courseNameEnglish: string,
    createdAt: Date,
    englishLevel: EnglishLevel,
    germanWord: string,
    hebrewLevel: HebrewLevel,
    knowledge: DictionaryKnowledgeType,
    hebrewWord: string, 
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