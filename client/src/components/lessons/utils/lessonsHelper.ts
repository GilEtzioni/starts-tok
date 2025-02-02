import { SenteceType } from "../../../api/common/types";
import { CardType } from '../types/SecondLessonType';

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