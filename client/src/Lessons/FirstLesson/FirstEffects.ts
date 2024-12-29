import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSuccess, setFailure } from "../dataLessons/LessonsSlice";
import { getGermanWords, getHebrewWords, shuffleArray } from './FirstHelper';
import { LessonType } from '../types/lessonType';

interface UseCardEffectsProps {
    lessonsData: LessonType[];
    order: number;
    germanId: number;
    hebrewId: number;
    germanArray: Array<{ id: number; word: string; isSelected: string }>;
    hebrewArray: Array<{ id: number; word: string; isSelected: string }>;
    counter: number;
    setGermanID: (id: number) => void;
    setHebrewId: (id: number) => void;
    setCounter: (value: React.SetStateAction<number>) => void;
    setGermanArray: (array: Array<{ id: number; word: string; isSelected: string }>) => void;
    setHebrewArray: (array: Array<{ id: number; word: string; isSelected: string }>) => void;
    dispatch: ReturnType<typeof useDispatch>;
    status: string;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useGetData = ({ lessonsData, order, setGermanArray, setHebrewArray }: UseCardEffectsProps) => {
    useEffect(() => {
        const originalGermanArray = lessonsData.flatMap((lesson) => getGermanWords(lesson, order));        
        const originalHebrewArray = lessonsData.flatMap((lesson) => getHebrewWords(lesson, order)); 

        const shuffledGerman = shuffleArray(originalGermanArray).map(([id, word, isSelected]) => ({ id, word, isSelected: isSelected ?? false }));
        const shuffledHebrew = shuffleArray(originalHebrewArray).map(([id, word, isSelected]) => ({ id, word, isSelected: isSelected ?? false }));

        setGermanArray(shuffledGerman);
        setHebrewArray(shuffledHebrew);


    }, [lessonsData, order, setGermanArray, setHebrewArray]);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleClick = ({ germanId, hebrewId, germanArray, hebrewArray, counter, 
    setGermanID, setHebrewId, setCounter, setGermanArray, setHebrewArray, dispatch }: UseCardEffectsProps) => { useEffect(() => {
        if ( germanId !== 0 && hebrewId !== 0 ) {
            // success
            if (germanId === hebrewId) {
                setCounter(prev => prev + 1); // count successes

                // update german array
                const updatedGermanArray = germanArray.map((item) =>
                    item.id === germanId ? { ...item, isSelected: "true" } : { ...item }
                 );
                setGermanArray(updatedGermanArray);
    
                // update hebrew array
                const updatedHebrewArray = hebrewArray.map((item) =>
                    item.id === hebrewId ? { ...item, isSelected: "true" } : { ...item }
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
                    item.id === germanId ? { ...item, isSelected: "false" } : { ...item }
                );
                setGermanArray(updatedGermanArray);
        
                // update hebrew array
                const updatedHebrewArray = hebrewArray.map((item) =>
                    item.id === hebrewId ? { ...item, isSelected: "false" } : { ...item }
                );
                setHebrewArray(updatedHebrewArray);

                setGermanID(0);
                setHebrewId(0);
            }
        }   

    }, [germanId, hebrewId]);
};
