import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { TranslatedArray } from '../types/SecondLessonType';

interface HebrewSentenceProps {
    translatedWords: TranslatedArray[];
}

const HebrewSentenceThird: React.FC<HebrewSentenceProps> = ({ translatedWords }) => {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    return (
        <div className="text-center my-5 !font-medium">
            <div className="inline-block">
                {[...translatedWords]
                    .reverse() // map from last index
                    .map((item, index) => (
                        <Tooltip
                            key={index}
                            title={
                                Array.isArray(item.foreignString) && item.foreignString.length > 0
                                    ? item.foreignString.map((str: string | null, strIndex: number) => (
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
                                    Array.isArray(item.foreignString) &&
                                    item.foreignString[0] !== null
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
                                    !Array.isArray(item.foreignString) || item.foreignString[0] === null
                                        ? '' // no margin or hover for [null]
                                        : 'mr-2'
                                }`}
                            >
                                <span
                                    className={`block ${
                                        !Array.isArray(item.foreignString) || item.foreignString[0] === null
                                            ? '' // disable hover behavior
                                            : 'hover:cursor-pointer'
                                    }`}
                                >
                                    {item.hebrewString}
                                </span>
                                {Array.isArray(item.foreignString) && item.foreignString[0] !== null && (
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
}

export default HebrewSentenceThird;