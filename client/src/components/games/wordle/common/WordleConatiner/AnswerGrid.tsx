// react + antd
import React from 'react';
import { Card, Row, Col } from 'antd';

// types + functions
import { wordleType, LetterColor, LetterSeleceted } from '../../ types/WordelType';
import classNames from 'classnames';

interface AnswerGridProps {
  gridAnswer: wordleType[][];
}

const AnswerGrid: React.FC<AnswerGridProps> = ({ gridAnswer }) => {

  return (
    <div>
      {gridAnswer?.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          gutter={[8, 8]}
          className="flex justify-center mb-4"
        >
          {row?.map((item, colIndex) => (
            <Col key={colIndex}>
              
        <Card
          key={item?.letter}
          className={classNames(
            'p-2 border flex items-center justify-center w-[50px] h-[50px] rounded-none font-semibold', 
            {
              "bg-gray-300 border border-gray-300 duration-300 ease-in-out":
                item?.selected === LetterSeleceted.NotSelected,

              "border border-black border-1 text-black duration-300 ease-in-out":
                item?.selected === LetterSeleceted.Clicked,

              "bg-green-500 text-white border border-green-500 duration-300 ease-in-out transform rotate-y-180":
                item?.selected === LetterSeleceted.Selected && item?.color === LetterColor.Green,

                "bg-yellow-500 text-white border border-yellow-500 duration-300 ease-in-out transform rotate-y-180":
                item?.selected === LetterSeleceted.Selected &&  item?.color === LetterColor.Yellow,

                "bg-gray-500 text-white border border-gray-500 !duration-300 !ease-in-out !transform !rotate-y-180":
                item?.selected === LetterSeleceted.Selected &&  item?.color === LetterColor.Gray,
            }
          )}
        >
          {item?.letter}
        </Card>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default AnswerGrid;