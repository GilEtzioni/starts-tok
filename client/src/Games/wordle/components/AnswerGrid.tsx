// react + antd
import React from 'react';
import { Card, Row, Col } from 'antd';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

// types + functions
import { wordleType, letterColor } from '../ types/WordelType';
import { useEnterClick } from '../utilts/WordelEffects';
import { WordsType } from '../../hangman/types/types';

interface AnswerGridProps {
  gridAnswer: wordleType[][];
  setGridAnswer: React.Dispatch<React.SetStateAction<wordleType[][]>>;
  correctAnswer: wordleType[];
  allWords: WordsType[];
}

const AnswerGrid: React.FC<AnswerGridProps> = ({ gridAnswer, setGridAnswer, correctAnswer, allWords }) => {
  const clicksCounter = useSelector(
    (state: RootState) => state.wordel.clicksCounter
  );
  const dispatch = useDispatch();

  useEnterClick({ clicksCounter, setGridAnswer, gridAnswer, dispatch, correctAnswer, allWords });

  const cardStyle = (cell: any) => {
    if (!cell) return '';

    if (cell?.isInGame === false) return 'bg-gray-200';
    else if (cell?.letterColor === letterColor.gray) return 'bg-gray-500';
    else if (cell?.letterColor === letterColor.green) return 'bg-green-400';
    else if (cell?.letterColor === letterColor.yellow) return 'bg-yellow-400';

    return '';
  };

  return (
    <div>
      {gridAnswer?.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          gutter={[8, 8]}
          className="flex justify-center mb-4"
        >
          {row?.map((cell, colIndex) => (
            <Col key={colIndex}>
              <Card
                className={`p-2 bg-gray-100 border border-gray-300 ${cardStyle(cell)} flex items-center justify-center w-[50px] h-[50px] rounded-none`}
              >
                {cell ? cell.letter : ''}
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default AnswerGrid;
