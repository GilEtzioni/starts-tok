import React, { useState } from 'react';
import { WordsType } from '../types/lessonType';
import { splitSentenceToWords } from './SecondHelper';
import { Tooltip } from 'antd';
import { useHandleData } from './SecondEffects';
const classNames = require('classnames');

interface HebrewSentenceProps {
    wordsData: WordsType[];
    hebrewSentence: string;
}

const HebrewSentenceTwo: React.FC<HebrewSentenceProps> = ({ wordsData, hebrewSentence }) => {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const wordsArray = splitSentenceToWords(hebrewSentence, wordsData);

    const [words, setWords] = useState<Array<{ hebrewString: string; germanString: string | null }>>([]);

    useHandleData({ splitSentenceToWords, hebrewSentence, wordsData, setWords });

    return (
        <div className="text-center my-5">
            <div className="inline-block">
                {[...words]
                    .reverse() // map from last index
                    .map((item, index) => (
                        <Tooltip
                            key={index}
                            title={
                                Array.isArray(item.germanString) && item.germanString.length > 0
                                    ? item.germanString.map((str: string, strIndex: number) => (
                                          <div key={`${index}-${strIndex}`} className="text-center">
                                              {str}
                                          </div>
                                      ))
                                    : ''
                            }
                            placement="top"
                            overlayClassName="bg-white bg-opacity-80 shadow-md text-sm"
                            overlayInnerStyle={{ padding: '4px 8px', whiteSpace: 'nowrap' }}
                            onVisibleChange={(visible) => {
                                if (
                                    visible &&
                                    Array.isArray(item.germanString) &&
                                    item.germanString[0] !== null
                                ) {
                                    setHoveredIndex(index);
                                } else {
                                    setHoveredIndex(null);
                                }
                            }}
                        >
                            {/* Add spaces based on the word / commas / etc */}
                            <span
                                className={`inline-block text-center relative ${
                                    !Array.isArray(item.germanString) || item.germanString[0] === null
                                        ? '' // no margin or hover for null
                                        : 'mr-2'
                                }`}
                            >
                                <span
                                    className={`block ${
                                        !Array.isArray(item.germanString) || item.germanString[0] === null
                                            ? '' // disable hover behavior
                                            : 'hover:cursor-pointer'
                                    }`}
                                >
                                    {item.hebrewString}
                                </span>
                                {Array.isArray(item.germanString) && item.germanString[0] !== null && (
                                    <div
                                        className={classNames(
                                            'border-t-2 w-full absolute top-4 left-0',
                                            {
                                                'border-black': hoveredIndex === index,
                                                'border-dashed border-black': hoveredIndex !== index,
                                            }
                                        )}
                                    ></div>
                                )}
                            </span>
                        </Tooltip>
                    ))}
            </div>
        </div>
    );
}

export default HebrewSentenceTwo;
