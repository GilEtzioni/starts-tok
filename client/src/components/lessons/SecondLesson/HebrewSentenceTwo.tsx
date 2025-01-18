import React, { useState } from 'react';
import { WordsType } from "../../../types/types"
import { Tooltip } from 'antd';
import { useHandleData } from '../utils/SecondEffects';
import { TranslatedArray } from '../types/SecondLessonType';
import { LessonStatus } from '../types/LessonType';
const classNames = require('classnames');

interface HebrewSentenceProps {
    wordsData: WordsType[] | undefined;
    hebrewSentence: string;
    status: LessonStatus;
}

const HebrewSentenceTwo: React.FC<HebrewSentenceProps> = ({ wordsData, hebrewSentence, status }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [TranslatedWords, setTranslatedWords] = useState<TranslatedArray[]>([]);

    useHandleData({ hebrewSentence, wordsData, setTranslatedWords });

    return (
        <div className="text-center my-5 !font-hebrew !font-medium">
            <div className="inline-block">
                {[...TranslatedWords]
                    .reverse() // map from last index
                    .map((item, index) => (
                        <Tooltip
                            key={index}
                            title={
                                Array.isArray(item.germanString) && item.germanString.length > 0
                                    ? item.germanString.map((str: string | null, strIndex: number) => (
                                          <div key='strIndex' className="text-center">
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
                            {/* add spaces based on the word / commas / etc */}
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