export enum LetterColor {
  Gray = 'gray',
  Green = 'green',
  Yellow = 'yellow',
  NotSelected = 'notSelected',
}

export enum LetterSeleceted {
  NotSelected = 'notSelected',
  Clicked = "clicked",
  Selected = "selected",
}

export enum CurrentMode {
  Success = "success",
  NotEnoughLetters = "notEnoughLetters",
  NotInDictionary = "notInDictionary",
  Failure = "failure",
  Running = "running",
}

export type wordleType = {
  letter: string;
  color: LetterColor;
  selected: LetterSeleceted;
} | null;