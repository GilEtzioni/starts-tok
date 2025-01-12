import { useEffect } from "react";
import { WordsType } from "../../../types/types";
import { HangmanType } from "../types/hangmanType";
import { createLettersArray, createGameArray } from "./HangHelper";

export interface useStartGameProps {
  words: WordsType[] | undefined;
  setRandomWord: (array: WordsType[]) => void;
  setLettersArray: (array: HangmanType[]) => void;
  setGameArray: (array: HangmanType[]) => void;
  gameWord: WordsType[]
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useStartGame = ({gameWord, setRandomWord, words, setLettersArray, setGameArray }: useStartGameProps) => {
    useEffect(() => {
      if (gameWord.length > 0 && words !== undefined) {
        const randomIndex = Math.floor(Math.random() * gameWord.length);
        const selectedWord = gameWord[randomIndex];
        setRandomWord([selectedWord]);
          
        // create abc-letters array
        const lettersRandomArray = createLettersArray(selectedWord);
        setLettersArray(lettersRandomArray);

        // create game-letters array
        const gameRandomArray = createGameArray(selectedWord);
        setGameArray(gameRandomArray);
      }
  }, [gameWord]);
};