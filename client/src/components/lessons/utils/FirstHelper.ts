import { WordsType } from '../../../api/common/types'; 
import { FirstCardType, FirstLessonType, IsSelected } from '../types/FirstLessonType';

export function getHebrewWords(lessons: FirstCardType[]): FirstLessonType[] {
    const hebrewWordsArray: string[] = [];

    hebrewWordsArray.push(
    lessons[0].hebrewWord,
    lessons[1].hebrewWord,
    lessons[2].hebrewWord,
    lessons[3].hebrewWord,
    lessons[4].hebrewWord,
    lessons[5].hebrewWord,
    )

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

export function getGermanWords(lessons: FirstCardType[]): FirstLessonType[] {
    const germanWordsArray: string[] = [];

    germanWordsArray.push(
        lessons[0].foreignWord,
        lessons[1].foreignWord,
        lessons[2].foreignWord,
        lessons[3].foreignWord,
        lessons[4].foreignWord,
        lessons[5].foreignWord,
    )

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