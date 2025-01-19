import { MissingWordType } from "../../../api/common/types";

export function getGermanMissingSentence(lessons: MissingWordType, order: number): string {

    let sentence: string = "";
    if (order === 3) {
        sentence = lessons.missingSentenceOneForeign;
    }
    if (order=== 6) {
        sentence = lessons.missingSentenceTwoForeign
    }

    return sentence;
}

export function getHebewMissingSentence(lessons: MissingWordType, order: number): string {

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

export function getGermanWord(lessonsData: MissingWordType, order: number): string {

    let sentence: string = "";
    if (order=== 3) {
      sentence = lessonsData.missingWordOneForeign;
    }
    if (order === 6) {
      sentence = lessonsData.missingWordTwoForeign;
    }

    return sentence;
}

export function getHebrewWord(lessonsData: MissingWordType, order: number): string {

  let sentence: string = "";
  // first lesson - only first sentence
  if (order=== 3) {
    sentence = lessonsData.missingWordOneHebrew;
  }
  // second lexsson - only last sentence
  if (order === 6) {
    sentence = lessonsData.missingWordTwoForeign;
  }

  return sentence;
}

/*  ------------------------------------------------------ */

export function getHebrewSentence(lessonsData: MissingWordType, order: number): string {
    let sentence: string = "";
    // first lesson - only first sentence
    if (order === 3) {
        sentence = lessonsData.missingSentenceOneHebrew ?? "";
    }
    // second lesson - only last sentence
    if (order === 6) {
        sentence = lessonsData.missingSentenceTwoHebrew ?? "";
    }
    return sentence;
}

export function getGermanSentence(lessonsData: MissingWordType, order: number): string {

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
  // Optionally handle cases where order is neither 3 nor 6
    console.warn(`Unsupported order value: ${order}`);
    sentence = ""; // or any default value you want to return for unsupported orders
  } 
  return sentence;
}

/*  ------------------------------------------------------ */

// first and second part of the sentence
export const splitTheSentence = (germanSentence: string, germanWord: string) => {
  let firstPart = "";
  let secondPart = "";
  const wordLength = germanWord.length;

  for (let i = 0; i <= germanSentence.length - wordLength; i++) {
      const currentWord = germanSentence.substring(i, i + wordLength).toLocaleLowerCase();
      if (currentWord === germanWord.toLocaleLowerCase()) {
          firstPart = germanSentence.substring(0, i).trim();
          secondPart = germanSentence.substring(i + wordLength).trim();
          break; // exit when the word is found
      }
  }

  return {
      firstPart,
      secondPart,
  };
};
