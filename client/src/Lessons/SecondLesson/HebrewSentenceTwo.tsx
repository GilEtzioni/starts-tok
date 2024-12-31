import React, { useEffect, useState } from 'react';
import { WordsType } from '../types/lessonType';
import { splitSentenceToWords } from './SecondHelper';
import { Tooltip } from 'antd';
import { useHandleData } from './SecondEffects';

interface HebrewSentenceProps {
    wordsData: WordsType[];
    hebrewSentence: string;
}

const HebrewSentenceTwo: React.FC<HebrewSentenceProps> = ({ wordsData, hebrewSentence }) => {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const wordsArray = splitSentenceToWords(hebrewSentence, wordsData);

    const [words, setWords] = useState<Array<{ hebrewString: string; germanString: string | null }>>([]);

    useHandleData({ splitSentenceToWords, hebrewSentence, wordsData, setWords  });

    return (
        <div className="text-center my-5">
            <div className="inline-block">
                {[...words] 
                    .reverse() // map from last index
                    .map((item, index) => (
                        <Tooltip
                            key={index}
                            title={item.germanString}
                            placement="top"
                            overlayClassName="bg-white bg-opacity-80 shadow-md text-sm"
                            overlayInnerStyle={{ padding: '4px 8px', whiteSpace: 'nowrap' }}
                            onVisibleChange={(visible) => {
                                if (visible && item.germanString !== null) {
                                    setHoveredIndex(index);
                                } else {
                                    setHoveredIndex(null);
                                }
                            }}
                        >
                            {/* add spaces based on the word /commas / etc */}
                            <span
                                className={`inline-block text-center relative ${
                                    item.germanString === null  ? '' : 'mr-2'
                                }`}
                            >
                                <span
                                    className={`block ${
                                        item.germanString === null ? '' : 'hover:cursor-pointer'
                                    }`}
                                >
                                    {item.hebrewString}
                                </span>
                                {item.germanString !== null && (
                                    <div
                                        className={`border-t-2 w-full absolute top-4 left-0 ${
                                            hoveredIndex === index ? 'border-black' : 'border-dashed border-black'
                                        }`}
                                    >
                                    </div>
                                )}
                            </span>
                        </Tooltip>
                    ))}
            </div>
        </div>
    );
};

export default HebrewSentenceTwo;