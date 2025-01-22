import React from "react";
import { Table, ConfigProvider } from "antd";
import { WordsType } from "../../../../api/common/types";
import heIL from "antd/es/locale/he_IL"; // hebrew antd

interface MainStaticsProps {
  data: WordsType[];
}

const StaticsTable: React.FC<MainStaticsProps> = ({ data }) => {
  const titles = ['סה״כ', "מבוא (A1)", "מתחילים (A2)", "בסיסי (B1)", "מתקדם (B2)", "מתקדם מאוד (C1)", "שפת אם (C2)", "המילים שהוספתי"];
  const englishLevel = ["Sum", "A1", "A2", "B1", "B2", "C1", "C2", "userWords"];

  const getCountsForLevel = (level: string) => {
    const counts = data.reduce(
      (acc, item) => {
        if (level === "Sum" || item.englishLevel === level) {
          if (item.knowledge === "X") acc.X += 1;
          if (item.knowledge === "V") acc.V += 1;
          if (item.knowledge === "?") acc["?"] += 1;
        }
        return acc;
      },
      { X: 0, V: 0, "?": 0 }
    );

    const totalCount = counts.X + counts.V + counts["?"];
    return {
      counts,
      percentage: {
        X: totalCount ? `${((counts.X / totalCount) * 100).toFixed(2)}%` : "0%",
        V: totalCount ? `${((counts.V / totalCount) * 100).toFixed(2)}%` : "0%",
        "?": totalCount ? `${((counts["?"] / totalCount) * 100).toFixed(2)}%` : "0%",
      },
    };
  };

  const tableData = englishLevel.map((level, index) => {
    const { counts, percentage } = getCountsForLevel(level);
    const totalCount = counts.X + counts.V + counts["?"];

    return {
      key: level,
      level: titles[index],
      X: `${counts.X}/${totalCount} (${percentage.X})`,
      V: `${counts.V}/${totalCount} (${percentage.V})`,
      "?": `${counts["?"]}/${totalCount} (${percentage["?"]})`,
    };
  });

  const columns = [
    {
      title: "קורס",
      dataIndex: "level",
      key: "level",
      className: "text-center ",
    },
    {
      title: <span className="text-red">X</span>,
      dataIndex: "X",
      key: "X",
      className: "text-center",
      render: (text: string) => <span className="text-black">{text}</span>,
    },
    {
      title: <span className="text-green">V</span>,
      dataIndex: "V",
      key: "V",
      className: "text-center",
      render: (text: string) => <span className="text-black">{text}</span>,
    },
    {
      title: <span className="text-blue">?</span>,
      dataIndex: "?",
      key: "?",
      className: "text-center",
      render: (text: string) => <span className="text-black">{text}</span>,
    },
  ];

  return (
    <div >
    <ConfigProvider direction="rtl" locale={heIL}>
    <Table
        columns={columns.map((col) => ({
            ...col,
            align: "center"
        }))}
        dataSource={tableData}
        pagination={false}
        bordered
        className="text-center"
        />
      </ConfigProvider>
    </div>
  );
};

export default StaticsTable;