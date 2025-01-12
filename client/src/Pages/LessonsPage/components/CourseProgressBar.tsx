import React from "react";
import { Progress } from "antd";
import "antd/dist/reset.css";

type CourseProgressBarProps = {
  num: number;
};

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ num }) => {
  const percentage = Math.min((num - 1) * 20, 100);

  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2/5">
      <Progress
        percent={percentage}
        showInfo={false}
        strokeColor="#ffffff"
      />
    </div>
  );
};

export default CourseProgressBar;