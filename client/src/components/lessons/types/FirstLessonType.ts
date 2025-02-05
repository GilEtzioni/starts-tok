export enum IsSelected {
    True = "true",
    False = "false",
    Clicked = "clicked",
    NotSelected = "notSelected",
  }

  export interface FirstLessonCardType {
    coupleId: number, 
    word: string, 
    isSelected: IsSelected,
  }

  export type FirstLesson = {
    hebrew: FirstLessonCardType[],
    foreign: FirstLessonCardType[]
  }