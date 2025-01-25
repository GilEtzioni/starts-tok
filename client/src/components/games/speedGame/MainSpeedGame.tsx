// react + antd
import React, { useEffect, useState } from 'react';
import { Spin, Row, Col, Typography } from 'antd';

// fetch data + components
import GameCard from './common/SpeedGameCard';
import BackButton from '../../../common/BackButton';
import FinishedGameMesssage from '../common/FinishedGameMesssage';
import useSpeedGameActions from './utils/messageHelper';

// functions + types
import { useHandleCouples, useHandleTimer } from "./utils/SpeedGameEffects";
import { speedGameType, Language, SelectedCard } from "./types/speedGameTypes";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../app/store";
import { WordsType } from '../../../api/common/types';
import { useQuery } from '@tanstack/react-query';
import { fetchWords } from '../../../api/games';
import { DICTIONARY_ALL_WORDS } from '../requests/queryKeys';
import { createGameArray, shuffleAllWords } from './utils/speedHelper';
import { resetWrongCounter } from './slices/SpeedGameSlice';
import { SPEED_GAME_FINISHED_NUMBER } from '../common/consts';
import LoadingPage from '../../../common/LoadingPage';

const MainSpeedGame: React.FC = () => {

    const wrongCounter = useSelector((state: RootState) => state.speedGame.wrongCounter);
    const successCounter = useSelector((state: RootState) => state.speedGame.succcessCounter);
    const dispatch = useDispatch();
    
    const [germanArray, setGermanArray] = useState<speedGameType[]>([]);
    const [hebrewArray, setHebrewArray] = useState<speedGameType[]>([]);
    const [wordsCoppy, setWordsCoppy]  = useState<WordsType[] | undefined>([]);
    const { handleBack, restartGame } = useSpeedGameActions();

    const {  data: words, isLoading, error } = useQuery(
        [DICTIONARY_ALL_WORDS, wrongCounter === SPEED_GAME_FINISHED_NUMBER],
        () => fetchWords(),
        {
        onSuccess: (words) => {
            const validWords = words ?? []; 
            dispatch(resetWrongCounter());
    
            const shuffledArray = shuffleAllWords(validWords);
            const { shuffledGermanArray, shuffledHebrewArray } = createGameArray(shuffledArray);
    
            setGermanArray(shuffledGermanArray ?? []); 
            setHebrewArray(shuffledHebrewArray ?? []); 
            setWordsCoppy(shuffledArray);
        }
        }
    );

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

    if (isLoading) return <Spin tip="Loading..." />;
    if (error) return <div>Error loading data</div>;

    const { Title } = Typography;
    return (
      <>
        {isLoading ? (
          <LoadingPage />
        ) : wrongCounter === germanArray.length ? (
          <FinishedGameMesssage
            onBack={handleBack}
            onRestart={restartGame}
            title='!כל הכבוד'
            description={`הצלחת למצוא ${successCounter} זוגות`}
          />
        ) : (
          <div className="flex flex-col min-h-screen">
            <div className="relative flex items-center justify-between mt-5 px-5">
              <div className="absolute inset-0 flex justify-center">
                <Title level={3} className="text-center">
                  התאימו את הזוגות
                </Title>
              </div>
    
              <div className="ml-auto">
                <BackButton />
              </div>
            </div>
    
            <div className="w-4/5 mx-auto mt-5">
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
        )}
      </>
    );
  }    
  
export default MainSpeedGame;