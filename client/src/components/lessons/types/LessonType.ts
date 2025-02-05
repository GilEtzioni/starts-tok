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

export enum LessonName {
  Loading = "loading",
  MatchPairs = "matchPairs",
  sentece = "sentece",
  MissingWriting = "missingWriting",
  MissingCards = "missingCards"
}