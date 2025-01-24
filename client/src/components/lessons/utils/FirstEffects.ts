import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSuccess, setFailure } from "../slices/LessonsSlice";
import { FirstLessonCard, IsSelected } from '../types/FirstLessonType';

interface UseCardEffectsProps {
    order: number;
    foreignId: number;
    hebrewId: number;
    foreignArray: FirstLessonCard[];
    hebrewArray: FirstLessonCard[];
    counter: number;
    setForeignID: (id: number) => void;
    setHebrewId: (id: number) => void;
    setCounter: (value: React.SetStateAction<number>) => void;
    setForeignArray: (array: FirstLessonCard[]) => void;
    setHebrewArray: (array: FirstLessonCard[]) => void;
    dispatch: ReturnType<typeof useDispatch>;
    status: string;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleClick = ({ foreignId, hebrewId, counter, 
    setForeignID, setHebrewId, setCounter, dispatch, setForeignArray, setHebrewArray, foreignArray, hebrewArray }: UseCardEffectsProps) => { useEffect(() => {
        if ( foreignId !== 0 && hebrewId !== 0) {
            // success
            if (foreignId === hebrewId) {
                setCounter(prev => prev + 1); // count successes

                // update foreign array
                const updatedForeignArray = foreignArray.map((item) =>
                    item.coupleId === foreignId ? { ...item, isSelected: IsSelected.True } : { ...item }
                 );
                setForeignArray(updatedForeignArray);
    
                // update hebrew array
                const updatedHebrewArray = hebrewArray.map((item) =>
                    item.coupleId === hebrewId ? { ...item, isSelected: IsSelected.True } : { ...item }
                );
                setHebrewArray(updatedHebrewArray);

                setForeignID(0);
                setHebrewId(0);
                
                // if finished the game
                if (counter === 5) {
                    dispatch(setSuccess());
                }
            }
            // failure
            else {
                dispatch(setFailure());

                // update foreign array
                const updatedForeignArray = foreignArray.map((item) =>
                    item.coupleId === foreignId ? { ...item, isSelected: IsSelected.False } : { ...item }
                );
                setForeignArray(updatedForeignArray);
        
                // update hebrew array
                const updatedHebrewArray = hebrewArray.map((item) =>
                    item.coupleId === hebrewId ? { ...item, isSelected: IsSelected.False } : { ...item }
                );
                setHebrewArray(updatedHebrewArray);

                setForeignID(0);
                setHebrewId(0);
            }
        }   

    }, [foreignId, hebrewId]);
};