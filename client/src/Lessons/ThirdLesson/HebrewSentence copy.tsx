import React, { useState } from 'react';
import { LessonType, WordsType } from '../types/lessonType';
import { splitSentenceToWords } from '../SecondLesson/SecondHelper';
import { Tooltip } from 'antd';
// import { movePunctuationToFront } from "./SecondHelper"

interface HebrewSentenceProps {
    wordsData: WordsType[];
    hebrewSentence: string;
}

const HebrewSentence: React.FC<HebrewSentenceProps> = ({ wordsData, hebrewSentence }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const wordsArray = splitSentenceToWords(hebrewSentence, wordsData);

    console.log("wordsArray", wordsArray);
    console.log("hebrewSentence", hebrewSentence);

    return (
        <div className="text-center my-5">
            <div className="inline-block">
                {wordsArray
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
                                    item.germanString === null ? '' : 'mr-2'
                                }`}
                            >
                                <span
                                    className={`block ${
                                        item.germanString === null ? '' : 'hover:cursor-pointer'
                                    }`}
                                >
                                    {item.hebrewString}
                                </span>
                                {(item.germanString !== null && item.germanString !== "notInTheDictioanry") && (
                                    <div
                                        className={`border-t-2 w-full absolute top-4 left-0 ${
                                            hoveredIndex === index ? 'border-black' : 'border-dashed border-black'
                                        }`}
                                    ></div>
                                )}
                            </span>
                        </Tooltip>
                    ))}
            </div>
        </div>
    );
};

export default HebrewSentence;