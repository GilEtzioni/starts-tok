import React from 'react';
import SuccessMessage from './SuccessMessage';
import FailMesssage from './FailMesssage';
import { HangmanType, SelectedLetter } from "../../types/hangmanType";
import { WordsType } from "../../../../../api/common/types";

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../../../../../app/store";

interface MainMessagesProps {
    randomWord: WordsType[];
    lettersArray: HangmanType[];
    words: WordsType[] | undefined;
}

const MainMessages: React.FC<MainMessagesProps> = ({ randomWord, lettersArray, words }) => {

    const wrongCounter = useSelector((state: RootState) => state.hangman.wrongLettersCounter);

    const isEndGame = (wrongCounter: number, lettersArray: HangmanType[]) => {

        const uniqueLettersLength = randomWord[0]?.germanWord
        .replace(/\s/g, '') // remove spaces
        .split('')
        .filter((value, index, self) => self.indexOf(value) === index) // unique letters
        .length;

        if (wrongCounter === 6) {
            return <FailMesssage words={words}  />;
        }
    
        const uniqueLetters = new Set<string>();
    
        for (const item of lettersArray) {
            if (item.inGame && item.selected === SelectedLetter.Success) {
                uniqueLetters.add(item.letter); 
            }
        }
    
        const successLetter = uniqueLetters.size; 
    
        if (successLetter === uniqueLettersLength && words) {
            return <SuccessMessage />;
        }
    };
    
    return (
        <div>
            {isEndGame(wrongCounter, lettersArray)}
        </div>
    );
};

export default MainMessages;
