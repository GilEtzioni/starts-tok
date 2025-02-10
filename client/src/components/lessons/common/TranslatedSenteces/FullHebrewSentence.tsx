import React, { useState } from 'react';
import { Grid, Tooltip } from 'antd';
import { TranslatedArray } from '../../types/SecondLessonType';
const classNames = require('classnames');

interface HebrewSentenceProps {
    TranslatedWords: TranslatedArray[];
}

const FullHebrewSentence: React.FC<HebrewSentenceProps> = ({ TranslatedWords }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <div className="text-center my-5 !font-medium">
            <div className="inline-block">
                {[...TranslatedWords]
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
                                        ? '' // no margin or hover for null
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
                                        className={classNames(
                                            'border-t-2 w-full absolute top-5 left-0',
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

export default FullHebrewSentence;