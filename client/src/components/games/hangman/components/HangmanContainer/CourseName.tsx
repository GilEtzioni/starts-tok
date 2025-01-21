import React from 'react';
import { WordsType } from "../../../../../api/common/types";
import { Row, Typography } from 'antd';

interface CourseNameProps {
  randomWord: WordsType[];
}

const CourseName: React.FC<CourseNameProps> = ({ randomWord }) => {
  const { Title } = Typography;
  
  return (
    <div className="flex justify-center mb-4">
      {randomWord.length > 0 && (
        <Row justify="center" className="mb-2">
          <Title
            level={3}
            className="text-3xl font-semibold text-center antialiased"
          >
            {randomWord[0].courseNameEnglish}
          </Title>
        </Row>
      )}
    </div>
  );
};

export default CourseName;
