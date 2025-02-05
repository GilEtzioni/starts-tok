import React from "react";
import { Progress, ConfigProvider } from "antd";
import heIL from "antd/es/locale/he_IL"; // hebrew antd

type ProgressBarProps = {
  num: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ num }) => {
  const NUMBER_OF_LESSONS = 8;
  const percentage = Math.min(((num - 1) / NUMBER_OF_LESSONS) * 100, 100);
  
  return (
    <ConfigProvider direction="rtl" locale={heIL}>
      <div className="progress-container" >
        <Progress
          percent={percentage}
          showInfo={false}
          strokeColor="hsl(240, 5%, 64.9%)"
          className="w-4/5"
        />
      </div>
    </ConfigProvider>
  );
};

export default ProgressBar;