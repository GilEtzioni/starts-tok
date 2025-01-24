export interface Course {
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    hebrewLevel: "מבוא" | "בסיסי" | "בינוני" | "מתקדם" | "מתקדם מאוד" | "שפת אם" | "המילים שהוספתי";
    courseNameEnglish: string;
    courseNameGerman: string;
    courseNameHebrew: string;
    lessonCompleted: number;
  }

export interface SentenceType {
    hebrewLevel: "מבוא" | "בסיסי" | "בינוני" | "מתקדם" | "מתקדם מאוד" | "שפת אם" | "המילים שהוספתי",
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2',
    courseNameEnglish: string,
    lessonOrder: number,

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
  }

  export interface MissingWordsType {
    hebrewLevel: "מבוא" | "בסיסי" | "בינוני" | "מתקדם" | "מתקדם מאוד" | "שפת אם" | "המילים שהוספתי";
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    courseNameEnglish: string;
    lessonOrder: number;

    missingSentenceOneHebrew: string, 
    missingSentenceTwoHebrew: string, 
    missingWordOneHebrew: string, 
    missingWordTwoHebrew: string, 

    missingSentenceOneGerman: string, 
    missingWordOneGerman: string, 
    missingSentenceTwoGerman: string,  
    missingWordTwoGerman: string, 

    // Italian
    missingSentenceOneItalian: string, 
    missingWordOneItalian: string, 
    missingSentenceTwoItalian: string,  
    missingWordTwoItalian: string, 

    // Spanish
    missingSentenceOneSpanish: string, 
    missingWordOneSpanish: string, 
    missingSentenceTwoSpanish: string,  
    missingWordTwoSpanish: string, 

    // French
    missingSentenceOneFrench: string, 
    missingWordOneFrench: string, 
    missingSentenceTwoFrench: string,  
    missingWordTwoFrench: string, 
    finished: false,
  }

  export interface Word {
    hebrewLevel: "מבוא" | "בסיסי" | "בינוני" | "מתקדם" | "מתקדם מאוד" | "שפת אם" | "המילים שהוספתי";
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    courseNameEnglish: string;
    germanWord: string;
    hebrewWord: string;
    italianWord: string;
    spanishWord: string;
    frenchWord: string;
    courseOrder: number;
  }

  export enum CourseLangauge {
    German = "german",
    Italian = "italian",
    Spanish = "spanish",
    French = "french",
    English = "english",
    Hebrew = "hebrew"
  }

  export type englishLevelType = {
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'userWords' | string;
  }