import React from 'react';
import FinishedGameMesssage from '../../common/FinishedGameMesssage';
import { HangmanType, SelectedLetter } from "../types/hangmanType";
import { WordsType } from "../../../../api/common/types";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../../app/store";
import { useAddNewScore } from '../../requests/addScoreMutate';
import { useQueryClient } from '@tanstack/react-query';
import { addOneSuccesssCounter, resetSuccesssCounter, setNumberWrongCounter } from '../slices/HangmanSlice';
import { HANGMAN_FINISHED_NUMBER } from '../../common/consts';
import { GameNameEnum } from '../../../pages/MainPage/common/GamesCards/types/mainPageTypes';

interface MainMessagesProps {
    randomWord: WordsType[];
    lettersArray: HangmanType[];
    words: WordsType[] | undefined | null;
    selectedWord: string
}

const MainMessages: React.FC<MainMessagesProps> = ({ randomWord, lettersArray, words, selectedWord }) => {
    const { wrongLettersCounter, successGamesCounter } = useSelector((state: RootState) => state.hangman);
    const dispatch = useDispatch();
    const newScore = useAddNewScore(GameNameEnum.Hangman);
    const queryClient = useQueryClient();
    const payload = { score: successGamesCounter + 1 };
  
    const restartGameFail = async (words: WordsType[]) => {
        await queryClient.removeQueries(); 
      dispatch(setNumberWrongCounter(HANGMAN_FINISHED_NUMBER), resetSuccesssCounter());
    };
  
    const restartGameSuccess = async () => {
      await queryClient.removeQueries(); 
      dispatch(setNumberWrongCounter(HANGMAN_FINISHED_NUMBER), addOneSuccesssCounter());
    };
  
    const handleBack = async () => {
      await newScore.mutate(payload);
      await queryClient.removeQueries(); 
    };

    const renderEndGameMessage = () => {
        const uniqueLettersLength = randomWord[0]?.foreignWord
            .replace(/\s/g, '') // remove spaces
            .split('')
            .filter((value, index, self) => self.indexOf(value) === index) // unique letters
            .length;

        if (wrongLettersCounter === 6 && words) {
            return (
                <FinishedGameMesssage
                    onBack={handleBack}
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
                    onBack={handleBack}
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