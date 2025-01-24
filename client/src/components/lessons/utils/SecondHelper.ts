import { WordsType, SenteceType } from "../../../api/common/types";
import { CardType } from '../types/SecondLessonType';
import { TranslatedArray } from '../types/SecondLessonType';

export const findMaxIndex = (foreignArray: CardType[], cardId: number): number => {
    let maxContainerOrder = 0; 

    // find the card
    const myCard = foreignArray.find((item) => item.id === cardId);

    if (myCard) {
        const targetContainer = myCard.container === "down" ? "up" : "down"; // find his curr container

        // find the max containerOrder in the other containerr
        maxContainerOrder = foreignArray.reduce((maxOrder, item) => {
            if (item.container === targetContainer && item.containerOrder > maxOrder) {
                return item.containerOrder;
            }
            return maxOrder;
        }, 0);
    }

    return maxContainerOrder; 
}

export const getUserAnswer = (lessons: SenteceType, foreignArray: CardType[], order: number): string => { 
    let answer = "";
    foreignArray
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

export const areStringsEqual = (str1: string, str2: string): boolean => {
    const cleanString = (str: string) =>
        str.replace(/[\s.,;!?]/g, '').toLowerCase(); 

    const cleanedStr1 = cleanString(str1);
    const cleanedStr2 = cleanString(str2);

    return cleanedStr1 === cleanedStr2;
}

/* -------------------------------------------------------------------------------- */

const punctuation = [',', '.', '-', '?', '...', '!'];

const stringWithoutSpaces = (str: string) => {
    return str.replace(/ /g, '');
}

const movePunctuationToFront = (str: string): string => {
    for (const mark of punctuation) {
        if (str.endsWith(mark)) {
            // if it ends with the punctuation mark, move it to the front
            return mark + str.slice(0, -mark.length);
        }
    }
    return str;
}

const sentenceWithoutPunctuations = (hebrewSentence: string): string => {
    const cleanString = (str: string) =>
        str.replace(/[\s.,;!?]/g, ' ').toLowerCase();

    const cleanedString = cleanString(hebrewSentence);

    return cleanedString;
}

export const splitSentenceToWords = (hebrewSentence: string, wordsArray: WordsType[]) => {

    const fixedString: string = movePunctuationToFront(hebrewSentence);
    const noPunctionsSentence: string = sentenceWithoutPunctuations(fixedString);
    const resultArray :TranslatedArray[] = [];
    const tempArray: string[] = noPunctionsSentence.split(' ');
    
    // find and push matching words
    const findAndPushMatches = (word: string): boolean => {
        const matchingWords = wordsArray.filter(item => item.hebrewWord === word);
        if (matchingWords.length > 0) {
            const foreignStrings = matchingWords.map(item => item.foreignWord);
            const existingEntry = resultArray.find(entry => entry.hebrewString === word);
            if (existingEntry) {
                existingEntry.foreignString.push(...foreignStrings);
            } else {
                resultArray.push({
                    hebrewString: word,
                    foreignString: foreignStrings,
                });
            }
            return true;
        }
        return false;
    };

    // map three words that have one meaning - e.g. "ich habe hunger"
    let remainingWords = tempArray;
    for (let i = 0; i < remainingWords.length - 2; i++) {
        const threeWordPhrase = `${remainingWords[i]} ${remainingWords[i + 1]} ${remainingWords[i + 2]}`;
        if (findAndPushMatches(threeWordPhrase)) {
            remainingWords.splice(i, 3); // remove the matched words
            i--; 
        }
    }

    // map two words that have one meaning - e.g., "bis bald"
    for (let i = 0; i < remainingWords.length - 1; i++) {
        const twoWordPhrase = `${remainingWords[i]} ${remainingWords[i + 1]}`;
        if (findAndPushMatches(twoWordPhrase)) {
            remainingWords.splice(i, 2); // remove the matched words
            i--;
        }
    }

    // map single words - e.g. "hallo"
    remainingWords = remainingWords.filter(word => !findAndPushMatches(word));

    // push words that dont in the dictionary
    remainingWords.forEach(word => {
        const existingEntry = resultArray.find(entry => entry.hebrewString === word);
        if (existingEntry) {
            existingEntry.foreignString.push("לא במילון");
        } else {
            resultArray.push({
                hebrewString: word,
                foreignString: ["לא במילון"],
            });
        }
    });

    // remove empty cells
    for (let i = resultArray.length - 1; i >= 0; i--) {
        if (!resultArray[i].hebrewString.trim()) {
            resultArray.splice(i, 1);
        }
    }

    // map punctuation in the Hebrew sentence
    let noSpaceString = stringWithoutSpaces(fixedString);
    for (const mark of punctuation) {
        for (let i = 0; i < noSpaceString.length; i++) {
            if (noSpaceString.charAt(i) === mark) {
                const existingEntry = resultArray.find(entry => entry.hebrewString === mark);
                if (existingEntry) {
                    existingEntry.foreignString.push(null);
                } else {
                    resultArray.push({
                        hebrewString: mark,
                        foreignString: [null],
                    });
                }
            }
        }
    }

    // put the items in their right positions
    const finalArray: TranslatedArray[] = [];
    let startIndex = 0;
    
    const normalizeHebrew = (str: string): string => {
        return str.replace(/\s+/g, "").normalize("NFC");
    };
    
    const normalizedNoSpaceString = normalizeHebrew(noSpaceString); 
    
    for (let i = startIndex; i <= normalizedNoSpaceString.length; i++) {
        for (const wordObj of resultArray) {
            const word = wordObj.hebrewString;
            const normalizedWord = normalizeHebrew(word);
            const substring = normalizedNoSpaceString.substring(startIndex, i); 
    
            if (normalizedWord === substring) {
                finalArray.push({
                    hebrewString: wordObj.hebrewString,
                    foreignString: wordObj.foreignString
                });
                startIndex = i;
                break; 
            }
        }
    }
    return finalArray;
}