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

  export type LessonType = {
    userId: string,
    courseId: string,
    lessonId: string,
    hebrewLevel: HebrewLevel,
    englishLevel: EnglishLevel,
    courseNameEnglish: string,
    finished: boolean,
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
    userId: string,
    id: string,
    hebrewLevel: HebrewLevel,
    englishLevel: EnglishLevel,
    courseId: string,
    courseNameEnglish: string,
    germanWord: string,
    hebrewWord: string, 
    knowlage: string,
  }

  export interface GamesType {
    userId: string,
    gameId?: string,
    gameName: string,
    gameScore: number,
  }