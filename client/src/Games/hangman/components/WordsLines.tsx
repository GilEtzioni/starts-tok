import React from 'react';
import { hangmanType } from '../types/hangmanType';

interface WordsLinesProps {
	lettersArray: Array<hangmanType>;
	gameArray: Array<hangmanType>;
}

const WordsLines: React.FC<WordsLinesProps> = ({ lettersArray, gameArray }) => {
	return (
		<div className="text-lg leading-6">
			<span className="text-[2.2rem] text-[#f0f0f0] mx-2">א</span>
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
			<span className="text-[2.2rem] text-[#f0f0f0] mx-[10px]">א</span>
		</div>
	);
};

export default WordsLines;
