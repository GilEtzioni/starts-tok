import { useEffect } from "react";
import { WordsType } from "../../Dictionarys/types/wordType";
import { hangmanType } from "./types/hangmanType";
import { getRandomWord, createLettersArray, createGameArray } from "./HangHelper";

export interface useStartGameProps {
  words: Array<WordsType>;
  setRandomWord: (array: Array<WordsType>) => void;
  setLettersArray: (array: Array<hangmanType>) => void;
  setGameArray: (array: Array<hangmanType>) => void;
  gameWord:any;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useStartGame = ({gameWord, setRandomWord, words, setLettersArray, setGameArray }: useStartGameProps) => {
    useEffect(() => {
      if (gameWord.length > 0) {
        const randomIndex = Math.floor(Math.random() * gameWord.length);
        const selectedWord = gameWord[randomIndex];
        setRandomWord([selectedWord]);

        console.log("selectedWord: ", selectedWord);
          
        // create abc-letters array
        const lettersRandomArray = createLettersArray(selectedWord);
        setLettersArray(lettersRandomArray);

        // create game-letters array
        const gameRandomArray = createGameArray(selectedWord);
        setGameArray(gameRandomArray);
      }
  }, [gameWord]);
};