import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { TranslatedArray } from '../../types/SecondLessonType';

interface HebrewSentenceProps {
    translatedWords: TranslatedArray[];
}
const MissingHebrewSentence: React.FC<HebrewSentenceProps> = ({ translatedWords }) => {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    return (
        <div className="flex justify-center items-center text-center my-5 !font-medium">
            {[...translatedWords]
                .reverse()
                .map((item, index) => (
                    <Tooltip
                        key={index}
                        title={
                            Array.isArray(item.foreignWord) && item.foreignWord.length > 0
                                ? item.foreignWord.map((str: string | null, strIndex: number) => (
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
                                Array.isArray(item.foreignWord) &&
                                item.foreignWord[0] !== null
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
                                !Array.isArray(item.foreignWord) || item.foreignWord[0] === null
                                    ? '' // no margin or hover for [null]
                                    : 'mr-2'
                            }`}
                        >
                            <span
                                className={`block ${
                                    !Array.isArray(item.foreignWord) || item.foreignWord[0] === null
                                        ? '' // disable hover behavior
                                        : 'hover:cursor-pointer'
                                }`}
                            >
                                {item.hebrewWord}
                            </span>
                            {Array.isArray(item.foreignWord) && item.foreignWord[0] !== null && (
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
    );
}

export default MissingHebrewSentence;