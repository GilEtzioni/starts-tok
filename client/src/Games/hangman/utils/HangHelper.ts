import { WordsType } from "../../../types/types";
import { HangmanType } from '../types/hangmanType';

export const getRandomWord = (wordsArray: WordsType[]): WordsType => {
    const num_of_words: number = wordsArray.length;
    const selected_word_index = Math.floor(Math.random() * num_of_words);
    return wordsArray[selected_word_index];
};

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß'];

export const createLettersArray = (word: WordsType): HangmanType[] => {
    const result: HangmanType[] = [];

    const wordLetters = new Set(word.germanWord.toLowerCase().split(''));

    letters.forEach((letter) => {
        result.push({
            letter: letter.toLowerCase(),
            inGame: wordLetters.has(letter),
            selected: false,
        });
    });
    return result;
};

export const createGameArray = (word: WordsType): HangmanType[] => {
    const array: HangmanType[] = [];
  
    word.germanWord.toLowerCase().split('').forEach((letter) => {
      if (letters.includes(letter)) { 
        array.push({
          letter: letter.toLowerCase(),
          inGame: letter !== " ",
          selected: false,
        });
      }
    });
    return array;
  };

// set true if the letter is selected
export const handleArray = (wordsArray: HangmanType[], letter: string) => {
    const array = [...wordsArray];
    for (const word of wordsArray) {
        if (word.letter.toLowerCase() === letter.toLowerCase() && word.selected === false) {
            word.selected = true;
        }
    }
    return array;
};

// check if the answer is true
export const isAnswerTrue = (wordsArray: HangmanType[], letter: string): boolean | null => {
    for (const word of wordsArray) {
        if (word.letter.toLowerCase() === letter.toLowerCase()) {
            if (word.inGame) {
                return word.selected ? null : true;
            }
            return word.selected ? null : false;
        }
    }
    return null;
};

export const getSelectedWord = (words: WordsType[] | undefined) => {
    if (words !== undefined) {
        const selectedWord = getRandomWord(words); 
        if (!selectedWord) return; // exit if still loading
        const selectedWordArray = [selectedWord];
        return selectedWordArray;
    }
}