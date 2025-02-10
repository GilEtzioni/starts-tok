import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import GameCard from './GameCard';
import SkeletonCard from '../../Skeleton/SkeletonCard';
import { Typography, Row, Grid } from 'antd';
import { GameNameEnum } from '../types/mainPageTypes';
import { useQuery } from '@tanstack/react-query';
import { WORDS_COUNTER, WORDLE_MAX_SCORE, HANGMAN_MAX_SCORE, SPEED_GAME_MAX_SCORE } from '../../../../requests/queryKeys';
import { fetchMaxPoints, fetchWordsCounter } from '../../../../../../api/pages';
import { useWithAuth } from '../../../../../../api/common/withAuth';
import classNames from 'classnames';

const GameContainer: React.FC = () => {

  const withAuth = useWithAuth();
  const wordsCounter = () => withAuth((token) => fetchWordsCounter(token));
  const maxPointsWordle = () => withAuth((token) => fetchMaxPoints(GameNameEnum.Wordle, token));
  const maxPointsHangman = () => withAuth((token) => fetchMaxPoints(GameNameEnum.Hangman, token));
  const maxPointsSpeedGame = () => withAuth((token) => fetchMaxPoints(GameNameEnum.SpeedGame, token));


  const { data: wordleScore, isLoading: isLoadingWordle} = useQuery(
    [WORDLE_MAX_SCORE],
    maxPointsWordle);

  const { data: hangmanScore, isLoading: isLoadingHangman} = useQuery(
    [HANGMAN_MAX_SCORE],
    maxPointsHangman);

  const { data: speedScore, isLoading: isLoadingSpeed } = useQuery(
    [SPEED_GAME_MAX_SCORE],
    maxPointsSpeedGame);

  const { data: finishedWordsCount } = useQuery(
    [WORDS_COUNTER],
    wordsCounter);

  const totalCards = 4;
  const initialCards = [1, 2, 3, 4];
  const [visibleCards, setVisibleCards] = useState<number[]>(initialCards);

  const cardNames = ["מילון", "איש תלוי", "משחק מהירות", "וורדל"];
  const links = ["/dictionary", "/hangman", "/speedGame", "/wordle"];
  const gameScore = [
    finishedWordsCount,
    hangmanScore?.maxScore,
    speedScore?.maxScore,
    wordleScore?.maxScore,
  ];

  const handleForwardClick = () => {
    setVisibleCards((prev) => prev.map((card) => (card % totalCards) + 1));
  };

  const handleBackwardClick = () => {
    setVisibleCards((prev) => prev.map((card) => (card - 2 + totalCards) % totalCards + 1));
  };

  const { Title } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md; 

  const isLoading = isLoadingHangman || isLoadingWordle || isLoadingSpeed;

  return (
      <div className="flex flex-col justify-between items-end gap-2 mt-5 w-full box-border">
        <Row className={classNames("flex justify-end", isMobile ? "mr-12" : "mr-16")}>
          <Title level={3} className={classNames("text-right", isMobile ? "text-lg" : "text-2xl")}>
            תרגול
          </Title>
        </Row>

        <div className="flex items-center justify-center w-full gap-4 box-border">
        <div
            className={classNames(
              isMobile 
              ?  "ml-10"
              : "relative flex items-center justify-center group ml-10"
            )}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(100%+10px)] h-[240px] bg-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
            <LeftOutlined
              onClick={handleBackwardClick}
              className="cursor-pointer relative z-10"
            />
          </div>
            
          {isLoading
            ? [...Array(isMobile ? 2 : 4)].map((_, index) => <SkeletonCard key={index} />)
            : visibleCards.slice(0, isMobile ? 2 : 4).map((card: number) => (
              <GameCard
                key={card}
                game={cardNames[card - 1]}
                link={links[card - 1]}
                number={card}
                score={gameScore[card - 1]}
              />
            ))}

        <div
            className={classNames(
              
              isMobile
                ? "mr-10"
                : "relative flex items-center justify-center group mr-10"
            )}
          >
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(100%+10px)] h-[240px] bg-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
          <RightOutlined
            onClick={handleForwardClick}
            className="cursor-pointer relative z-10"
          />
          </div>
        </div>
      </div>
  );
};

export default GameContainer;