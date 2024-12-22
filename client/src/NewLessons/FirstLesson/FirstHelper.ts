import { LessonType } from '../types/lessonType';

export function getHebrewWords(lessons: LessonType):Array<[number, string]> {
    const hebrewWordsArray: Array<string> = [];

    // First lesson - only first six words
    if (lessons.lessonId === 1) {
        hebrewWordsArray.push(
            lessons.wordOneHebrew,
            lessons.wordTwoHebrew,
            lessons.wordThreeHebrew,
            lessons.wordFourHebrew,
            lessons.wordFiveHebrew,
            lessons.wordSixHebrew
        );
    }
    // Second lesson - only last six words
    if (lessons.lessonId === 4) {
        hebrewWordsArray.push(
            lessons.wordSevenHebrew,
            lessons.wordEightHebrew,
            lessons.wordNineHebrew,
            lessons.wordTenHebrew,
            lessons.wordElevenHebrew,
            lessons.wordTwelveHebrew
        );
    }

    // 2d array - [ [coupleId] , [hebrewWord] ]
    const combinedWordsArray: Array<[number, string]> = [];
    for (let i = 0; i < hebrewWordsArray.length; i++) {
        const coupleId = i + 1;
        const hebrewWord = hebrewWordsArray[i];
        if (hebrewWord) {
            combinedWordsArray.push([coupleId, hebrewWord]);
        }
    }

    return combinedWordsArray;
}

export function getGermanWords(lessons: LessonType):Array<[number, string]> {
    const germanWordsArray: Array<string> = [];

    // first lesson - only first six words
    if (lessons.lessonId === 1) {
        germanWordsArray.push(
            lessons.wordOneGerman,
            lessons.wordTwoGerman,
            lessons.wordThreeGerman,
            lessons.wordFourGerman,
            lessons.wordFiveGerman,
            lessons.wordSixGerman
        );
    }

    // second lesson - only last six words
    if (lessons.lessonId === 4) {
        germanWordsArray.push(
            lessons.wordSevenGerman,
            lessons.wordEightGerman,
            lessons.wordNineGerman,
            lessons.wordTenGerman,
            lessons.wordElevenGerman,
            lessons.wordTwelveGerman
        );
    }

    // 2d array - [ [coupleId] , [germanWord] ]
    const combinedWordsArray: Array<[number, string]> = [];
    for (let i = 0; i < germanWordsArray.length; i++) {
        const coupleId = i + 1;
        const germanWord = germanWordsArray[i];
        if (germanWord) {
            combinedWordsArray.push([coupleId, germanWord]);
        }
    }

    return combinedWordsArray;
}

export function shuffleArray (wordsArray: Array<[number, string]>): Array<[number, string]> {
    for (let i = wordsArray.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [wordsArray[i], wordsArray[random]] = [wordsArray[random], wordsArray[i]]; // swap item with random
    }
    return wordsArray;
};

export function checkCouples (firstId: number, secondId: number): boolean {
    if(firstId === secondId){
        return true;
        console.log("true");   
    }
    return false;
}