export enum gameNameEnum {
    speedGame = "speedGame", 
    hangmanGame = "hangmanGame", 
    rowGame = "rowGame",
}

export type hangmanScoreType = {
    gameId: number,
    gameName: gameNameEnum,
    gameScore: number,
}