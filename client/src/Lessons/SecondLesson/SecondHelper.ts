import { LessonType } from '../types/lessonType';
interface CardItem {
    id: number;
    containerOrder: number;
    word: string;
    container: string;
}

export function getGermanWords(lessons: LessonType, order: number):Array<[number, number, string, string]> {
    const germanWordsArray: Array<string> = [];

    // first lesson - all 12 words
    if (order === 2) {
        germanWordsArray.push(
            lessons.wordOneGerman,
            lessons.wordTwoGerman,
            lessons.wordThreeGerman,
            lessons.wordFourGerman,
            lessons.wordFiveGerman,
            lessons.wordSixGerman,
            lessons.wordSevenGerman,
            lessons.wordEightGerman,
            lessons.wordNineGerman,
            lessons.wordTenGerman,
            lessons.wordElevenGerman,
            lessons.wordTwelveGerman,
        );
    }

    // second lesson - all 12 words
    if (order === 5) {
        germanWordsArray.push(
            lessons.wordOneGerman,
            lessons.wordTwoGerman,
            lessons.wordThreeGerman,
            lessons.wordFourGerman,
            lessons.wordFiveGerman,
            lessons.wordSixGerman,
            lessons.wordSevenGerman,
            lessons.wordEightGerman,
            lessons.wordNineGerman,
            lessons.wordTenGerman,
            lessons.wordElevenGerman,
            lessons.wordTwelveGerman,
        );
    }

    // 2d array - [ [coupleId] , [germanWord], [container] ]
    const combinedWordsArray: Array<[number, number, string, string]> = [];
    for (let i = 0; i < germanWordsArray.length; i++) {
        const coupleId = i + 1;
        const containerOrder = coupleId;
        const germanWord = germanWordsArray[i];
        const container = "down";
        if (germanWord) {
            combinedWordsArray.push([coupleId, containerOrder, germanWord, container]);
        }
    }

    return combinedWordsArray;
}

export function shuffleArray (wordsArray: Array<[number, number, string, string]>): Array<[number, number, string, string]> {
    for (let i = wordsArray.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [wordsArray[i], wordsArray[random]] = [wordsArray[random], wordsArray[i]]; // swap item with random
    }
    return wordsArray;
};

export function findMaxIndex(germanArray: CardItem[], cardId: number): number {
    let maxContainerOrder = 0; 

    // find the card
    const myCard = germanArray.find((item) => item.id === cardId);

    if (myCard) {
        const targetContainer = myCard.container === "down" ? "up" : "down"; // find his curr container

        // find the max containerOrder in the other containerr
        maxContainerOrder = germanArray.reduce((maxOrder, item) => {
            if (item.container === targetContainer && item.containerOrder > maxOrder) {
                return item.containerOrder;
            }
            return maxOrder;
        }, 0);
    }

    return maxContainerOrder; 
}

export function getHebrewSentence (lessons: LessonType, order: number): string { 
    if (order === 2) {
        return lessons.sentenceOneHebrew;
    }
    if (order === 5) {
        return lessons.sentenceTwoHebrew;
    }
    return "";
}

export function getGermanSentence (lessons: LessonType, order: number): string { 
    if (order === 2) {
        return lessons.sentenceOneGerman;
    }
    if (order === 5) {
        return lessons.sentenceTwoGerman;
    }
    return "";
}


export function getUserAnswer (lessons: LessonType, germanArray: CardItem[], order: number): string { 
    let answer = "";
    germanArray
        .filter(item => item.container === "up") 
        .sort((a, b) => a.containerOrder - b.containerOrder) 
        .forEach((item, index) => {
            if (index === 0) { 
                answer += item.word;
            } else {
                answer += " " + item.word;
            }
        });
        
    return answer;
}

export function areStringsEqual(str1: string, str2: string): boolean {
    const cleanString = (str: string) =>
        str.replace(/[\s.,;!?]/g, '').toLowerCase(); 

    const cleanedStr1 = cleanString(str1);
    const cleanedStr2 = cleanString(str2);

    return cleanedStr1 === cleanedStr2;
}