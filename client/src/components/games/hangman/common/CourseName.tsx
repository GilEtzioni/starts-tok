import React from 'react';
import { WordsType } from "../../../../api/common/types";
import { Grid, Row, Typography } from 'antd';
import classNames from 'classnames';

interface CourseNameProps {
  randomWord: WordsType[];
}

const CourseName: React.FC<CourseNameProps> = ({ randomWord }) => {
  const { Title } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  
  return (
    <div className="flex justify-center mb-4">
      {randomWord.length > 0 && (
        <Row justify="center" className="mb-2">
        <Title
          level={isMobile ? 4 : 3}
          className={classNames(
            "font-semibold text-center antialiased",
            isMobile ? "text-xl" : "text-3xl"
          )}
        >
           <span className="whitespace-nowrap">
          {randomWord[0].courseNameEnglish}
          </span>
        </Title>

        </Row>
      )}
    </div>
  );
};

export default CourseName;
