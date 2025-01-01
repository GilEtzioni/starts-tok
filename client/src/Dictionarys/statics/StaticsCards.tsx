import React from "react";
import { Table } from "antd";
import useFilteredWords from "../dicComponents/midComponents/dataEffect";
import { WordsType } from "../types/wordType";

interface MainStaticsProps {
  data: Array<WordsType>;
}

const StaticsCards: React.FC<MainStaticsProps> = ({ data }) => {
  const { filteredWords } = useFilteredWords(data);

  const titles = ["A1 - מבוא", "A2 - מתחילים", "B1 - בסיסי", "B2 - מתקדם", "C1 - מתקדם מאוד", "C2 - שפת אם", "המילים שהוספתי"];
  const levelEnglish = ["A1", "A2", "B1", "B2", "C1", "C2", "userWords"];

  const getCountsForLevel = (level: string) => {
    const counts = filteredWords.reduce(
      (acc, item) => {
        if (item.levelEnglish === level) {
          if (item.knowlage === "X") acc.X += 1;
          if (item.knowlage === "V") acc.V += 1;
          if (item.knowlage === "?") acc["?"] += 1;
        }
        return acc;
      },
      { X: 0, V: 0, "?": 0 }
    );

    const totalCount = counts.X + counts.V + counts["?"];
    return {
      counts,
      dataSource: [
        {
          key: "1",
          X: totalCount ? `${((counts.X / totalCount) * 100).toFixed(2)}%` : "0%",
          V: totalCount ? `${((counts.V / totalCount) * 100).toFixed(2)}%` : "0%",
          "?": totalCount ? `${((counts["?"] / totalCount) * 100).toFixed(2)}%` : "0%",
        },
        {
          key: "2",
          X: `${counts.X}/${totalCount}`,
          V: `${counts.V}/${totalCount}`,
          "?": `${counts["?"]}/${totalCount}`,
        },
      ],
    };
  };

  const totalCounts = levelEnglish.reduce(
    (total, level) => {
      const { counts } = getCountsForLevel(level);
      total.X += counts.X;
      total.V += counts.V;
      total["?"] += counts["?"];
      return total;
    },
    { X: 0, V: 0, "?": 0 }
  );

  const columns = [
    {
      title: <span style={{ color: "red" }}>X</span>,
      dataIndex: "X",
      key: "X",
      render: (text: string) => <span style={{ color: "black" }}>{text}</span>,
    },
    {
      title: <span style={{ color: "green" }}>V</span>,
      dataIndex: "V",
      key: "V",
      render: (text: string) => <span style={{ color: "black" }}>{text}</span>,
    },
    {
      title: <span style={{ color: "blue" }}>?</span>,
      dataIndex: "?",
      key: "?",
      render: (text: string) => <span style={{ color: "black" }}>{text}</span>,
    },
  ];

  return (
    <div className="p-4 bg-gray-50">
      {/* total card */}
      <div className="rounded shadow-sm bg-white p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">סה״כ</h2>
        <Table
          columns={columns}
          dataSource={[
            {
              key: "1",
              X: `${((totalCounts.X / (totalCounts.X + totalCounts.V + totalCounts["?"])) * 100).toFixed(2)}%`,
              V: `${((totalCounts.V / (totalCounts.X + totalCounts.V + totalCounts["?"])) * 100).toFixed(2)}%`,
              "?": `${((totalCounts["?"] / (totalCounts.X + totalCounts.V + totalCounts["?"])) * 100).toFixed(2)}%`,
            },
            {
              key: "2",
              X: totalCounts.X,
              V: totalCounts.V,
              "?": totalCounts["?"],
            },
          ]}
          pagination={false}
          bordered
        />
      </div>

      {/* levels cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {levelEnglish.map((level, index) => {
          const { dataSource } = getCountsForLevel(level);
          return (
            <div key={level} className="rounded shadow-sm bg-white p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">{titles[index]}</h3>
              <Table columns={columns} dataSource={dataSource} pagination={false} bordered />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaticsCards;
