export enum LevelEnglish {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export enum LevelHebrew {
  מבוא = "מבוא",
  בסיסי = "בסיסי",
  בינוני = "בינוני",
  מתקדם = "מתקדם",
  מתקדםמאוד = "מתקדם מאוד",
  שפתאם = "שפת אם",
}


export type LessonType = {
  id: number,
  levelHebrew: string,
  levelEnglish: string,
  courseNameEnglish: string,
  courseId: number,
  lessonId: number,
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

export interface WordsType {
  id?: number; 
  levelHebrew: LevelHebrew; 
  levelEnglish: LevelEnglish; 
  courseId: number;
  courseNameEnglish: string; 
  GermanWord: string;
  HebrewWord: string; 
  knowlage: string;
}