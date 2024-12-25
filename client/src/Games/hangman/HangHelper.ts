import { WordsType } from "../../Dictionarys/types/wordType";

export const getRandomWord = (wordsArray: WordsType[]): WordsType => {
    const num_of_words: number = wordsArray.length;
    const selected_word_index = Math.floor(Math.random() * num_of_words);
    return wordsArray[selected_word_index];
};

// make the word 2d array (each leeter in one [])
export const createArray = (word: WordsType): Array<[string, boolean]> => {
    const array: Array<[string, boolean]> = [];

    word.HebrewWord.split('').forEach((letter) => {
        if (letter === " ")
            array.push([letter, true]);
        array.push([letter, false]);
    });

    return array;
};

// set true if the letter is selected
export const manageGame =(wordsArray: Array<[word: string, isSelected: boolean]>, letter: string)  => {
    const array = [...wordsArray];
    // check if the letter is in the array
    array.forEach((item) => {
        if (item[0] === letter) {
            item[1] = true;
        }
    })
    return array;
}

export const isAnwerTrue = (wordsArray: Array<[word: string, isSelected: boolean]>, letter: string) => {
    const res = false;
    wordsArray.forEach((item) => {
        if(item[0] === letter)
            return true
    });
    return false;
}
