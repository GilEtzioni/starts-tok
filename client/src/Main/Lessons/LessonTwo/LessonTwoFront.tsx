import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setRunning,
  setSuccess,
  setFailure,
  resetOrder,
  addOneOrder,
  changeOrder,
  resetClicks,
  addOneClick,
} from "../../LessonsSlice";
import { RootState } from "../../../app/store";
import { fetchCourseData } from "../LessonsData";
import { shuffleArray, filterByOrder } from "./LessonTwoHelper";
import LessonOneCards from "./LessonTwoCards";
import { Row } from 'antd';

// import LessonTwoObject from "./LessonTwoObject";

interface LessonTwoCardsProps {
  levelName: string,
  courseName: string,
  completedLessons: number,
}

const LessonTwoFront: React.FC<LessonTwoCardsProps> = ({levelName, courseName, completedLessons}) => {
  const status = useSelector((state: RootState) => state.lessons.status);
  const order = useSelector((state: RootState) => state.lessons.order);
  const clicks = useSelector((state: RootState) => state.lessons.clicks);
  const dispatch = useDispatch();

  const [cardsContainer, setCardsContainer] = useState<any[]>([]);
  const [germanSentence, setGermanSentence] = useState<string>("");
  const [hebrewSentence, setHebrewSentence] = useState<string>("");
  const [upperContainer, setUpperContainer] = useState<any[]>([]);
  const [midContainer, setMidContainer] = useState<any[]>([]);
  const [upperCapacity, setUpperCapacity] = useState<number>(3);
  const [combined, setCombined] = useState<string>("");
  const [germanWords, setGermanWords] = useState<any[]>([]);
  const [hebrewWords, setHebrewWords] = useState<any[]>([]);

  const CARD_WIDTH = 100;
  const CONTAINER_WIDTH = 800;

  const calculateUpperCapacity = useCallback(() => {
    const maxCapacity = Math.floor(CONTAINER_WIDTH / CARD_WIDTH);
    setUpperCapacity(maxCapacity);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { initialGermanWords, initialHebrewWords, initialGermanSentences, initialHebrewSentences } =
          await fetchCourseData(levelName, courseName, completedLessons);
        setCardsContainer(shuffleArray(initialGermanWords));

        console.log(initialGermanWords);
        console.log(initialHebrewWords);
        setGermanWords(initialGermanWords);
        setHebrewWords(initialHebrewWords);

        const filteredHebrew = filterByOrder(initialHebrewSentences, order);
        const filteredGerman = filterByOrder(initialGermanSentences, order);

        console.log(filteredHebrew);
        console.log(filteredGerman);

        setHebrewSentence(filteredHebrew);
        setGermanSentence(filteredGerman);

        calculateUpperCapacity();
      } catch (error) {
        console.error("error fetch data:", error);
      }
    };
    fetchData();
    console.log("in second", status);
  }, [order, dispatch, calculateUpperCapacity]);

  // recalculate combined string
  useEffect(() => {
    const newCombined = [...upperContainer, ...midContainer]
      .map(([name]) => name)
      .join(" ");
    setCombined(newCombined);
    console.log("Combined items in upper and mid containers:", combined);
  }, [upperContainer, midContainer]);

  const handleCardClick = (card: any, from: string) => {
    if (from === "cardsContainer" && (status !== "failure" && status !== "success") ) {
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
  };

  useEffect(() => {
    if (combined === "" && clicks === 1) {
      dispatch(resetClicks());
      console.log("do nothing in 2")
    }
    else if (combined === germanSentence && clicks === 1) {
      console.log("equal in two");
      dispatch(setSuccess());
    } else if (clicks === 1) {
      console.log("not equal in two");
      dispatch(setFailure());
    }
  }, [dispatch, clicks, combined, germanSentence]);

  return (
    <div style={{ textAlign: "center", color: "black" }}>
      {/* 
      <LessonTwoObject 
      germanWords={germanWords}
      hebrewWords={hebrewWords}
      germanSentence={germanSentence}
      />
      */}

    <Row justify="center" style={{ marginBottom: '0px' }}>
        <h1 style={{ textAlign: 'center' }}> תרגמו את המשפט </h1>
    </Row>

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
