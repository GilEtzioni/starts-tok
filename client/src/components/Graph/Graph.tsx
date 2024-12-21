import React from 'react';
import "./Graph.css";

const LineChart: React.FC = () => {
  const data = [
    { month: 'ראשון', value: 0 },
    { month: 'שני', value: 30 },
    { month: 'שלישי', value: 30 },
    { month: 'רביעי', value: 35 },
    { month: 'חמישי', value: 30 },
    { month: 'שישי', value: 25 },
    { month: 'שבת', value: 40 },
  ];

  const width = 500;
  const height = 300;
  const padding = 50;

  const maxValue = Math.ceil(Math.max(...data.map((d) => d.value)) / 15) * 15;

  const points = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d.value / maxValue) * (height - 2 * padding);
    return { x, y };
  });

  const linePath = points
    .map((point, i) => (i === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`))
    .join(' ');

  return (
    <div className="line-chart-container">
      <h1 className="chart-title">סטטיסטיקה שבועית</h1>
      <div className="chart-wrapper">
        <svg width={width} height={height}>
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#000" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#000" />

          {Array.from({ length: maxValue / 15 + 1 }).map((_, i) => {
            const value = i * 15;
            const y = height - padding - (value / maxValue) * (height - 2 * padding);

            return (
              <g key={value}>
                <text x={padding - 10} y={y + 5} textAnchor="end" fontSize="12">
                  {value}
                </text>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="hsl(240, 5%, 64.9%)" strokeDasharray="5,5" />
              </g>
            );
          })}

          {data.map((d, i) => (
            <text
              key={d.month + i}
              x={padding + (i * (width - 2 * padding)) / (data.length - 1)}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
            >
              {d.month}
            </text>
          ))}

          <path d={linePath} fill="none" stroke="hsl(240, 5%, 64.9%)" strokeWidth="2" />
          {points.map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r="5" fill="hsl(240, 3.7%, 15.9%)" />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default LineChart;