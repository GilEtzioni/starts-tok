import { WordsType, KnowlageType } from "../types/wordType";

export function handleClickedRow(id: number, wordsArray: WordsType[], translatedWords: Array<[number, string]>): Array<[number, string]> {
  const result: Array<[number, string]> = [...translatedWords];

  // find the word
  const filtered = wordsArray.find((item: WordsType) => item.id === id);

  // check if the word is already in the translatedWords array
  if (filtered) {
    const existsIndex = result.findIndex(([wordId]) => wordId === filtered.id);

    if (existsIndex === -1) {
      // new word - add it to the array
      result.push([filtered.id ?? 0, filtered.HebrewWord]);
    } else {
      // old word - remove it from the array
      result.splice(existsIndex, 1);
    }
  }

  return result;
}


  // make the redux boolean to strings array
  export const knowlageDataArray = (knowlageFilter: KnowlageType): string[] => {
    const knowlageArray: string[] = [];
    
    if (knowlageFilter.isEx === true) {
      knowlageArray.push('X');
    }
    if (knowlageFilter.isVy === true) {
      knowlageArray.push('V');
    }
    if (knowlageFilter.isQueistion === true) {
      knowlageArray.push('?');
    }
    return knowlageArray;
  }

  export function isExTrue (icon: string): boolean {
    return icon === "X";
  };

  export function isVyTrue (icon: string): boolean {
    return icon === "V";
  }

  export function isQuesttionTrue (icon: string): boolean {
    return icon === "?";
  }

  export function sortWordsById(words: WordsType[]): WordsType[] {
    return [...words].sort((a, b) => {
      const idA = a.id ?? Number.MAX_SAFE_INTEGER;
      const idB = b.id ?? Number.MAX_SAFE_INTEGER;
      return idA - idB;
    });
  }