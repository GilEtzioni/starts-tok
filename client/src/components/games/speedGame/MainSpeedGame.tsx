// react + antd
import React, { useState } from 'react';
import { Spin, Row, Col, Typography } from 'antd';

// fetch data + components
import GameCard from './components/SpeedGameContainer/SpeedGameCard';
import BackButton from './components/SpeedGameContainer/BackButton';
import ModalMessage from './components/ModalMessage/ModalMessage';

// functions + types
import { useGetData, useHandleCouples, useHandleTimer } from "./utils/SpeedGameEffects";
import { speedGameType, Language, SelectedCard } from "./types/speedGameTypes";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../app/store";
import { useFetchWordsData } from "../api/fetchingGame";
import { WordsType } from '../../../api/common/types';

const MainSpeedGame: React.FC = () => {

    const { data: words, isLoading, error } = useFetchWordsData();

    const wrongCounter = useSelector((state: RootState) => state.speedGame.wrongCounter);
    const succcessCounter = useSelector((state: RootState) => state.speedGame.succcessCounter);
    const dispatch = useDispatch();
    
    const [germanArray, setGermanArray] = useState<speedGameType[]>([]);
    const [hebrewArray, setHebrewArray] = useState<speedGameType[]>([]);
    const [wordsCoppy, setWordsCoppy]  = useState<WordsType[] | undefined>([]);

    useGetData({ words, setGermanArray, setHebrewArray, setWordsCoppy });
    useHandleCouples({ hebrewArray, germanArray, setGermanArray, setHebrewArray, dispatch });
    useHandleTimer({wordsCoppy, hebrewArray, germanArray, setGermanArray, setHebrewArray, dispatch, wrongCounter });

    const handleClick = (card: speedGameType[], id: number) => {
        if (card[id].language === Language.GermanWord) {
            const updatedGermanArray = germanArray.map((item, index) => {
                if (index === id && (item.isSelected === SelectedCard.NotSelected || item.isSelected === SelectedCard.Clicked)) {
                    return { ...item, isSelected: item.isSelected === SelectedCard.NotSelected ? SelectedCard.Clicked : SelectedCard.NotSelected };
                }
                return { ...item, isSelected: item.isSelected === SelectedCard.Clicked ? SelectedCard.NotSelected : item.isSelected };
            });
            setGermanArray(updatedGermanArray);
        }
    
        if (card[id].language === Language.HebrewWord) {
            const updatedHebrewArray = hebrewArray.map((item, index) => {
                if (index === id && (item.isSelected === SelectedCard.NotSelected || item.isSelected === SelectedCard.Clicked)) {
                    return { ...item, isSelected: item.isSelected === SelectedCard.NotSelected ? SelectedCard.Clicked : SelectedCard.NotSelected };
                }
                return { ...item, isSelected: item.isSelected === SelectedCard.Clicked ? SelectedCard.NotSelected : item.isSelected };
            });
            setHebrewArray(updatedHebrewArray);
        }
    }

    const { Title } = Typography;

    if (isLoading) return <Spin tip="Loading..." />;
    if (error) return <div>Error loading data</div>;

    return (
        <div>
        {wrongCounter === germanArray.length ? <ModalMessage words={words} setGermanArray={setGermanArray} setHebrewArray={setHebrewArray}/> : null}
        <div className="flex items-center justify-between mb-5">
            
            <div className="flex-none">
                <BackButton />
            </div>

            <div className="flex-grow text-center">
                <Row justify="center" className="mb-4 mt-8">
                    <Title level={3} className="text-center !font-hebrew"> התאימו את הזוגות </Title>
                </Row>
            </div>
        </div>

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
