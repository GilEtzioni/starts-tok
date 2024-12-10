import React from 'react';

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

  // Chart dimensions
  const width = 500;
  const height = 300;
  const padding = 50;

  // Get the max value for scaling
  const maxValue = Math.ceil(Math.max(...data.map((d) => d.value)) / 15) * 15;

  // Map data to SVG coordinates
  const points = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d.value / maxValue) * (height - 2 * padding);
    return { x, y };
  });

  // Create the line path
  const linePath = points
    .map((point, i) => (i === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`))
    .join(' ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      {/* Title */}
      <h1 style={{ textAlign: 'right', direction: 'rtl', marginBottom: '20px' }}>
        סטטיסטיקה שבועית
      </h1>

      {/* Chart Container */}
      <div
        style={{
          width: width + 'px',
          border: '1px solid hsl(240, 5%, 64.9%)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '10px',
          background: '#fff',

        }}
      >
        <svg width={width} height={height}>
          {/* X and Y axes */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#000"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#000"
          />

          {/* Y-axis labels and grid lines */}
          {Array.from({ length: maxValue / 15 + 1 }).map((_, i) => {
            const value = i * 15;
            const y = height - padding - (value / maxValue) * (height - 2 * padding);

            return (
              <g key={value}>
                {/* Label */}
                <text x={padding - 10} y={y + 5} textAnchor="end" fontSize="12">
                  {value}
                </text>
                {/* Grid line */}
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="hsl(240, 5%, 64.9%)"
                  strokeDasharray="5,5"
                />
              </g>
            );
          })}

          {/* X-axis labels */}
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

          {/* Line */}
          <path d={linePath} fill="none" stroke="hsl(240, 5%, 64.9%)" strokeWidth="2" />

          {/* Points */}
          {points.map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r="5" fill="hsl(240, 3.7%, 15.9%)" />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default LineChart;
