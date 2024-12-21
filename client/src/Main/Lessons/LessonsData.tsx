import { LessonType } from "../../Dictionarys/types/wordType";

export const fetchCourseData = async (levelName: string, lessonName: string, completedLessons: number) => {
  try {
    const response = await fetch(`http://localhost:3000/main/course/${levelName}/${lessonName}/${completedLessons}`);
    const data = await response.json();

        // Check for errors
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

    /* ----------------------------------------------------------------------------- */

    // hebrew sentences
    let uniqueId = 1;
    const hebrewSentenceArray = data.map((course: LessonType) => [
      [course.sentenceOneHebrew, uniqueId.toString(), "notSelected"],
      [course.sentenceTwoHebrew, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += hebrewSentenceArray.length;

    // german sentences
    uniqueId = 1;
    const germanSentenceArray = data.map((course: LessonType) => [
      [course.sentenceOneGerman, uniqueId.toString(), "notSelected"],
      [course.sentenceTwoGerman, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += germanSentenceArray.length;

  /* ----------------------------------------------------------------------------- */

    // german missing sentences
    uniqueId = 1;
    const germanMissingSentenceArray = data.map((course: LessonType) => [
      [course.missingSentenceOneGerman, uniqueId.toString(), "notSelected"],
      [course.missingSentenceTwoGerman, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += germanMissingSentenceArray.length;

    // hebrew missing sentences
    uniqueId = 1;
    const hebrewMissingSentenceArray = data.map((course: LessonType) => [
      [course.missingSentenceOneHebrew, uniqueId.toString(), "notSelected"],
      [course.missingSentenceTwoHebrew, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += hebrewMissingSentenceArray.length;

    // german missing words
    uniqueId = 1;
    const germanMissingWordsArray = data.map((course: LessonType) => [
      [course.missingWordOneGerman, uniqueId.toString(), "notSelected"],
      [course.missingWordTwoGerman, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += germanMissingWordsArray.length;

    // hebrew missing words
    uniqueId = 1;
    const hebrewMissingWordsArray = data.map((course: LessonType) => [
      [course.missingWordOneHebrew, uniqueId.toString(), "notSelected"],
      [course.missingWordTwoHebrew, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += hebrewMissingWordsArray.length;

  /* ----------------------------------------------------------------------------- */

    // hebrew words
    uniqueId = 1;
    const hebrewWordsArray = data.map((course: LessonType) => [
      [course.wordOneHebrew, uniqueId.toString(), "notSelected"],
      [course.wordTwoHebrew, (uniqueId + 1).toString(), "notSelected"],
      [course.wordThreeHebrew, (uniqueId + 2).toString(), "notSelected"],
      [course.wordFourHebrew, (uniqueId + 3).toString(), "notSelected"],
      [course.wordFiveHebrew, (uniqueId + 4).toString(), "notSelected"],
      [course.wordSixHebrew, (uniqueId + 5).toString(), "notSelected"],
      [course.wordSevenHebrew, (uniqueId + 6).toString(), "notSelected"],
      [course.wordEightHebrew, (uniqueId + 7).toString(), "notSelected"],
      [course.wordNineHebrew, (uniqueId + 8).toString(), "notSelected"],
      [course.wordTenHebrew, (uniqueId + 9).toString(), "notSelected"],
      [course.wordElevenHebrew, (uniqueId + 10).toString(), "notSelected"],
      [course.wordTwelveHebrew, (uniqueId + 11).toString(), "notSelected"],
    ]).flat();
    uniqueId += hebrewWordsArray.length;

    // german words
    uniqueId = 1;
    const germanWordsArray = data.map((course: LessonType) => [
      [course.wordOneGerman, uniqueId.toString(), "notSelected"],
      [course.wordTwoGerman, (uniqueId + 1).toString(), "notSelected"],
      [course.wordThreeGerman, (uniqueId + 2).toString(), "notSelected"],
      [course.wordFourGerman, (uniqueId + 3).toString(), "notSelected"],
      [course.wordFiveGerman, (uniqueId + 4).toString(), "notSelected"],
      [course.wordSixGerman, (uniqueId + 5).toString(), "notSelected"],
      [course.wordSevenGerman, (uniqueId + 6).toString(), "notSelected"],
      [course.wordEightGerman, (uniqueId + 7).toString(), "notSelected"],
      [course.wordNineGerman, (uniqueId + 8).toString(), "notSelected"],
      [course.wordTenGerman, (uniqueId + 9).toString(), "notSelected"],
      [course.wordElevenGerman, (uniqueId + 10).toString(), "notSelected"],
      [course.wordTwelveGerman, (uniqueId + 11).toString(), "notSelected"],
    ]).flat();
      uniqueId += hebrewWordsArray.length;

    /* ----------------------------------------------------------------------------- */
   
    return { 
      // sentences
      initialHebrewSentences: hebrewSentenceArray, 
      initialGermanSentences: germanSentenceArray,

      // missing sentences
      initialMissingHebrewSentences: hebrewMissingSentenceArray, 
      initialMissingGermanSentences: germanMissingSentenceArray,
      initialMissingHebrewWords: germanMissingWordsArray, 
      initialMissingGermanWords: hebrewMissingWordsArray,

      // words
      initialHebrewWords: hebrewWordsArray,
      initialGermanWords: germanWordsArray,
    };

  } catch (error) {
    console.error("Error fetching data:", error);
    // empty arrays
    return { 
      initialHebrewSentences: [], 
      initialGermanSentences: [],
      initialMissingHebrewSentences: [],
      initialMissingGermanSentences: [],
      initialMissingHebrewWords: [], 
      initialMissingGermanWords: [], 
      initialHebrewWords: [],
      initialGermanWords: [] 
    };
  }
};