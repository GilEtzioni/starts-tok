import { WordsType } from "../../../../api/common/types";
import { HangmanType, SelectedLetter } from '../types/hangmanType';

export const getRandomWord = (wordsArray: WordsType[]): WordsType => {
    const num_of_words: number = wordsArray.length;
    const selected_word_index = Math.floor(Math.random() * num_of_words);
    return wordsArray[selected_word_index];
};

// const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 
//     'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß'];

export const createLettersArray = (word: WordsType, keyboard: string[]): HangmanType[] => {
    const result: HangmanType[] = [];
    const wordLetters = word.foreignWord.toLowerCase().split('');

    keyboard.forEach((letter) => {
        result.push({
            letter: letter.toLowerCase(),
            inGame: wordLetters.includes(letter.toLowerCase()), 
            selected: SelectedLetter.NotSelected, 
        });
    });

    return result;
};

export const createGameArray = (word: WordsType, keyboard: string[]): HangmanType[] => {
    const gameArray: HangmanType[] = [];
  
    word.foreignWord.toLowerCase().split('').forEach((letter) => {
      if (keyboard.includes(letter)) { 
        gameArray.push({
          letter: letter.toLowerCase(),
          inGame: letter !== " ",
          selected: SelectedLetter.NotSelected,
        });
      }
    });
    return gameArray;
  };

export const handleArray = (gameArray: HangmanType[], lettersArray: HangmanType[], letter: string) => {
    const updatedLettersArray = [...lettersArray];
    const updatedGameArray = [...gameArray];
    let flag: boolean = false;

    for (const word of updatedGameArray) {
        if (word.letter.toLowerCase() === letter.toLowerCase() && word.selected === SelectedLetter.NotSelected) {
            word.selected = SelectedLetter.Success;
            flag = true;
        }
    }

    for (const word of updatedLettersArray) {
        if (word.letter.toLowerCase() === letter.toLowerCase()) {
            if (flag === true) {
                word.selected = SelectedLetter.Success;
            }
            else {
                word.selected = SelectedLetter.Failure;
            }
        }
    }

    return {updatedLettersArray, updatedGameArray};
};

// check if the answer is true
export const isAnswerTrue = (lettersArray: HangmanType[], letter: string): SelectedLetter | null => {
    const updatedLettersArray = lettersArray.map((word) => ({ ...word }));

    for (const word of updatedLettersArray) {
      if (word.letter.toLowerCase() === letter.toLowerCase() && word.selected === SelectedLetter.NotSelected) {
        if (word.inGame) {
          word.selected = SelectedLetter.Success;
          return SelectedLetter.Success;
        }
        word.selected = SelectedLetter.Failure;
        return SelectedLetter.Failure;
      }
    }
    return null;
  };

export const getSelectedWord = (words: WordsType[] | undefined):  WordsType[] => {
    if (words !== undefined && words) {
        const selectedWord = getRandomWord(words); 
        const selectedWordArray = [selectedWord];
        return selectedWordArray;
    }
    return [];
}