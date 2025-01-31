import React from 'react';
import FinishedGameMesssage from '../../common/FinishedGameMesssage';
import { HangmanType, SelectedLetter } from "../types/hangmanType";
import { WordsType } from "../../../../api/common/types";
import useHangmanActions from '../utils/messageHelper';

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../../../../app/store";
import { getSelectedWord } from '../utils/HangHelper';

interface MainMessagesProps {
    randomWord: WordsType[];
    lettersArray: HangmanType[];
    words: WordsType[] | undefined | null;
    selectedWord: string
}

const MainMessages: React.FC<MainMessagesProps> = ({ randomWord, lettersArray, words, selectedWord }) => {
    const { handleBackFail, restartGameFail, handleBackSuccess, restartGameSuccess } = useHangmanActions();
    const wrongCounter = useSelector((state: RootState) => state.hangman.wrongLettersCounter);

    const renderEndGameMessage = () => {
        const uniqueLettersLength = randomWord[0]?.foreignWord
            .replace(/\s/g, '') // remove spaces
            .split('')
            .filter((value, index, self) => self.indexOf(value) === index) // unique letters
            .length;

        if (wrongCounter === 6 && words) {
            return (
                <FinishedGameMesssage
                    onBack={handleBackFail}
                    onRestart={() => restartGameFail(words)}
                    title="המשחק נגמר"
                    description={`${selectedWord} התשובה הנכונה היא`}
                />
            );
        }

        const uniqueLetters = new Set<string>();
        for (const item of lettersArray) {
            if (item.inGame && item.selected === SelectedLetter.Success) {
                uniqueLetters.add(item.letter);
            }
        }

        const successLetter = uniqueLetters.size;

        if (successLetter === uniqueLettersLength && words) {
            return (
                <FinishedGameMesssage
                    onBack={handleBackSuccess}
                    onRestart={() => restartGameSuccess()}
                    title="!כל הכבוד"
                    description={`${selectedWord} התשובה הנכונה היא`}
                />
            );
        }

        return null; 
    };

    return <div>{renderEndGameMessage()}</div>;
};

export default MainMessages;
