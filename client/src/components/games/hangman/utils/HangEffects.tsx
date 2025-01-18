import { useEffect } from "react";
import { WordsType } from "../../../../types/types";
import { HangmanType } from "../types/hangmanType";
import { createLettersArray, createGameArray, getRandomWord } from "./HangHelper";
import { setSelectedWord } from "../slices/HangmanSlice";

export interface useStartGameProps {
  words: WordsType[] | undefined;
  setRandomWord: (array: WordsType[]) => void;
  setLettersArray: (array: HangmanType[]) => void;
  setGameArray: (array: HangmanType[]) => void;
  successCounter: number;
  wrongCounter: number
  dispatch: any;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useStartGame = ({ words, setRandomWord, setLettersArray, setGameArray, successCounter, wrongCounter, dispatch }: useStartGameProps) => {
  useEffect(() => {
    if (words !== undefined && words.length > 0 && wrongCounter === 0) {

        // reset game arrays
        setLettersArray([]);
        setGameArray([]);

        const selectedWord = getRandomWord(words);
        dispatch(setSelectedWord([selectedWord]));

        setRandomWord([selectedWord]);

        const lettersRandomArray = createLettersArray(selectedWord);
        setLettersArray(lettersRandomArray);

        const gameRandomArray = createGameArray(selectedWord);
        setGameArray(gameRandomArray);
    }
}, [successCounter, words, wrongCounter]);
};