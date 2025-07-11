import React from "react";
import { Progress, Typography } from "antd";
import "antd/dist/reset.css";

type CourseProgressBarProps = {
  num: number;
};

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ num }) => {
  const percentage = Math.min((num) * 20, 100);
  const { Paragraph } = Typography;

  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3/5">
      <Progress
        percent={percentage}
        strokeColor="white"
        trailColor="rgba(255, 255, 255, 0.2)"
        strokeWidth={16}
        showInfo={false}
        className="w-full"
      />

    <Paragraph className="absolute w-full text-center font-bold text-gray-500/80 m-0 top-1/3 -translate-y-1/2 text-[12px]" >
    6 / {num}
    </Paragraph>
    </div>
  );
};

export default CourseProgressBar;