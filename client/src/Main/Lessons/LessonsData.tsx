export const fetchCourseData = async (levelName: string, lessonName: string, completedLessons: number) => {
  try {
    // const completedLessonsAsString = completedLessons.toString();
    console.log("Type of completedLessons:", typeof completedLessons, completedLessons);
    const response = await fetch(`http://localhost:3000/main/course/${levelName}/${lessonName}/${completedLessons}`);
    const data = await response.json();

        // Check for errors
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    

    /* ----------------------------------------------------------------------------- */

    // hebrew sentences
    let uniqueId = 1;
    const hebrewSentenceArray = data.map((course: any) => [
      [course.sentence_one_hebrew, uniqueId.toString(), "notSelected"],
      [course.sentence_two_hebrew, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += hebrewSentenceArray.length;

    // german sentences
    uniqueId = 1;
    const germanSentenceArray = data.map((course: any) => [
      [course.sentence_one_german, uniqueId.toString(), "notSelected"],
      [course.sentence_two_german, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += germanSentenceArray.length;

  /* ----------------------------------------------------------------------------- */

    // german missing sentences
    uniqueId = 1;
    const germanMissingSentenceArray = data.map((course: any) => [
      [course.missing_sentence_one_german, uniqueId.toString(), "notSelected"],
      [course.missing_sentence_two_german, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += germanMissingSentenceArray.length;

    // hebrew missing sentences
    uniqueId = 1;
    const hebrewMissingSentenceArray = data.map((course: any) => [
      [course.missing_sentence_one_hebrew, uniqueId.toString(), "notSelected"],
      [course.missing_sentence_two_hebrew, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += hebrewMissingSentenceArray.length;

    // german missing words
    uniqueId = 1;
    const germanMissingWordsArray = data.map((course: any) => [
      [course.missing_word_one_german, uniqueId.toString(), "notSelected"],
      [course.missing_word_two_german, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += germanMissingWordsArray.length;

    // hebrew missing words
    uniqueId = 1;
    const hebrewMissingWordsArray = data.map((course: any) => [
      [course.missing_word_one_hebrew, uniqueId.toString(), "notSelected"],
      [course.missing_word_two_hebrew, (uniqueId + 1).toString(), "notSelected"]
    ]).flat();
    uniqueId += hebrewMissingWordsArray.length;

  /* ----------------------------------------------------------------------------- */

    // hebrew words
    uniqueId = 1;
    const hebrewWordsArray = data.map((course: any) => [
      [course.word_one_hebrew, uniqueId.toString(), "notSelected"],
      [course.word_two_hebrew, (uniqueId + 1).toString(), "notSelected"],
      [course.word_three_hebrew, (uniqueId + 2).toString(), "notSelected"],
      [course.word_four_hebrew, (uniqueId + 3).toString(), "notSelected"],
      [course.word_five_hebrew, (uniqueId + 4).toString(), "notSelected"],
      [course.word_six_hebrew, (uniqueId + 5).toString(), "notSelected"],
      [course.word_seven_hebrew, (uniqueId + 6).toString(), "notSelected"],
      [course.word_eight_hebrew, (uniqueId + 7).toString(), "notSelected"],
      [course.word_nine_hebrew, (uniqueId + 8).toString(), "notSelected"],
      [course.word_ten_hebrew, (uniqueId + 9).toString(), "notSelected"],
      [course.word_eleven_hebrew, (uniqueId + 10).toString(), "notSelected"],
      [course.word_twelve_hebrew, (uniqueId + 11).toString(), "notSelected"],
    ]).flat();
    uniqueId += hebrewWordsArray.length;

    // german words
    uniqueId = 1;
    const germanWordsArray = data.map((course: any) => [
      [course.word_one_german, uniqueId.toString(), "notSelected"],
      [course.word_two_german, (uniqueId + 1).toString(), "notSelected"],
      [course.word_three_german, (uniqueId + 2).toString(), "notSelected"],
      [course.word_four_german, (uniqueId + 3).toString(), "notSelected"],
      [course.word_five_german, (uniqueId + 4).toString(), "notSelected"],
      [course.word_six_german, (uniqueId + 5).toString(), "notSelected"],
      [course.word_seven_german, (uniqueId + 6).toString(), "notSelected"],
      [course.word_eight_german, (uniqueId + 7).toString(), "notSelected"],
      [course.word_nine_german, (uniqueId + 8).toString(), "notSelected"],
      [course.word_ten_german, (uniqueId + 9).toString(), "notSelected"],
      [course.word_eleven_german, (uniqueId + 10).toString(), "notSelected"],
      [course.word_twelve_german, (uniqueId + 11).toString(), "notSelected"],
    ]).flat();
      uniqueId += hebrewWordsArray.length;

    /* ----------------------------------------------------------------------------- */

    /*
    console.log("german words array:", germanWordsArray);
    console.log("hebrew words array:", hebrewWordsArray);
    console.log("german missing sentences array:", germanMissingSentenceArray);
    console.log("hebrew missing sentences array:", hebrewMissingSentenceArray);
    console.log("german missing words array:", germanMissingWordsArray);
    console.log("hebrew missing words array:", hebrewMissingWordsArray);
    console.log("hebrew senteces", hebrewSentenceArray);
    console.log("german senteces", germanSentenceArray);
    */
   
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