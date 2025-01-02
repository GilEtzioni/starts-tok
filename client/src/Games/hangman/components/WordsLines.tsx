import React from 'react';
import { hangmanType } from '../types/hangmanType';

interface WordsLinesProps {
	lettersArray: Array<hangmanType>;
	gameArray: Array<hangmanType>;
}

const WordsLines: React.FC<WordsLinesProps> = ({ lettersArray, gameArray }) => {
	return (
		<div className="text-lg leading-6">
			{gameArray.map((item, index) => (
				<span
					key={index}
					className={`${
						item.letter === ' ' ? 'mr-[30px]' : 'mr-[10px]'
					} text-[1.8rem] font-bold ${
						item.selected ? 'text-[#333333]' : 'text-[#4A4A4A]'
					}`}
				>
					{item.selected
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
