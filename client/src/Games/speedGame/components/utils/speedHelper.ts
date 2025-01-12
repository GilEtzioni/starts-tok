import { WordsType } from "../../../../types/types";
import { speedGameType } from "../../types/speedGameTypes";
import { Language, SelectedCard } from "../../types/speedGameTypes";

export const shuffleAllWords = (wordsArray: WordsType[] | undefined) => {
  if (wordsArray === undefined) return;
    for (let i = wordsArray.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [wordsArray[i], wordsArray[random]] = [wordsArray[random], wordsArray[i]]; // swap item with random
    }
    return wordsArray;
}

export const shuffleCards = (wordsArray: speedGameType[]) => {

  if (wordsArray === undefined) return;

  for (let i = wordsArray.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [wordsArray[i], wordsArray[random]] = [wordsArray[random], wordsArray[i]]; // swap item with random
  }
  return wordsArray;
}

// array for starting the game
export const createGameArray = (wordsArray: WordsType[] | undefined) => {
  if (wordsArray === undefined) return;

  const newGermanArray: speedGameType[] = [];
  const newHebrewArray: speedGameType[] = [];

  for (let i = 0; i < 10; i++) {
    if (wordsArray.length > 0) {
      const word = wordsArray.splice(0, 1)[0]; // remove the first item and get it
      newGermanArray.push({
        id: word.id || 0,
        language: "GermanWord",
        word: word?.GermanWord,
        isSelected: SelectedCard.notSelected,
      });

      newHebrewArray.push({
        id: word.id || 0,
        language: "HebrewWord",
        word: word?.HebrewWord,
        isSelected: SelectedCard.notSelected,
      });
    }
  }

  const shuffledGermanArray = shuffleCards(newGermanArray);
  const shuffledHebrewArray = shuffleCards(newHebrewArray);

  return {shuffledGermanArray, shuffledHebrewArray};
};

const getRandomIndex = (hebrewArray: speedGameType[], germanArray: speedGameType[] , isCardSelected: string) => {
  const hebrewIndexArray: number[] = [];
  const germanIndexArray: number[] = [];

  hebrewArray.forEach((item, index) => {
    if (item.isSelected === isCardSelected) hebrewIndexArray.push(index);
  });

  germanArray.forEach((item, index) => {
    if (item.isSelected === isCardSelected) germanIndexArray.push(index);
  });

  const hebrewIndex = hebrewIndexArray[Math.floor(Math.random() * hebrewIndexArray.length)];
  const germanIndex = germanIndexArray[Math.floor(Math.random() * germanIndexArray.length)];

  return {hebrewIndex, germanIndex}
}

export const replaceOldCard = (newWord: WordsType[], hebrewArray: speedGameType[], germanArray: speedGameType[]) => {

  const {hebrewIndex, germanIndex} = getRandomIndex(hebrewArray, germanArray, "success");

  const newHebrewArray = [...hebrewArray];
  const newGermanArray = [...germanArray];

  newHebrewArray[hebrewIndex] = {
    id: newWord[0]?.id || 0,
    language: Language.HebrewWord,
    word: newWord[0]?.HebrewWord || "",
    isSelected: SelectedCard.notSelected,
  };

  newGermanArray[germanIndex] = {
    id: newWord[0]?.id || 0,
    language: Language.GermanWord,
    word: newWord[0]?.GermanWord || "",
    isSelected: SelectedCard.notSelected,
  };

  return { newHebrewArray, newGermanArray };
};


export const deleteOldCards = (newWord: WordsType[], hebrewArray: speedGameType[], germanArray: speedGameType[]) => {
  const {hebrewIndex, germanIndex} = getRandomIndex(hebrewArray, germanArray, "notSelected");

  const newHebrewArray = [...hebrewArray];
  const newGermanArray = [...germanArray];

  newHebrewArray[hebrewIndex] = {
    id: newWord[0]?.id || 0,
    language: Language.HebrewWord,
    word: newWord[0]?.HebrewWord || "",
    isSelected: SelectedCard.failure,
  };

  newGermanArray[germanIndex] = {
    id: newWord[0]?.id || 0,
    language: Language.GermanWord,
    word: newWord[0]?.GermanWord || "",
    isSelected: SelectedCard.failure,
  };

  return { newHebrewArray, newGermanArray };
}