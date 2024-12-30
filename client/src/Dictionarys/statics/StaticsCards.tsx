import React from "react";
import useFilteredWords from "../dicComponents/midComponents/dataEffect";
import { WordsType } from "../types/wordType";

interface MainStaticsProps {
  data: Array<WordsType>;
}

const StaticsCards: React.FC<MainStaticsProps> = ({ data }) => {
  const { filteredWords } = useFilteredWords(data);

  const titles = [ "A1 - מבוא", "A2 - מתחילים", "B1 - בסיסי", "B2 - מתקדם", "C1 - מתקדם מאוד", "C2 - שפת אם", "המילים שהוספתי" ];
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
          X: totalCount ? `${((counts.X / totalCount) * 100).toFixed(2)}%` : "0%",
          V: totalCount ? `${((counts.V / totalCount) * 100).toFixed(2)}%` : "0%",
          "?": totalCount ? `${((counts["?"] / totalCount) * 100).toFixed(2)}%` : "0%",
        },
        {
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

  const renderTable = (data: any[]) => (
    <table className="w-full text-center">
      <thead>
        <tr className="text-gray-600">
          <th className="p-2" style={{ color: "red" }}>X</th>
          <th className="p-2 border-l border-gray-300" style={{ color: "green" }}>V</th>
          <th className="p-2 border-l border-gray-300" style={{ color: "blue" }}>?</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td className="p-2 text-gray-700">{row.X}</td>
            <td className="p-2 text-gray-700 border-l border-gray-300">{row.V}</td>
            <td className="p-2 text-gray-700 border-l border-gray-300">{row["?"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-4 bg-gray-50">
      {/* total card */}
      <div className="rounded shadow-sm bg-white p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">סה״כ</h2>
        {renderTable([
          { X: `${((totalCounts.X / (totalCounts.X + totalCounts.V + totalCounts["?"])) * 100).toFixed(2)}%`,
            V: `${((totalCounts.V / (totalCounts.X + totalCounts.V + totalCounts["?"])) * 100).toFixed(2)}%`,
            "?": `${((totalCounts["?"] / (totalCounts.X + totalCounts.V + totalCounts["?"])) * 100).toFixed(2)}%` },
            { X: totalCounts.X, V: totalCounts.V, "?": totalCounts["?"] }
        ])}
      </div>

      {/* levels cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {levelEnglish.map((level, index) => {
          const { dataSource } = getCountsForLevel(level);
          return (
            <div key={level} className="rounded shadow-sm bg-white p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">{titles[index]}</h3>
              {renderTable(dataSource)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaticsCards;
