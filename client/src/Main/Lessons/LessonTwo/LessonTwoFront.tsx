import { useGlobalClicked } from "../GlobalClickedContext";
import React, { useEffect, useState, useCallback } from "react";
import { fetchCourseData } from "../LessonsData";
import { shuffleArray, filterByOrder } from "./LessonTwoHelper";
import LessonOneCards from "./LessonTwoCards";

interface LessonTwoFrontProps {
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  order: string;
}

const LessonTwoFront: React.FC<LessonTwoFrontProps> = ({ setFinished, setError, order }) => {
  const { isClicked } = useGlobalClicked();
  const [cardsContainer, setCardsContainer] = useState<any[]>([]);
  const [germanSentence, setGermanSentence] = useState<string>("");
  const [hebrewSentence, setHebrewSentence] = useState<string>("");
  const [upperContainer, setUpperContainer] = useState<any[]>([]);
  const [midContainer, setMidContainer] = useState<any[]>([]);
  const [upperCapacity, setUpperCapacity] = useState<number>(3);
  const [combined, setCombined] = useState<string>("");

  const CARD_WIDTH = 100;
  const CONTAINER_WIDTH = 800;

  const calculateUpperCapacity = useCallback(() => {
    const maxCapacity = Math.floor(CONTAINER_WIDTH / CARD_WIDTH);
    setUpperCapacity(maxCapacity);
    setError(false);
  }, [setError]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { initialGermanWords, initialGermanSentences, initialHebrewSentences } = await fetchCourseData("A1", "Greetings");
        setCardsContainer(shuffleArray(initialGermanWords));

        const filteredHebrew = filterByOrder(initialHebrewSentences, order);
        const filteredGerman = filterByOrder(initialGermanSentences, order);

        setHebrewSentence(filteredHebrew);
        setGermanSentence(filteredGerman);

        calculateUpperCapacity();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [order, calculateUpperCapacity]);

  const logCombinedContainers = useCallback(() => {
    const newCombined = [...upperContainer, ...midContainer]
      .map(([name]) => name)
      .join(" ");
    setCombined(newCombined);
    console.log("Combined items in upper and mid containers:", newCombined);
  }, [upperContainer, midContainer]);

  const handleCardClick = (card: any, from: string) => {
    if (from === "cardsContainer") {
      if (upperContainer.length < upperCapacity) {
        setUpperContainer((prev) => [...prev, card]);
      } else {
        setMidContainer((prev) => [...prev, card]);
      }
      setCardsContainer((prev) => prev.filter(([_, id]) => id !== card[1]));
    } else if (from === "upperContainer") {
      setUpperContainer((prev) => prev.filter(([_, id]) => id !== card[1]));
      setCardsContainer((prev) => [...prev, card]);
    } else if (from === "midContainer") {
      setMidContainer((prev) => prev.filter(([_, id]) => id !== card[1]));
      setCardsContainer((prev) => [...prev, card]);
    }
    logCombinedContainers();
  };

  useEffect(() => {
    if (isClicked) {
      if (combined === germanSentence[0]) {
        // console.log("equal");
        console.log("combined in two - ", combined);
        console.log("germanSentence  in two - ", germanSentence[0]);
        setFinished(true);
      } else {
        console.log("not equal");
        console.log("combined - ", combined);
        console.log("germanSentence - ", germanSentence[0]);
        setError(true);
      }
    }
  }, [isClicked, combined, germanSentence]);

  return (
    <div style={{ textAlign: "center", color: "black" }}>
      <h1 style={{ textAlign: "center", color: "black" }}>תרגמו את המשפט</h1>
      <p style={{ color: "black" }}>{hebrewSentence}</p>

      <LessonOneCards
        upperContainer={upperContainer}
        midContainer={midContainer}
        cardsContainer={cardsContainer}
        handleCardClick={handleCardClick}
        upperCapacity={upperCapacity}
      />
    </div>
  );
};

export default LessonTwoFront;
