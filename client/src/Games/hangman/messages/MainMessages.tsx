import React, { useEffect, useState } from 'react';
import SuccessMessage from './SuccessMessage';
import FailMesssage from './FailMesssage';
import { hangmanType } from '../types/hangmanType';
import { WordsType } from '../../../Dictionarys/types/wordType';

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../../../app/store";

interface MainMessagesProps {
    randomWord: Array<WordsType>;
    lettersArray: Array<hangmanType>;
    words: Array<WordsType>;
}

const MainMessages: React.FC<MainMessagesProps> = ({ randomWord, lettersArray, words }) => {

    const wrongCounter = useSelector((state: RootState) => state.hangman.wrongCounter);

    console.log("randomWord: ", randomWord);

    const isEndGame = (wrongCounter: number, lettersArray: Array<hangmanType>) => {

        const uniqueLettersLength = randomWord[0]?.HebrewWord
        .replace(/\s/g, '') // remove spaces
        .split('')
        .filter((value, index, self) => self.indexOf(value) === index) // unique letters
        .length;
        
        if (wrongCounter === 6) {
            return <FailMesssage words={words} />;
        }
    
        const uniqueLetters = new Set<string>();
    
        for (const item of lettersArray) {
            if (item.inGame && item.selected) {
                uniqueLetters.add(item.letter); 
            }
        }
    
        const successLetter = uniqueLetters.size; 
    
        if (successLetter === uniqueLettersLength && uniqueLettersLength !== 0) {
            return <SuccessMessage words={words} />;
        }
    };
    
    return (
        <div>
            <p> {isEndGame(wrongCounter, lettersArray)} </p>
        </div>
    );
};

export default MainMessages;
