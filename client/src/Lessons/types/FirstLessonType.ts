export enum IsSelected {
    true = "true",
    false = "false",
    clicked = "clicked",
    notSelected = "notSelected",
  }

  export interface FirstLessonType {
    coupleId: number, 
    word: string, 
    isSelected: IsSelected,
  }