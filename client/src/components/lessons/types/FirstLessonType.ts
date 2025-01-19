export enum IsSelected {
    True = "true",
    False = "false",
    Clicked = "clicked",
    NotSelected = "notSelected",
  }

  export interface FirstLessonType {
    coupleId: number, 
    word: string, 
    isSelected: IsSelected,
  }

  export type FirstCardType = {
    hebrewWord: string,
    foreignWord: string,
    coupleId: number
  }