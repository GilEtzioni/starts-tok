import React from "react";
import { Progress } from "antd";
import "./Main.css";

type ProgressBarProps = {
  num: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ num }) => {
  const percentage = Math.min((num - 1) * 20, 100);

  return (
    <div className="progress-container">
      <Progress
        percent={percentage}
        showInfo={false}
        strokeColor="hsl(240, 5%, 64.9%)"
        style={{ width: "80%" }}
      />
    </div>
  );
};

export default ProgressBar;