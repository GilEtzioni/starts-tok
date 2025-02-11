import React from "react";
import { Progress, Typography, Grid } from "antd";
import classNames from "classnames";

type CourseProgressBarProps = {
  num: number;
};

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ num }) => {
  const percentage = Math.min(num * 20, 100);
  const { Paragraph } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <div
      className={classNames(
        "absolute left-1/2 transform -translate-x-1/2 w-3/5",
        isMobile ? "bottom-2" : "bottom-3"
      )}
    >
      <Progress
        percent={percentage}
        strokeColor="white"
        trailColor="rgba(255, 255, 255, 0.2)"
        strokeWidth={isMobile ? 10 : 16}
        showInfo={false}
        className="w-full"
      />

      <Paragraph
        className={classNames(
          "absolute w-full text-center text-gray-500/80 mb-1 -translate-y-1/2",
          isMobile
            ? "font-medium top-[12px] text-[10px]"
            : "font-bold top-1/3 text-[12px]"
        )}
      >
        6 / {num}
      </Paragraph>
    </div>
  );
};

export default CourseProgressBar;
