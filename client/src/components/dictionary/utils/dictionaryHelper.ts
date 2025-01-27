import { KnowledgeType } from "../types/DictionaryType";
import { WordsType } from "../../../api/common/types";
import { TranslatedWordsType } from "../types/DictionaryType";
import { DictionaryKnowledgeType } from "../../../api/common/types";

export const handleClickedRow = (id: string, wordsArray: WordsType[], translatedWords: TranslatedWordsType[]): TranslatedWordsType[] => {
  const result: TranslatedWordsType[] = [...translatedWords];

  // find the word
  console.log("1")
  const filtered = wordsArray.find((item: WordsType) => item.wordId === id);

  // check if the word is already in the translatedWords array
  if (filtered) {
    const existsIndex = result.findIndex((item) => item.id === filtered.wordId);

    if (existsIndex === -1) {
      // new word - add it to the array
      result.push({ id: filtered.wordId , word: filtered.hebrewWord });
    } else {
      // old word - remove it from the array
      result.splice(existsIndex, 1);
    }
  }

  return result;
}

export const knowledgeDataArray = (knowledgeFilter: KnowledgeType): DictionaryKnowledgeType[] => {
  const knowledgeArray: DictionaryKnowledgeType[] = [];
    
    if (knowledgeFilter.isEx === true) {
      knowledgeArray.push(DictionaryKnowledgeType.Ex);
    }
    if (knowledgeFilter.isVy === true) {
      knowledgeArray.push(DictionaryKnowledgeType.Vy);
    }
    if (knowledgeFilter.isQueistion === true) {
      knowledgeArray.push(DictionaryKnowledgeType.QuestionMark);
    }
    return knowledgeArray;
  }

  export const isExTrue = (icon: DictionaryKnowledgeType): boolean => {
    return icon === DictionaryKnowledgeType.Ex;
  };

  export const isVyTrue = (icon: string): boolean => {
    return icon === DictionaryKnowledgeType.Vy;
  }

  export const isQuesttionTrue = (icon: string): boolean => {
    return icon === DictionaryKnowledgeType.QuestionMark;
  }

  export const sortWordsById =(words: WordsType[]): WordsType[] => {
    return [...words].sort((a, b) => {
      const idA = a.wordOrder ?? Number.MAX_SAFE_INTEGER;
      const idB = b.wordOrder ?? Number.MAX_SAFE_INTEGER;
      return idA - idB;
    });
  }