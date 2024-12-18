import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { WordsType } from "./types/wordType";

// fetch
const fetchItems = async (): Promise<WordsType[]> => {
  const { data } = await axiosInstance.get("/dictionary");
  return data;
};

const DictionaryList: React.FC = () => {
  const { data: items, isLoading, error } = useQuery(["dictionary"], fetchItems);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]); // Tracks selected levels

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level) // Remove level if already selected
        : [...prev, level] // Add level if not selected
    );
  };


  // Filter items based on selected levels
  const filteredItems = items?.filter((item) =>
    selectedLevels.length === 0 || selectedLevels.includes(item.level_english)
  );

  return (
    <div>
      <h1>Dictionary Items</h1>

      {/* Buttons for levels */}
      <div>
        {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
          <button
            key={level}
            onClick={() => toggleLevel(level)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedLevels.includes(level) ? "lightblue" : "white",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Display filtered items */}
      <ul>
        {filteredItems?.map((item) => (
          <li key={item.id}>
            <p>
              <strong>Hebrew Word:</strong> {item.HebrewWord} <br />
              <strong>German Word:</strong> {item.GermanWord}
            </p>
            <p>
              <strong>Course Name:</strong> {item.course_name_english} <br />
              <strong>Knowledge Level:</strong> {item.knowlage}
            </p>
            <p>
              <strong>Level (Hebrew):</strong> {item.level_hebrew} <br />
              <strong>Level (English):</strong> {item.level_english}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DictionaryList;
