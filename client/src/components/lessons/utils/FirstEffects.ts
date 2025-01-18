import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSuccess, setFailure } from "../slices/LessonsSlice";
import { getGermanWords, getHebrewWords, shuffleArray } from './FirstHelper';
import { FirstLessonType, IsSelected } from '../types/FirstLessonType';
import { WordsType, SenteceType } from "../../../api/common/types";

interface UseCardEffectsProps {
    lessonsData: WordsType[] | undefined;
    order: number;
    germanId: number;
    hebrewId: number;
    germanArray: FirstLessonType[];
    hebrewArray: FirstLessonType[];
    counter: number;
    setGermanID: (id: number) => void;
    setHebrewId: (id: number) => void;
    setCounter: (value: React.SetStateAction<number>) => void;
    setGermanArray: (array: FirstLessonType[]) => void;
    setHebrewArray: (array: FirstLessonType[]) => void;
    dispatch: ReturnType<typeof useDispatch>;
    status: string;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useGetData = ({ lessonsData, order, setGermanArray, setHebrewArray }: UseCardEffectsProps) => {
    useEffect(() => {

        if (!lessonsData) return;
        
        const originalGermanArray = getGermanWords(lessonsData);        
        const originalHebrewArray = getHebrewWords(lessonsData); 

        const shuffledGerman = shuffleArray(originalGermanArray);
        const shuffledHebrew = shuffleArray(originalHebrewArray);

        setGermanArray(shuffledGerman);
        setHebrewArray(shuffledHebrew);

    }, [lessonsData]);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleClick = ({ germanId, hebrewId, germanArray, hebrewArray, counter, 
    setGermanID, setHebrewId, setCounter, setGermanArray, setHebrewArray, dispatch }: UseCardEffectsProps) => { useEffect(() => {
        if ( germanId !== 0 && hebrewId !== 0) {
            // success
            if (germanId === hebrewId) {
                setCounter(prev => prev + 1); // count successes

                // update german array
                const updatedGermanArray = germanArray.map((item) =>
                    item.coupleId === germanId ? { ...item, isSelected: IsSelected.True } : { ...item }
                 );
                setGermanArray(updatedGermanArray);
    
                // update hebrew array
                const updatedHebrewArray = hebrewArray.map((item) =>
                    item.coupleId === hebrewId ? { ...item, isSelected: IsSelected.True } : { ...item }
                );
                setHebrewArray(updatedHebrewArray);

                setGermanID(0);
                setHebrewId(0);
                
                // if finished the game
                if (counter === 5) {
                    dispatch(setSuccess());
                }
            }
            // failure
            else {
                dispatch(setFailure());

                // update german array
                const updatedGermanArray = germanArray.map((item) =>
                    item.coupleId === germanId ? { ...item, isSelected: IsSelected.False } : { ...item }
                );
                setGermanArray(updatedGermanArray);
        
                // update hebrew array
                const updatedHebrewArray = hebrewArray.map((item) =>
                    item.coupleId === hebrewId ? { ...item, isSelected: IsSelected.False } : { ...item }
                );
                setHebrewArray(updatedHebrewArray);

                setGermanID(0);
                setHebrewId(0);
            }
        }   

    }, [germanId, hebrewId]);
};