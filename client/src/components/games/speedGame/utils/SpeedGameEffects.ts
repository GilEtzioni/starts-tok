import { useEffect, useRef } from "react";
import { replaceOldCard, deleteOldCards, getRandomIndex} from "./speedHelper";
import { SelectedCard, speedGameType } from "../types/speedGameTypes";
import { addOneWrongCounter, addOneSuccesssCounter } from "../slices/SpeedGameSlice";
import { WordsType } from "../../../../api/common/types"
import { useDispatch } from "react-redux";
import { SpeedGameMode } from "../types/speedGameTypes"

interface useHandleCouplesProps {
    hebrewArray: speedGameType[];
    germanArray: speedGameType[];
    setGermanArray: (array: speedGameType[]) => void; 
    setHebrewArray: (array: speedGameType[]) => void; 
    dispatch: ReturnType<typeof useDispatch>;
}

interface useHandleTimerProps {
    wordsCoppy: WordsType[] | undefined;
    hebrewArray: speedGameType[];
    germanArray: speedGameType[];
    setGermanArray: (array: speedGameType[]) => void; 
    setHebrewArray: (array: speedGameType[]) => void; 
    dispatch: ReturnType<typeof useDispatch>;
    wrongCounter: number;
    speedGameMode: SpeedGameMode;
}


/* ------------------------------------------------------------------------------------------------------------------------------ */

export const useHandleCouples = ({ hebrewArray, germanArray, setGermanArray, setHebrewArray , dispatch }: useHandleCouplesProps) => {
    useEffect(() => {
        const hebrewId = hebrewArray.find((item) => item.isSelected === SelectedCard.Clicked)?.id || null;
        const germanId = germanArray.find((item) => item.isSelected === SelectedCard.Clicked)?.id || null;

        if (hebrewId && germanId) {
            const updatedGermanArray = germanArray.map((item) =>
                item.id === germanId ? { ...item, isSelected: hebrewId === germanId ? SelectedCard.Success : SelectedCard.Failure } : item
            );
    
            const updatedHebrewArray = hebrewArray.map((item) =>
                item.id === hebrewId ? { ...item, isSelected: hebrewId === germanId ? SelectedCard.Success : SelectedCard.Failure } : item
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
    wordsCoppy,
    germanArray,
    hebrewArray,
    setGermanArray,
    setHebrewArray,
    dispatch,
    wrongCounter,
    speedGameMode
}: useHandleTimerProps) => {
    const intervalDurationRef = useRef(2000); // start with 3 sec
    const roundCounterRef = useRef(1); 

    useEffect(() => {
        if (
            speedGameMode === SpeedGameMode.Loading ||
            wrongCounter === germanArray.length ||
            wordsCoppy === undefined ||
            wordsCoppy.length === 0
        ) {
            return;
        }

        const interval = setInterval(() => {
            const germanIsSuccess = germanArray.some(
                (item) => item.isSelected === SelectedCard.Success
            );
            const hebrewIsSuccess = hebrewArray.some(
                (item) => item.isSelected === SelectedCard.Success
            );

            const words = [...wordsCoppy];
            const newWord = words[words.length - roundCounterRef.current]; // add new word to the game
            roundCounterRef.current += 1;

            if (newWord) {
                if (germanIsSuccess && hebrewIsSuccess) {
                    const { hebrewIndex, germanIndex } = getRandomIndex(hebrewArray, germanArray, SelectedCard.Success);

                    const { newHebrewArray, newGermanArray } = replaceOldCard(
                        newWord,
                        hebrewArray,
                        germanArray,
                        hebrewIndex, 
                        germanIndex
                    );
                    if (newHebrewArray && newGermanArray) {
                        setGermanArray(newGermanArray);
                        setHebrewArray(newHebrewArray);
                    }
                } else {
                    const { hebrewIndex, germanIndex } = getRandomIndex(hebrewArray, germanArray, SelectedCard.NotSelected);
                    const { newHebrewArray, newGermanArray } = deleteOldCards(
                        newWord,
                        hebrewArray,
                        germanArray,
                        hebrewIndex, 
                        germanIndex,
                    );
                    if (newHebrewArray && newGermanArray) {
                        dispatch(addOneWrongCounter());
                        setGermanArray(newGermanArray);
                        setHebrewArray(newHebrewArray);
                    }
                }
            }

            intervalDurationRef.current = Math.max(
                900,
                intervalDurationRef.current - 500
            ); // minimum of 0.5 seconds
        }, intervalDurationRef.current);

        return () => clearInterval(interval);
    } );
};
