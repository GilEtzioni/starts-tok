import { WordsType } from '../../hangman/types/types';
import { wordleType, letterColor } from '../ types/WordelType';

export const shuffleAllWords = (wordsArray: WordsType[]) => {
  for (let i = wordsArray?.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [wordsArray[i], wordsArray[random]] = [wordsArray[random], wordsArray[i]]; // swap item with random
  }
  return wordsArray;
};

export const randomWordsArray = (words: WordsType[]): WordsType[] => {
  const gridSizeArray = [4, 5, 6, 7];
  const gridSizeIndex = Math.floor(Math.random() * gridSizeArray.length)
  const gridSize = gridSizeArray[gridSizeIndex];

  const suffeledArray = shuffleAllWords([...words]);
  const result: WordsType[] = suffeledArray.filter(
    (item) => item.GermanWord?.length === gridSize
  );

  return result;
};

export const getRandomWord = (words: WordsType[]): wordleType[] => {
  const index = Math.floor(Math.random() * words?.length);
  const sentence = words[index]?.GermanWord;

  const result: wordleType[] = [];

  for (let i = 0; i < sentence?.length; i++) {
    result.push({
      letterColor: letterColor.notSelected,
      letter: sentence.charAt(i).toLowerCase(),
      isInGame: false,
    });
  }

  return result;
};

export const createGameGrid = (correctAnswer: wordleType[]) => {
  const rowLength = correctAnswer?.length;
  const columnLength = 5;

  const result: Array<Array<any>> = [];

  for (let i = 0; i < rowLength; i++) {
    const row: Array<any> = Array(columnLength).fill(null);
    result.push(row);
  }

  return result;
};

export const createLettersGrid = (): Array<{letter: string; letterColor: letterColor }> => {
  const result: Array<{ letter: string; letterColor: letterColor }> = [];
  const lettersArray = [
    'a',
    'ä',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'ö',
    'p',
    'q',
    'r',
    's',
    'ß',
    't',
    'u',
    'ü',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  lettersArray?.map((item) => {
    result.push({
      letter: item,
      letterColor: letterColor.notSelected,
    });
  });

  return result;
};

export const getLetterColor = ( letter: string, columnIndex: number, correctAnswerArray: wordleType[]): letterColor => {
  // correct position + correct letter
  if (correctAnswerArray[columnIndex]?.letter === letter) {
    return letterColor.green;
  }

  // correct letter + wrong possition
  const isLetterInArray: boolean = correctAnswerArray.some(
    (item) => item?.letter === letter
  );
  if (isLetterInArray) {
    return letterColor.yellow;
  }

  // wrong letter + wrong possition
  return letterColor.gray;
};
