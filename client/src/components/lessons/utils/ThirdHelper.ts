import { MissingWordType } from "../../../api/common/types";

export const getForeignMissingSentence = (lessons: MissingWordType, order: number): string => {

    let sentence: string = "";
    if (order === 3) {
        sentence = lessons.missingSentenceOneForeign;
    }
    if (order=== 6) {
        sentence = lessons.missingSentenceTwoForeign
    }

    return sentence;
}

export const getHebewMissingSentence = (lessons: MissingWordType, order: number): string => {

  let sentence: string = "";
  if (order === 3) {
      sentence = lessons.missingSentenceOneHebrew;
  }
  if (order=== 6) {
      sentence = lessons.missingSentenceTwoHebrew;
  }

  return sentence;
}

/*  ------------------------------------------------------ */

export const getForeignWord = (lessonsData: MissingWordType, order: number): string => {

    let sentence: string = "";
    if (order=== 3) {
      sentence = lessonsData?.missingWordOneForeign;
    }
    if (order === 6) {
      sentence = lessonsData?.missingWordTwoForeign;
    }

    return sentence;
}

export const getHebrewWord = (lessonsData: MissingWordType[], order: number): string => {
  let sentence: string = "";
  if (order=== 3) {
    sentence = lessonsData[0].missingWordOneHebrew;
  }
  if (order === 6) {
    sentence = lessonsData[0].missingWordTwoForeign;
  }

  return sentence;
}

/*  ------------------------------------------------------ */

export const getHebrewSentence = (lessonsData: MissingWordType, order: number): string => {
    let sentence: string = "";
    if (order === 3) {
        sentence = lessonsData?.missingSentenceOneHebrew ?? "";
    }
    if (order === 6) {
        sentence = lessonsData?.missingSentenceTwoHebrew ?? "";
    }
    return sentence;
}

export const getForeignSentence = (lessonsData: MissingWordType, order: number): string => {

  let sentence: string = "";
  // first lesson - only first sentence
  if (order === 3) {
      sentence = lessonsData.missingSentenceOneForeign ?? "";
  }
  // second lesson - only last sentence
  else if (order === 6) {
      sentence = lessonsData.missingSentenceTwoForeign ?? "";
  }
  else {
    sentence = "";
  } 
  return sentence;
}

/*  ------------------------------------------------------ */

// first and second part of the sentence
export const splitTheSentence = (foreignSentence: string, foreignWord: string) => {
  let firstPart = "";
  let secondPart = "";
  const wordLength = foreignWord.length;

  for (let i = 0; i <= foreignSentence.length - wordLength; i++) {
      const currentWord = foreignSentence.substring(i, i + wordLength).toLocaleLowerCase();
      if (currentWord === foreignWord.toLocaleLowerCase()) {
          firstPart = foreignSentence.substring(0, i).trim();
          secondPart = foreignSentence.substring(i + wordLength).trim();
          break; // exit when the word is found
      }
  }

  return {
      firstPart,
      secondPart,
  };
};
