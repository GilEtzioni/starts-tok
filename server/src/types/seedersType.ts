export interface Course {
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    hebrewLevel: "מבוא" | "בסיסי" | "בינוני" | "מתקדם" | "מתקדם מאוד" | "שפת אם" | "המילים שהוספתי";
    courseNameEnglish: string;
    courseNameGerman: string;
    courseNameHebrew: string;
    lessonCompleted: number;
  }
export enum HebrewLevel {
  A1 = "מבוא",
  A2 = "בסיסי",
  B1 = "בינוני",
  B2 = "מתקדם",
  C1 =  "מתקדם מאוד",
  C2 = "שפת אם",
  UserWords = "המילים שהוספתי",
}
export enum EnglishLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
  UserWords = "userWords"
}
  export interface Word {
    hebrew: string,
    english: string,
    german: string,
    italian: string,
    spanish: string,
    french: string,
    courseNameEnglish: string;
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

  export interface ForthLessonCards {
    foreignWord: string;
    isRightWord: boolean;
    isSelected: IsSelected
  }

  export enum IsSelected {
    True = "true",
    False = "false",
    Clicked = "clicked",
    NotSelected = "notSelected",
  }
