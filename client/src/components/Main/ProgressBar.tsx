import React from "react";
import { Progress } from "antd"; 
import "antd/dist/reset.css"; 

type ProgressBarProps = {
  num: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ num }) => {
  const percentage = Math.min((num-1) * 20, 100); // calculate percentage based on `num`

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      <Progress
        percent={percentage}
        showInfo={true} 
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        style={{ width: "80%" }}
      />
    </div>
  );
};

export default ProgressBar;
