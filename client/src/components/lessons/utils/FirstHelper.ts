import { LessonType } from '../../../api/common/types'; 
import { FirstLessonType, IsSelected } from '../types/FirstLessonType';

export function getHebrewWords(lessons: LessonType, order: number): FirstLessonType[] {
    const hebrewWordsArray: string[] = [];

    // First lesson - only first six words
    if (order === 1) {
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
    if (order === 4) {
        hebrewWordsArray.push(
            lessons.wordSevenHebrew,
            lessons.wordEightHebrew,
            lessons.wordNineHebrew,
            lessons.wordTenHebrew,
            lessons.wordElevenHebrew,
            lessons.wordTwelveHebrew
        );
    }

    const combinedWordsArray: FirstLessonType[] = [];
    for (let i = 0; i < hebrewWordsArray.length; i++) {
        const coupleId = i + 1;
        const hebrewWord = hebrewWordsArray[i];
        if (hebrewWord) {
            combinedWordsArray.push({
                coupleId: coupleId, 
                word: hebrewWord, 
                isSelected: IsSelected.NotSelected,
            });
        }
    }

    return combinedWordsArray;
}

export function getGermanWords(lessons: LessonType, order: number): FirstLessonType[] {
    const germanWordsArray: string[] = [];

    // first lesson - only first six words
    if (order === 1) {
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
    if (order === 4) {
        germanWordsArray.push(
            lessons.wordSevenGerman,
            lessons.wordEightGerman,
            lessons.wordNineGerman,
            lessons.wordTenGerman,
            lessons.wordElevenGerman,
            lessons.wordTwelveGerman
        );
    }

    const combinedWordsArray: FirstLessonType[] = [];
    for (let i = 0; i < germanWordsArray.length; i++) {
        const coupleId = i + 1;
        const germanWord = germanWordsArray[i];
        if (germanWord) {
            combinedWordsArray.push({
                coupleId: coupleId, 
                word: germanWord, 
                isSelected: IsSelected.NotSelected,
            });
        }
    }

    return combinedWordsArray;
}

export function shuffleArray (wordsArray: FirstLessonType[]): FirstLessonType[] {
    for (let i = wordsArray.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [wordsArray[i], wordsArray[random]] = [wordsArray[random], wordsArray[i]]; // swap item with random
    }
    return wordsArray;
};