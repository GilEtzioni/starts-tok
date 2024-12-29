import { LessonType } from '../types/lessonType';

export function getGermanSentence(lessons: LessonType, order: number): string {

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

export function getGermanWord(lessons: LessonType, order: number): string {

    let sentence: string = "";
    // first lesson - only first sentence
    if (order=== 3) {
      sentence = lessons.missingWordOneGerman;
    }
    // second lexsson - only last sentence
    if (order === 6) {
      sentence = lessons.missingWordTwoGerman
    }

    return sentence;
}

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



// first and second part of the sentence
export const splitTheSentence = (sentence: string, word: string) => {
    const cleanedSentence = sentence.replace(/[.,!?;:()'"-]/g, "");
    const cleanedWord = word.replace(/[.,!?;:()'"-]/g, "");
    const arrayWords = cleanedSentence.split(" ");
    let foundWord = -1;
  
    for (let i = 0; i < arrayWords.length; i++) {
      if (arrayWords[i].toLowerCase() === cleanedWord.toLowerCase()) {
        foundWord = i;
        break;
      }
    }
  
    if (foundWord === -1) {
      return {
        firstArrayPart: cleanedSentence,
        secondArrayPart: "",
      };
    }
  
    const firstArrayPart = arrayWords.slice(0, foundWord).join(" ");
    const secondArrayPart = arrayWords.slice(foundWord + 1).join(" ");
  
    return {
      firstArrayPart,
      secondArrayPart,
    };
};
  