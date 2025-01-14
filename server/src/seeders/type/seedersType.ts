export interface Course {
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    hebrewLevel: "מבוא" | "בסיסי" | "בינוני" | "מתקדם" | "מתקדם מאוד" | "שפת אם" | "המילים שהוספתי";
    courseNameEnglish: string;
    courseNameGerman: string;
    courseNameHebrew: string;
    lessonCompleted: number;
  }

export interface Lesson {
    hebrewLevel: "מבוא" | "בסיסי" | "בינוני" | "מתקדם" | "מתקדם מאוד" | "שפת אם" | "המילים שהוספתי";
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    courseNameEnglish: string;
    lessonOneToSix: number;
    sentenceOneGerman: string, 
    sentenceOneHebrew: string, 
    sentenceTwoGerman: string, 
    sentenceTwoHebrew: string, 
    missingSentenceOneGerman: string, 
    missingSentenceOneHebrew: string, 
    missingWordOneGerman: string, 
    missingWordOneHebrew: string, 
    missingSentenceTwoGerman: string,  
    missingSentenceTwoHebrew: string, 
    missingWordTwoGerman: string, 
    missingWordTwoHebrew: string, 
    wordOneGerman: string, 
    wordOneHebrew: string, 
    wordTwoGerman: string, 
    wordTwoHebrew: string, 
    wordThreeGerman: string, 
    wordThreeHebrew: string, 
    wordFourGerman: string, 
    wordFourHebrew: string, 
    wordFiveGerman: string, 
    wordFiveHebrew: string, 
    wordSixGerman: string, 
    wordSixHebrew: string, 
    wordSevenGerman: string, 
    wordSevenHebrew: string, 
    wordEightGerman: string, 
    wordEightHebrew: string, 
    wordNineGerman: string, 
    wordNineHebrew: string, 
    wordTenGerman: string, 
    wordTenHebrew: string, 
    wordElevenGerman: string, 
    wordElevenHebrew: string, 
    wordTwelveGerman: string, 
    wordTwelveHebrew: string, 
    finished: false,
  }

  export interface Word {
    hebrewLevel: "מבוא" | "בסיסי" | "בינוני" | "מתקדם" | "מתקדם מאוד" | "שפת אם" | "המילים שהוספתי";
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    courseNameEnglish: string;
    germanWord: string;
    hebrewWord: string;
    knowledge: string;
  }