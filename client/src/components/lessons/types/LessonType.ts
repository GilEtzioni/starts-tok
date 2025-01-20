export enum LessonStatus {
  Running = "running",
  Success = "success",
  Failure = "failure",
}

export type LessonSentenceType = {
  foreignWord: string,
  hebrewWord: string,
  wordId: string
}