export enum IsSelected {
    True = "true",
    False = "false",
    Clicked = "clicked",
    NotSelected = "notSelected",
  }

  export interface FirstLessonCard {
    coupleId: number, 
    word: string, 
    isSelected: IsSelected,
  }

  export type FirstLesson = {
    hebrew: FirstLessonCard[],
    foreign: FirstLessonCard[]
  }