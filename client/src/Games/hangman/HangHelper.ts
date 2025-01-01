import { WordsType } from "../../Dictionarys/types/wordType";
import { hangmanType } from './types/hangmanType';
import { useDispatch } from 'react-redux';
import { setSelectedWord } from "./dataHangman/HangmanSlice";

export const getRandomWord = (wordsArray: WordsType[]): WordsType => {
    const num_of_words: number = wordsArray.length;
    const selected_word_index = Math.floor(Math.random() * num_of_words);
    return wordsArray[selected_word_index];
};

export const createLettersArray = (word: WordsType): Array<hangmanType> => {
    const result: Array<hangmanType> = [];

    const letters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ך', 'ל',
        'מ', 'ם', 'נ', 'ן', 'ס', 'ע', 'פ', 'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת'];

    const wordLetters = new Set(word.HebrewWord.split(''));

    letters.forEach((letter) => {
        result.push({
            letter,
            inGame: wordLetters.has(letter),
            selected: false,
        });
    });
    return result;
};

export const createGameArray = (word: WordsType): Array<hangmanType> => {
    const array: Array<hangmanType> = [];

    word.HebrewWord.split('').forEach((letter) => {
        array.push({
            letter,
            inGame: letter !== " ",
            selected: false,
        });
    });
    return array;
};

// set true if the letter is selected
export const handleArray = (wordsArray: Array<hangmanType>, letter: string) => {
    const array = [...wordsArray];
    // check if the letter is in the array
    for (const word of wordsArray) {
        if (word.letter === letter && word.selected === false) {
            word.selected = true;
        }
    }
    return array;
};

// check if the answer is true
export const isAnswerTrue = (wordsArray: Array<hangmanType>, letter: string): boolean | null => {
    for (const word of wordsArray) {
        if (word.letter === letter) {
            if (word.inGame) {
                return word.selected ? null : true;
            }
            return word.selected ? null : false;
        }
    }
    return null;
};

export const getSelectedWord = (words: WordsType[]): any => {
    const selectedWord = getRandomWord(words); 
    if (!selectedWord) return; // exit if still loading
    const selectedWordArray = [selectedWord];
    return selectedWordArray;
}