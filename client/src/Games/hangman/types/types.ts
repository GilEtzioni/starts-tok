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

export interface lettersArray {
    letter: string;
    isInWord: boolean;
    isUserSelected: boolean;
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