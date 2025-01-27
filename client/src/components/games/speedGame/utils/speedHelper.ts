import { WordsType } from "../../../../api/common/types";
import { speedGameType } from "../types/speedGameTypes";
import { Language, SelectedCard } from "../types/speedGameTypes";

export const shuffleAllWords = (wordsArray: WordsType[] | undefined) => {
  if (wordsArray && wordsArray.length > 0) {
    const shuffled = [...wordsArray]; // Create a new array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]]; // Swap items
    }
    return shuffled;
  }
  return wordsArray;
};

export const shuffleCards = (wordsArray: speedGameType[]) => {
  if (!wordsArray || wordsArray.length === 0) return;

  for (let i = wordsArray.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [wordsArray[i], wordsArray[random]] = [wordsArray[random], wordsArray[i]];
  }

  wordsArray.forEach((item, index) => {
    item.index = index;
  });

  return wordsArray;
};

export const createGameArray = (wordsArray: WordsType[] | undefined) => {

  if (!wordsArray || wordsArray.length === 0) {
    return {
      shuffledGermanArray: [],
      shuffledHebrewArray: [],
    };
  }

  const newGermanArray: speedGameType[] = [];
  const newHebrewArray: speedGameType[] = [];

  for (let i = 0; i < 10; i++) {
    if (wordsArray.length > 0) {
      const word = wordsArray.splice(0, 1)[0]; // remove the first item and get it
      newGermanArray.push({
        id: word.wordId || "",
        language: Language.GermanWord,
        word: word?.foreignWord,
        isSelected: SelectedCard.NotSelected,
        index: 0,
      });

      newHebrewArray.push({
        id: word.wordId || "",
        language: Language.HebrewWord,
        word: word?.hebrewWord,
        isSelected: SelectedCard.NotSelected,
        index: 0,
      });
    }
  }

  const shuffledGermanArray = shuffleCards(newGermanArray);
  const shuffledHebrewArray = shuffleCards(newHebrewArray);

  return {shuffledGermanArray, shuffledHebrewArray};
};

export const getRandomIndex = (
  hebrewArray: speedGameType[],
  germanArray: speedGameType[],
  isCardSelected: SelectedCard
) => {
  const hebrewIndexArray = hebrewArray.filter((item) => item.isSelected === isCardSelected);
  const germanIndexArray = germanArray.filter((item) => item.isSelected === isCardSelected);

  if (hebrewIndexArray.length === 0 || germanIndexArray.length === 0) {
    return {
      hebrewIndex: 0,
      germanIndex: 0,
    };
  }

  const randomHebrewItem =
    hebrewIndexArray[Math.floor(Math.random() * hebrewIndexArray.length)];

  console.log("3")
  let correspondingGermanItem = germanIndexArray.find(
    (item) => item.id === randomHebrewItem.id
  );

  if (!correspondingGermanItem) {
    const fallbackHebrewIndexArray = hebrewArray.filter(
      (item) => item.isSelected === SelectedCard.NotSelected
    );
    const fallbackGermanIndexArray = germanArray.filter(
      (item) => item.isSelected === SelectedCard.NotSelected
    );

    if (fallbackHebrewIndexArray.length > 0) {
      const fallbackHebrewItem = fallbackHebrewIndexArray[0];
      console.log("4")
      correspondingGermanItem = fallbackGermanIndexArray.find(
        (item) => item.id === fallbackHebrewItem.id
      );

      return {
        hebrewIndex: fallbackHebrewItem.index,
        germanIndex: correspondingGermanItem?.index || 0,
      };
    }

    return {
      hebrewIndex: 0,
      germanIndex: 0,
    };
  }

  return {
    hebrewIndex: randomHebrewItem.index,
    germanIndex: correspondingGermanItem.index,
  };
};

export const replaceOldCard = 
  (newWord: WordsType, hebrewArray: speedGameType[], germanArray: speedGameType[], hebrewIndex: number, germanIndex: number ) => {

  const newHebrewArray = [...hebrewArray];
  const newGermanArray = [...germanArray];

  newHebrewArray[hebrewIndex] = {
    id: newHebrewArray[hebrewIndex].id,
    index: newHebrewArray[hebrewIndex].index,
    language: Language.HebrewWord,
    word: newWord.hebrewWord || "",
    isSelected: SelectedCard.NotSelected,
  };

  newGermanArray[germanIndex] = {
    id: newGermanArray[germanIndex].id,
    index: newGermanArray[germanIndex].index,
    language: Language.GermanWord,
    word: newWord.foreignWord || "",
    isSelected: SelectedCard.NotSelected,
  };

  return { newHebrewArray, newGermanArray };
};

export const deleteOldCards = 
(newWord: WordsType, hebrewArray: speedGameType[], germanArray: speedGameType[], hebrewIndex: number, germanIndex: number ) => {

  const newHebrewArray = [...hebrewArray];
  const newGermanArray = [...germanArray];

  newHebrewArray[hebrewIndex] = {
    id: newWord?.wordId || "",
    index: hebrewIndex,
    language: Language.HebrewWord,
    word: newWord.hebrewWord || "",
    isSelected: SelectedCard.Failure,
  };

  newGermanArray[germanIndex] = {
    id: newWord?.wordId || "",
    index: germanIndex,
    language: Language.GermanWord,
    word: newWord.foreignWord || "",
    isSelected: SelectedCard.Failure,
  };

  return { newHebrewArray, newGermanArray };
}