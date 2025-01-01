import { useEffect } from "react";
import { WordsType } from "../../Dictionarys/types/wordType";
import { hangmanType } from "./types/hangmanType";
import { getRandomWord, createLettersArray, createGameArray } from "./HangHelper";

export interface useStartGameProps {
  words: WordsType[];
  setRandomWord: (array: Array<WordsType>) => void;
  setLettersArray: (array: Array<hangmanType>) => void;
  setgameArray: (array: Array<hangmanType>) => void;
  gameWord: any;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useStartGame = ({gameWord, words, setLettersArray, setgameArray }: useStartGameProps) => {
    useEffect(() => {
      if (gameWord.length > 0) {
        const randomIndex = Math.floor(Math.random() * gameWord.length);
        const selectedWord = gameWord[randomIndex];
          
          // create abc-letters array
          const lettersRandomArray = createLettersArray(selectedWord);
          setLettersArray(lettersRandomArray);

          // create game-letters array
          const gameRandomArray = createGameArray(selectedWord);
          setgameArray(gameRandomArray);
      }
  }, [gameWord]);
};