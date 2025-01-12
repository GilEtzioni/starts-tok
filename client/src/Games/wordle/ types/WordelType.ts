export enum LetterColor {
  Gray = 'gray',
  Green = 'green',
  Yellow = 'yellow',
  NotSelected = 'notSelected',
}

export type wordleType = {
  letterColor: LetterColor;
  letter: string;
  isInGame: boolean;
} | null;

export enum CurrentMode {
  Success = "success",
  NotEnoughLetters = "notEnoughLetters",
  NotInDictionary = "notInDictionary",
  Failure = "failure",
  Running = "running",
}

export type GridLetters = {
  letter: string; 
  letterColor: LetterColor
}