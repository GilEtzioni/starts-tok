// react + antd
import React, { useState } from 'react';
import { Spin, Row, Col, Typography } from 'antd';

// fetch data + components
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './dataSpeedGame/axiosInstance';
import GameCard from './GameCard';

// functions + types
import { shuffleAllWords, } from './speedHelper';
import { useGetData, useHandleCouples, useHandleTimer } from './SpeedGameEffects';
import { WordsType } from "../../Dictionarys/types/wordType";
import { speedGameType, Language } from './types/speedGameTypes';

const MainSpeedGame: React.FC = () => {
    
    const fetchItems = async (): Promise<WordsType[]> => {
        const { data } = await axiosInstance.get('/speedGame');
        const shuffledData = shuffleAllWords(data);
        return shuffledData;
    };

    const { data: words = [], isLoading, error } = useQuery(['speedGame'], fetchItems);
    const [germanArray, setGermanArray] = useState<speedGameType[]>([]);
    const [hebrewArray, setHebrewArray] = useState<speedGameType[]>([]);

    useGetData({ words, setGermanArray, setHebrewArray })
    useHandleCouples({ hebrewArray, germanArray, setGermanArray, setHebrewArray });
    useHandleTimer({words, hebrewArray, germanArray, setGermanArray, setHebrewArray });

    const handleClick = (card: Array<speedGameType>, id: number) => {
        if (card[id].language === Language.GermanWord) {
            const updatedGermanArray = germanArray.map((item, index) => {
                if (index === id && (item.isSelected === "notSelected" || item.isSelected === "clicked")) {
                    return { ...item, isSelected: item.isSelected === "notSelected" ? "clicked" : "notSelected" };
                }
                return { ...item, isSelected: item.isSelected === "clicked" ? "notSelected" : item.isSelected };
            });
            setGermanArray(updatedGermanArray);
        }
    
        if (card[id].language === Language.HebrewWord) {
            const updatedHebrewArray = hebrewArray.map((item, index) => {
                if (index === id && (item.isSelected === "notSelected" || item.isSelected === "clicked")) {
                    return { ...item, isSelected: item.isSelected === "notSelected" ? "clicked" : "notSelected" };
                }
                return { ...item, isSelected: item.isSelected === "clicked" ? "notSelected" : item.isSelected };
            });
            setHebrewArray(updatedHebrewArray);
        }
    }

    const { Title } = Typography;

    if (isLoading) return <Spin tip="Loading..." />;
    if (error) return <div>Error loading data</div>;


    return (
        <div className=''>
            
            <Row justify="center" className="mb-4 mt-8">
                <Title level={3} className="text-center"> התאימו את הזוגות </Title>
            </Row>

        <div className="w-4/5 mx-auto">
            <Row gutter={[4, 4]}>
                {germanArray.map((germanItem, index) => {
                    const hebrewItem = hebrewArray[index];
                    return (
                        <React.Fragment key={`pair-${germanItem.id}`}>

                            {/* german */}
                            <Col key={`german-${germanItem.id}`} span={12}>
                                <GameCard
                                    card={germanItem}
                                    onClick={() => handleClick(germanArray, index)}
                                />
                            </Col>

                            {/* hebrew */}
                            {hebrewItem && (
                                <Col key={`hebrew-${hebrewItem.id}`} span={12}>
                                    <GameCard
                                        card={hebrewItem}
                                        onClick={() => handleClick(hebrewArray, index)}
                                    />
                                </Col>
                            )}
                        </React.Fragment>
                    );
                })}
            </Row>
        </div>
    </div>
    );
};

export default MainSpeedGame;
