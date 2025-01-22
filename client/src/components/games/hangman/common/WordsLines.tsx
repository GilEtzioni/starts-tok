import React from 'react';
import classNames from 'classnames';
import { HangmanType } from '../types/hangmanType';
import { SelectedLetter } from '../types/hangmanType';

interface WordsLinesProps {
  gameArray: HangmanType[];
}

const WordsLines: React.FC<WordsLinesProps> = ({ gameArray }) => {
  return (
    <div className="text-lg leading-6">
      {gameArray.map((item, index) => (
        <span
          key={index}
          className={classNames(
            'text-[1.8rem] font-bold',
            {
              'mr-[30px]': item.letter === ' ',
              'mr-[10px]': item.letter !== ' ',
              'text-success': item.selected === SelectedLetter.Success,
              'text-failure': item.selected === SelectedLetter.Failure,
              'text-[#4A4A4A]': item.selected === SelectedLetter.NotSelected,
            }
          )}
        >
          {item.selected === SelectedLetter.Success
            ? item.letter
            : item.letter === ' '
            ? <span className="whitespace-nowrap"> </span>
            : '_'}
        </span>
      ))}
    </div>
  );
};

export default WordsLines;
