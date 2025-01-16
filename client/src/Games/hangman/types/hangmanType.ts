export enum SelectedLetter {
  NotSelected = "notSelected",
  Success = "success",
  Failure = "failure",
}
  
  export type HangmanType = {
    letter: string, 
    inGame: boolean, 
    selected: SelectedLetter
  }