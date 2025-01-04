import { useEffect } from "react";
import { shuffleAllWords, createGameArray, replaceOldCard, deleteOldCards} from "./speedHelper";
import { speedGameType } from "./types/speedGameTypes";

interface UseCardEffectsProps {
    words: any;
    setGermanArray: (array: Array<speedGameType>) => void;
    setHebrewArray: (array: Array<speedGameType>) => void;
}

interface useHandleCouplesProps {
    hebrewArray: Array<speedGameType>;
    germanArray: Array<speedGameType>;
    setGermanArray: (array: Array<speedGameType>) => void; 
    setHebrewArray: (array: Array<speedGameType>) => void; 
}

interface useHandleTimerProps {
    words: any;
    hebrewArray: Array<speedGameType>;
    germanArray: Array<speedGameType>;
    setGermanArray: (array: Array<speedGameType>) => void; 
    setHebrewArray: (array: Array<speedGameType>) => void; 
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useGetData = ({ words, setGermanArray, setHebrewArray }: UseCardEffectsProps) => {
    useEffect(() => {
        if (words.length > 0) {
            const shuffledArray = shuffleAllWords(words);
            const {shuffledGermanArray, shuffledHebrewArray} = createGameArray(shuffledArray);
            setGermanArray(shuffledGermanArray);
            setHebrewArray(shuffledHebrewArray);
        }
    }, [words]);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleCouples = ({ hebrewArray, germanArray, setGermanArray, setHebrewArray  }: useHandleCouplesProps) => {
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
    
            setGermanArray(updatedGermanArray);
            setHebrewArray(updatedHebrewArray);
        }

    }, [germanArray, hebrewArray]);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleTimer = ({ words, germanArray, hebrewArray, setGermanArray, setHebrewArray }: useHandleTimerProps) => {
    useEffect(() => {
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
            }

            // no success at all
            else {
                const { newHebrewArray, newGermanArray } = deleteOldCards([removedWord], hebrewArray, germanArray);

                if (newHebrewArray && newGermanArray) {
                    setGermanArray(newGermanArray);
                    setHebrewArray(newHebrewArray);
                  }
            }
        }, 3000);
        
        return () => clearInterval(interval);
    }, [germanArray, hebrewArray, words]); 
}
