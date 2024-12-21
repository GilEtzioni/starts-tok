import React from "react";
import { Progress } from "antd";
import "antd/dist/reset.css";
import "./Main.css";

type ProgressBarProps = {
  num: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ num }) => {
  const percentage = Math.min((num - 1) * 20, 100);

  return (
    <div className="progress-bar-container">
      <Progress
        percent={percentage}
        showInfo={true}
        strokeColor={{ "0%": "#108ee9" }}
        style={{ width: "80%" }}
      />
    </div>
  );
};

export default ProgressBar;