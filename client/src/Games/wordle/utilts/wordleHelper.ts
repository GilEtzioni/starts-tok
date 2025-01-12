import { WordsType } from "../../../types/types"
import { wordleType, LetterColor, GridLetters } from '../ types/WordelType';

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
    (item) => item.germanWord?.length === gridSize
  );

  return result;
};

export const getRandomWord = (words: WordsType[]): wordleType[] => {
  const index = Math.floor(Math.random() * words?.length);
  const sentence = words[index]?.germanWord;

  const result: wordleType[] = [];

  for (let i = 0; i < sentence?.length; i++) {
    result.push({
      letterColor: LetterColor.NotSelected,
      letter: sentence.charAt(i).toLowerCase(),
      isInGame: false,
    });
  }

  return result;
};

export const createGameGrid = (correctAnswer: wordleType[]) => {
  const rowLength = correctAnswer?.length;
  const columnLength = 5;

  const result: (null | string)[][] = [];

  for (let i = 0; i < rowLength; i++) {
    const row: (null | string)[] = Array(columnLength).fill(null);
    result.push(row);
  }

  return result;
};

export const createLettersGrid = (): GridLetters[] => {
  const result: GridLetters[] = [];
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
      letterColor: LetterColor.NotSelected,
    });
  });

  return result;
};

export const getLetterColor = ( letter: string, columnIndex: number, correctAnswerArray: wordleType[]): LetterColor => {
  // correct position + correct letter
  if (correctAnswerArray[columnIndex]?.letter === letter) {
    return LetterColor.Green;
  }

  // correct letter + wrong possition
  const isLetterInArray: boolean = correctAnswerArray.some(
    (item) => item?.letter === letter
  );
  if (isLetterInArray) {
    return LetterColor.Yellow;
  }

  // wrong letter + wrong possition
  return LetterColor.Gray;
};
