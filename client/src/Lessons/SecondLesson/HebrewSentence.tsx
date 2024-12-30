import React, { useState } from 'react';
import { LessonType, WordsType } from '../types/lessonType';
import { splitSentenceToWords } from './SecondHelper';
import { Card } from 'antd';

interface HebrewSentenceProps {
    lessonsData: LessonType[];
    wordsData: WordsType[];
    hebrewSentence: string;
}

const HebrewSentence: React.FC<HebrewSentenceProps> = ({ wordsData, lessonsData, hebrewSentence }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const wordsArray = splitSentenceToWords(hebrewSentence, wordsData);

    return (
        <div className="text-center my-5">
            <div className="inline-block">
                {wordsArray.map((item, index) => (
                    <div
                        key={index}
                        className="inline-block mx-2 text-center relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="relative">
                            <span className="block">{item.hebrewString}</span>
                            <div
                                className={`border-t-2 w-full absolute top-4 left-0 ${
                                    hoveredIndex === index ? 'border-black' : 'border-dashed border-black'
                                }`}
                            ></div>
                            {hoveredIndex === index && (
                                <Card className="absolute -top-12 left-1/2 -translate-x-1/2 p-0 h-10 flex items-center inline-block bg-white bg-opacity-80 shadow-md">
                                    <p className="m-0 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                                        {item.germanString}
                                    </p>
                                </Card>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HebrewSentence;
