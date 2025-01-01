import React from 'react';
import { hangmanType } from '../types/hangmanType';

interface WordsLinesProps {
  lettersArray: Array<hangmanType>;
  gameArray: Array<hangmanType>;
}

const WordsLines: React.FC<WordsLinesProps> = ({ lettersArray, gameArray }) => {
  return (
    <div
      style={{
        fontSize: '1.8rem', 
        lineHeight: '1.5',
      }}
    >
      <span style={{ color: '#f0f0f0', fontSize: '2.2rem', margin: '0 10px' }}>א</span>
      {gameArray.map((item, index) => (
        <span
          key={index}
          style={{
            marginRight: item.letter === ' ' ? '30px' : '10px',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: item.selected ? '#333333' : '#4A4A4A',
          }}
        >
          {item.selected ? item.letter : item.letter === ' ' ? '\u00A0' : '_'}
        </span>
      ))}
      <span style={{ color: '#f0f0f0', fontSize: '2.2rem', margin: '0 10px' }}>א</span>
    </div>
  );
};

export default WordsLines;
