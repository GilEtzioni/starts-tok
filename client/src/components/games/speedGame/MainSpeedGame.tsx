// react + antd
import React, { useState } from 'react';
import { Row, Col, Typography, Grid } from 'antd';

// fetch data + components
import GameCard from './common/SpeedGameCard';
import BackButton from '../../../common/BackButton';
import FinishedGameMesssage from '../common/FinishedGameMesssage';

// functions + types
import { useHandleCouples, useHandleTimer } from "./utils/SpeedGameEffects";
import { speedGameType, Language, SelectedCard } from "./types/speedGameTypes";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../app/store";
import { WordsType } from '../../../api/common/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchWords } from '../../../api/games';
import { SPEED_GAME_WORDS } from '../requests/queryKeys';
import { createGameArray, shuffleAllWords } from './utils/speedHelper';
import { resetSpeedGame, resetSuccesssCounter, resetWrongCounter } from './slices/SpeedGameSlice';
import LoadingPage from '../../../common/LoadingPage';
import { useWithAuth } from '../../../api/common/withAuth';
import { useAddNewScore } from '../requests/addScoreMutate';
import { GameNameEnum } from '../../pages/MainPage/common/GamesCards/types/mainPageTypes';
import { SPEED_GAME_FINISHED_NUMBER } from '../common/consts';

const MainSpeedGame: React.FC = () => {

  const { wrongCounter, succcessCounter} = useSelector((state: RootState) => state.speedGame);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const newScore = useAddNewScore(GameNameEnum.SpeedGame)
    const [germanArray, setGermanArray] = useState<speedGameType[]>([]);
    const [hebrewArray, setHebrewArray] = useState<speedGameType[]>([]);
    const [wordsCoppy, setWordsCoppy]  = useState<WordsType[] | undefined>([]);

    const withAuth = useWithAuth();
    const fetchGameWords = () => withAuth((token) => fetchWords(token));
    const {  data: words, isLoading } = useQuery(
      [ SPEED_GAME_WORDS ],
      fetchGameWords,
      {
        staleTime: Infinity, 
        cacheTime: Infinity,
        refetchOnMount: true,
        onSuccess: (data) => {
          const validWords = data ?? []; 
    
          const shuffledArray = shuffleAllWords(validWords);
          const { shuffledGermanArray, shuffledHebrewArray } = createGameArray(shuffledArray);
    
          setGermanArray(shuffledGermanArray ?? []); 
          setHebrewArray(shuffledHebrewArray ?? []); 
          setWordsCoppy(shuffledArray);
          dispatch(resetWrongCounter());
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

    const payload = { score: succcessCounter };

    const handleBack = async () => {
      await newScore.mutate(payload);
      queryClient.removeQueries();
      dispatch(resetSpeedGame());
    };

    const restartGame = async () => {
      await newScore.mutate(payload);
      dispatch(resetSuccesssCounter(), resetWrongCounter());
      await queryClient.invalidateQueries([ SPEED_GAME_WORDS ]); 
    };

    const { Title } = Typography;
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
      <>
        {isLoading ? (
          <LoadingPage />
        ) : wrongCounter === SPEED_GAME_FINISHED_NUMBER ? (
          <FinishedGameMesssage
            onBack={handleBack}
            onRestart={restartGame}
            title='!כל הכבוד'
            description={`הצלחת למצוא ${succcessCounter} זוגות`}
          />
        ) : (
          <div className="flex flex-col min-h-screen">
            <div className="relative flex items-center justify-between mt-5 px-5">
              <div className="absolute inset-0 flex justify-center">
                <Title level={ isMobile ? 4 : 3 } className="text-center">
                  התאימו את הזוגות
                </Title>
              </div>
    
              <div className="ml-auto">
                <BackButton onBack={handleBack}/>
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