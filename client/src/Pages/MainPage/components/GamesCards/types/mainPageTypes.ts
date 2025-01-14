// export enum gameNameEnum {
//     speedGame = "speedGame", 
//     hangmanGame = "hangmanGame", 
//     rowGame = "rowGame",
// }

export enum GameNameEnum {
    Hangman = "hangmanGame",
    Wordle = "wordleGame",
    SpeedGame = "speedGame",
}

export type HangmanScoreType = {
    gameId: number,
    gameName: GameNameEnum,
    gameScore: number,
}