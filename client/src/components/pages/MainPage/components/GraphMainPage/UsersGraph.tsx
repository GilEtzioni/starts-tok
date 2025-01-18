import React from 'react';
import { Row, Typography } from 'antd';
import { useFetchOneDayUserData } from '../../api/fetchingUserData';
import { fillMissingWeekDays } from '../TableMainPage/userTableHelper';
import { weekPointsType } from '../../../../../types/types';

const UsersGraph: React.FC = () => {
  const { data: weekScore, isLoading, error } = useFetchOneDayUserData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !weekScore) {
    return <div>Error loading data.</div>;
  }

  const pointsArray: weekPointsType[] = fillMissingWeekDays(weekScore) ?? [];
  const width = 650;
  const height = 380;
  const padding = 30;

  const maxValue = Math.ceil(Math.max(...pointsArray.map((d) => d.points)) / 15) * 15;

  const points = pointsArray.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (pointsArray.length - 1);
    const y = height - padding - (d.points / maxValue) * (height - 2 * padding);
    return { x, y };
  });

  const linePath = points
    .map((point, i) => (i === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`))
    .join(' ');

  const { Title } = Typography;

  return (
    <div className="flex flex-col items-end">
      <Row className="mt-2 mr-18 flex justify-end">
        <Title level={3} className="font-hebrew text-right"> הניקוד השבועי שלי </Title>
      </Row>
      <div className="w-[660px] bg-white flex justify-center items-center">
        <svg
          width={width}
          height={height}
          className="text-black"
        >
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            className="stroke-gray-800 stroke-2"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            className="stroke-gray-800 stroke-2"
          />

          {[1 / 3, 2 / 3, 1].map((fraction, index) => {
            const value = Math.floor(fraction * maxValue);
            const y = height - padding - (value / maxValue) * (height - 2 * padding);

            return (
              <g key={index}>
                <text
                  x={padding - 10}
                  y={y + 5}
                  textAnchor="end"
                  className="text-gray-600 text-sm"
                >
                  {value}
                </text>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  className="stroke-gray-300 stroke-dasharray-4-4"
                />
              </g>
            );
          })}

          {pointsArray.map((d, i) => (
            <text
              key={d.date}
              x={padding + (i * (width - 2 * padding)) / (pointsArray.length - 1)}
              y={height - padding + 20}
              textAnchor="middle"
              className="text-gray-600 text-sm"
            >
              {d.day}
            </text>
          ))}

          <path
            d={linePath}
            fill="none"
            className="stroke-[hsl(213.1,93.9%,67.8%)]"
            strokeWidth="3" 
          />

          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="5"
              className="fill-blue-500"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default UsersGraph;
