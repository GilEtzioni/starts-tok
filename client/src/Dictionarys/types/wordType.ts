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

// type
export interface WordsType {
  id?: number; 
  level_hebrew: LevelHebrew; 
  level_english: LevelEnglish; 
  courseId: number;
  course_name_english: string; 
  GermanWord: string;
  HebrewWord: string; 
  knowlage: string;
}
