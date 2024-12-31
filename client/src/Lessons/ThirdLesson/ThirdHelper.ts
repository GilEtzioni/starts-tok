import { LessonType } from '../types/lessonType';

export function getGermanMissingSentence(lessons: LessonType, order: number): string {

    let sentence: string = "";
    // first lesson - only first sentence
    if (order === 3) {
        sentence = lessons.missingSentenceOneGerman;
    }
    // second lesson - only last sentence
    if (order=== 6) {
        sentence = lessons.missingSentenceTwoGerman
    }

    return sentence;
}

export function getHebewMissingSentence(lessons: LessonType, order: number): string {

  let sentence: string = "";
  // first lesson - only first sentence
  if (order === 3) {
      sentence = lessons.missingSentenceOneHebrew;
  }
  // second lesson - only last sentence
  if (order=== 6) {
      sentence = lessons.missingSentenceTwoHebrew;
  }

  return sentence;
}

/*  ------------------------------------------------------ */

export function getGermanWord(lessons: LessonType, order: number): string {

    let sentence: string = "";
    // first lesson - only first sentence
    if (order=== 3) {
      sentence = lessons.missingWordOneGerman;
    }
    // second lexsson - only last sentence
    if (order === 6) {
      sentence = lessons.missingWordTwoGerman;
    }

    return sentence;
}

export function getHebrewWord(lessons: LessonType, order: number): string {

  let sentence: string = "";
  // first lesson - only first sentence
  if (order=== 3) {
    sentence = lessons.missingWordOneHebrew;
  }
  // second lexsson - only last sentence
  if (order === 6) {
    sentence = lessons.missingWordTwoGerman;
  }

  return sentence;
}

/*  ------------------------------------------------------ */

export function getHebrewSentence(lessons: LessonType, order: number): string {

    let sentence: string = "";
    // first lesson - only first sentence
    if (order === 3) {
        sentence = lessons.missingSentenceOneHebrew;
    }
    // second lesson - only last sentence
    if (order === 6) {
        sentence = lessons.missingSentenceTwoHebrew;
    }
    return sentence;
}

export function getGermanSentence(lessons: LessonType, order: number): string {

  let sentence: string = "";
  // first lesson - only first sentence
  if (order === 3) {
      sentence = lessons.missingSentenceOneGerman;
  }
  // second lesson - only last sentence
  if (order === 6) {
      sentence = lessons.missingSentenceTwoGerman;
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
