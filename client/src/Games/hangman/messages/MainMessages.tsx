import React from 'react';
import SuccessMessage from './SuccessMessage';
import FailMesssage from './FailMesssage';
import { WordsType } from "../../../Dictionarys/types/wordType";
import { hangmanType } from '../types/hangmanType';

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../../../app/store";

interface MainMessagesProps {
    randomWord: WordsType[];
    lettersArray: Array<hangmanType>;
    words: WordsType[];
}

const MainMessages: React.FC<MainMessagesProps> = ({ randomWord, lettersArray, words }) => {

    
    const wordLength = randomWord[0]?.HebrewWord.replace(/\s/g, '').length || 0;
    const wrongCounter = useSelector((state: RootState) => state.hangman.wrongCounter);

    const isEndGame = ( headerLength: number,  wrongCounter: number, lettersArray: Array<hangmanType> ) => {
        if (wrongCounter === 6) {
            return <FailMesssage words={words}/>;
        }

        let successLetter = 0;
        for (const item of lettersArray) {
            if (item.inGame && item.selected) {
                successLetter += 1;
            }
        }

        if (successLetter === headerLength) {
            return <SuccessMessage />;
        }
    };
    
    return (
        <div>
            <p> {isEndGame(wordLength, wrongCounter, lettersArray)} </p>
        </div>
    );
};

export default MainMessages;
