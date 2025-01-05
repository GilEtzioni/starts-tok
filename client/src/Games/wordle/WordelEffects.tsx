import { useEffect } from "react";
// types
import { WordsType } from '../hangman/types/types';
import { wordleType, letterColor } from "./ types/WordelType";

// functions + redux
import { randomWordsArray, getRandomWord, createLettersGrid } from "./wordleHelper";
import { CurrentMode, addOneSuccess , minusOneClick, setCurrentMode} from "./dataWordle/WordleSlice";

export interface useStartGameProps {
    words: Array<WordsType>;
    setCorrectAnswer: (array: Array<wordleType>) => void;
    setGridAnswer: (array: Array<Array<wordleType>>) => void;
    setGridLetters: (array: Array<{ letter: string; letterColor: letterColor }>) => void;
    setAllWords: (array: Array<WordsType>) => void;
}

export interface useEnterClickProps {
    clicksCounter: number;
    setGridAnswer: (array: Array<Array<wordleType>>) => void;
    gridAnswer: Array<Array<wordleType>>;
    words: Array<WordsType>;
    dispatch: any;
    correctAnswer: Array<wordleType>;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useStartGame = ({ words, setAllWords, setGridAnswer, setCorrectAnswer, setGridLetters }: useStartGameProps) => {
    useEffect(() => {
        if (words?.length > 0) {
            const filterArray = randomWordsArray(words);
            const gameWord = getRandomWord(filterArray);
            const gridLetters = createLettersGrid();
    
            const ROW_LENGTH = 5;
            const COLUMN_LENGTH = gameWord.length;
            
            const initialGrid = Array.from({ length: ROW_LENGTH }, () =>
                Array(COLUMN_LENGTH).fill(null)
            );
            
            setAllWords(filterArray);
            setGridAnswer(initialGrid);
            setCorrectAnswer(gameWord);
            setGridLetters(gridLetters);
    
            const correctAnswer = gameWord?.map((item) => item?.letter || '').join('');
        }
    },[words]);
};

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useEnterClick = ({ clicksCounter, setGridAnswer, gridAnswer, words, dispatch, correctAnswer }: useEnterClickProps) => {
    useEffect(() => {
        if (gridAnswer?.length === 0 || !gridAnswer[clicksCounter]?.length) return;
    
        const currentWord = gridAnswer[clicksCounter - 1]?.map((item) => item?.letter).join('') || '';
        const result = [...gridAnswer];
    
        const wordFound: boolean = words.some((item) => item.GermanWord.toLowerCase() === currentWord.toLowerCase());
        const numOfWordsSucces: number = gridAnswer[clicksCounter]?.filter((item) => item?.letterColor === letterColor.green).length || 0;
        const userAnswerLength: number = gridAnswer[clicksCounter]?.filter((item) => item !== null).length || 0;
        const answerLength = correctAnswer.length;

        console.log("userAnswerLength: ", userAnswerLength);
        console.log("answerLength: ", answerLength);
        
        // success message
        if (wordFound && userAnswerLength === answerLength) {
            result[clicksCounter - 1] = result[clicksCounter - 1]?.map((item) => {
                if (item) {
                    return { ...item, isInGame: true };
                }
                return item;
            });
            setGridAnswer(result);
            dispatch(setCurrentMode("success"));
        }

        // not a vlid word message
        if (!wordFound && clicksCounter !== 0) {
            dispatch(setCurrentMode("notInDictionary"));
        }

        // too short word message
        if (userAnswerLength < answerLength && clicksCounter !== 0) {
            dispatch(setCurrentMode("notEnoughLetters"));
        }

        // failure message
        if (clicksCounter === 5 && numOfWordsSucces !== correctAnswer.length) {
            dispatch(setCurrentMode("failure"));
        }
    }, [clicksCounter]);
}
