// react + antd
import React, { useState } from 'react';
import { Button } from 'antd';

// redux
import { addOneWrongCounter } from "../dataHangman/HangmanSlice"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../app/store";

// helping functions
import { manageGame, isAnwerTrue } from "../HangHelper";

interface WordsGridProps {
  // setLettersArray: (array: Array<{ letter: string; isSelected: boolean; }>) => void;
  setLettersArray: any;
  lettersArray: Array<[string, boolean]>;
}

const WordsGrid: React.FC<WordsGridProps> = ({ setLettersArray, lettersArray }) => {

    // redux
    const wrongCounter = useSelector((state: RootState) => state.hangman.wrongCounter);
    const dispatch = useDispatch();

    const [anwser, setAnswer] = useState(false);

  const letters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ך', 'ל',
     'מ', 'ם', 'נ', 'ן', 'ס', 'ע', 'פ', 'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת' ];

  const handleClick = (selectedLetter: string) => {
    const userAnswer = isAnwerTrue(lettersArray ,selectedLetter);
    setAnswer(userAnswer);

    const updatedArray = manageGame(lettersArray, selectedLetter);
    setLettersArray(updatedArray);  

    if (anwser === false) {
      dispatch(addOneWrongCounter());
    }
  }

  return (
    <div> 
      {letters.map((item) => (
        <Button onClick={() => handleClick(item)}> {item} </Button> ))}
    </div>
  );
};

export default WordsGrid;
