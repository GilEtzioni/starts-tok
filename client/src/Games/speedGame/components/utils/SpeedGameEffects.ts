import { useEffect, useRef } from "react";
import { shuffleAllWords, createGameArray, replaceOldCard, deleteOldCards} from "./speedHelper";
import { speedGameType } from "../../types/speedGameTypes"
import { addOneWrongCounter, addOneSuccesssCounter } from "../../slices/SpeedGameSlice";
import { WordsType } from "../../../../types/types"
import { useDispatch } from "react-redux";

interface UseCardEffectsProps {
    words: WordsType[] | undefined;
    setGermanArray: (array: speedGameType[]) => void;
    setHebrewArray: (array: speedGameType[]) => void;
}

interface useHandleCouplesProps {
    hebrewArray: speedGameType[];
    germanArray: speedGameType[];
    setGermanArray: (array: speedGameType[]) => void; 
    setHebrewArray: (array: speedGameType[]) => void; 
    dispatch: ReturnType<typeof useDispatch>;
}

interface useHandleTimerProps {
    words: WordsType[] | undefined;
    hebrewArray: speedGameType[];
    germanArray: speedGameType[];
    setGermanArray: (array: speedGameType[]) => void; 
    setHebrewArray: (array: speedGameType[]) => void; 
    dispatch: ReturnType<typeof useDispatch>;
    wrongCounter: ReturnType<typeof useDispatch>;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useGetData = ({ words, setGermanArray, setHebrewArray }: UseCardEffectsProps) => {
    useEffect(() => {
        if (words === undefined) return;
        
        const shuffledArray = shuffleAllWords(words);
        const {shuffledGermanArray, shuffledHebrewArray} = createGameArray(shuffledArray);
        setGermanArray(shuffledGermanArray);
        setHebrewArray(shuffledHebrewArray);
        
    }, [words]);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleCouples = ({ hebrewArray, germanArray, setGermanArray, setHebrewArray , dispatch }: useHandleCouplesProps) => {
    useEffect(() => {
        const hebrewId = hebrewArray.find((item) => item.isSelected === "clicked")?.id || null;
        const germanId = germanArray.find((item) => item.isSelected === "clicked")?.id || null;

        if (hebrewId && germanId) {
            const updatedGermanArray = germanArray.map((item) =>
                item.id === germanId ? { ...item, isSelected: hebrewId === germanId ? "success" : "failure" } : item
            );
    
            const updatedHebrewArray = hebrewArray.map((item) =>
                item.id === hebrewId ? { ...item, isSelected: hebrewId === germanId ? "success" : "failure" } : item
            );
        
            if (hebrewId === germanId)
                dispatch(addOneSuccesssCounter());
            else
                dispatch(addOneWrongCounter());
    
            setGermanArray(updatedGermanArray);
            setHebrewArray(updatedHebrewArray);
        }

    }, [germanArray, hebrewArray]);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleTimer = ({ 
    words, 
    germanArray, 
    hebrewArray, 
    setGermanArray, 
    setHebrewArray, 
    dispatch, 
    wrongCounter 
}: useHandleTimerProps) => {
    const intervalDurationRef = useRef(3000); // start with 3sec

    useEffect(() => {
        if (wrongCounter === germanArray.length || words === undefined) return;

        const interval = setInterval(() => {
            const germanIsSuccess = germanArray.some((item) => item.isSelected === "success");
            const hebrewIsSuccess = hebrewArray.some((item) => item.isSelected === "success");

            const removedWord = words.pop();

            // at least one success
            if (germanIsSuccess && hebrewIsSuccess) {
                const { newHebrewArray, newGermanArray } = replaceOldCard([removedWord], hebrewArray, germanArray);
                if (newHebrewArray && newGermanArray) {
                    setGermanArray(newGermanArray);
                    setHebrewArray(newHebrewArray);
                }
            } else {
                // no success at all
                const { newHebrewArray, newGermanArray } = deleteOldCards([removedWord], hebrewArray, germanArray);
                if (newHebrewArray && newGermanArray) {
                    dispatch(addOneWrongCounter());
                    setGermanArray(newGermanArray);
                    setHebrewArray(newHebrewArray);
                }
            }

            // make the timer quicker
            intervalDurationRef.current = Math.max(500, intervalDurationRef.current - 300); // decrease by 0.3sec, min 0.5sec
        }, intervalDurationRef.current);

        return () => clearInterval(interval);
    }); // Include relevant dependencies
};

