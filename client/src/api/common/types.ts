import { IsSelected } from "../../components/lessons/types/FirstLessonType";
import { CardType, TranslatedArray } from "../../components/lessons/types/SecondLessonType";

export enum EnglishLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
  UserWords = "userWords"
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
    foreignSentence: string, 
    hebrewSentence: string, 
    words: CardType[],
    translatedArray: TranslatedArray[];
  }
  
  export type MissingWordType = {
    hebrewSentence: string,
    hebrewWord: string,
    foreignSentence: string,
    foreignWord: string,
    translatedArray: TranslatedArray[];
    firstPartForeign: string,
    secondPartForeign: string,
    letters: string[] | null
  }

  export type MissingWordCard = {
    hebrewSentence: string,
    hebrewWord: string,
    foreignSentence: string,
    foreignWord: string,
    translatedArray: TranslatedArray[];
    firstPartForeign: string,
    secondPartForeign: string,
    gameWords: ForthLessonCards[],
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
  English = "english"
}

export enum LanguageType {
  Hebrew = "hebrew",
  Foreign = "foreign"
}

export type UserTableType = {
  key: number,
  userId: string,
  userName: string,
  totalPoints: number,
  language: CourseLangauge 
}

export interface ForthLessonCards {
  foreignWord: string;
  isRightWord: boolean;
  isSelected: IsSelected;
}