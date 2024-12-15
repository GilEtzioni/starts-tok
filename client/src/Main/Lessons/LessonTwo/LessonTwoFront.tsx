import React, { useEffect, useState, useCallback } from 'react';
import { Card } from 'antd';

import { fetchCourseData } from "../MainClass";


// shuffle an array
const shuffleArray = (array: any[]) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export default function LessonTwoFront() {
  const [cardsContainer, setCardsContainer] = useState<any[]>([]);
  const [upperContainer, setUpperContainer] = useState<any[]>([]);
  const [midContainer, setMidContainer] = useState<any[]>([]);
  const [upperCapacity, setUpperCapacity] = useState<number>(3);
  const sentence = "לבן ירוק שחור";

  const CARD_WIDTH = 100;
  const CONTAINER_WIDTH = 800;

  // calculate capacity of the upper container
  const calculateUpperCapacity = useCallback(() => {
    const maxCapacity = Math.floor(CONTAINER_WIDTH / CARD_WIDTH);
    setUpperCapacity(maxCapacity);
  }, []);

  // reload the data when the file is opened
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { initialGerman } = await fetchCourseData('A1', 'Colors');
        setCardsContainer(shuffleArray(initialGerman));
        calculateUpperCapacity();
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchData();
  }, [calculateUpperCapacity]);

  let combined = "";
  // log combined items in upperContainer and midContainer as a string
  const logCombinedContainers = useCallback(() => {
    combined = [...upperContainer, ...midContainer].map(([name]) => name).join(" ");
    console.log('Combined items in upper and mid containers:', combined);
  }, [upperContainer, midContainer]);

  // move the cards between containers
  const handleCardClick = (card: any, from: string) => {
    if (from === "cardsContainer") {
      // cards-container --> upper/mid-container
      if (upperContainer.length < upperCapacity) {
        setUpperContainer((prev) => [...prev, card]);
      } else {
        setMidContainer((prev) => [...prev, card]);
      }
      setCardsContainer((prev) => prev.filter(([_, id]) => id !== card[1]));
    } else if (from === "upperContainer") {
      // upper-container --> mid-container
      setUpperContainer((prev) => prev.filter(([_, id]) => id !== card[1]));
      setCardsContainer((prev) => [...prev, card]);
    } else if (from === "midContainer") {
      // mid-container --> cards-container
      setMidContainer((prev) => prev.filter(([_, id]) => id !== card[1]));
      setCardsContainer((prev) => [...prev, card]);
    }
    logCombinedContainers(); // log updated combined items
  };


  useEffect(() => {
    const handleNext = async () => {
        if (combined === sentence) {
            console.log("equal");
        }
        else {
            console.log("not equal");
        }
    };
    handleNext();
    }, []);

  return (
    <div style={{ textAlign: 'center', color: 'black' }}>
      <h1 style={{ textAlign: 'right', color: 'black' }}>תרגמו את המשפט</h1>
      <p style={{ color: 'black' }}> {sentence} </p>

      {/* Upper container */}
      <div
        className="upper-container"
        style={{
          position: 'relative',
          width: '80%',
          height: '50px',
          // backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '10px',
          margin: '20px auto 15px',
        }}
      >
        {upperContainer.map(([name, id, status], index) => (
          <React.Fragment key={id}>
            <Card
              onClick={() => handleCardClick([name, id, status], "upperContainer")}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid hsl(240, 5%, 64.9%)',
                borderRadius: '8px',
                height: '40px',
                padding: '0 16px',
                margin: '5px',
                backgroundColor: 'white',
                color: 'black',
              }}
            >
              {name}
            </Card>
          </React.Fragment>
        ))}
      </div>

      {/* First line */}
      <div
        className="first-line"
        style={{
          height: '1px',
          backgroundColor: 'grey',
          width: '80%',
          margin: '15px auto',
        }}
      />

      {/* Mid container */}
      <div
        className="mid-container"
        style={{
          position: 'relative',
          width: '80%',
          height: '50px',
          // backgroundColor: 'orange',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '10px',
          margin: '15px auto 20px',
        }}
      >
        {midContainer.map(([name, id, status], index) => (
          <React.Fragment key={id}>
            <Card
              onClick={() => handleCardClick([name, id, status], "midContainer")}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid hsl(240, 5%, 64.9%)',
                borderRadius: '8px',
                height: '40px',
                padding: '0 16px',
                margin: '5px',
                backgroundColor: 'white',
                color: 'black',
              }}
            >
              {name}
            </Card>
          </React.Fragment>
        ))}
      </div>

      {/* Second line */}
      <div
        className="second-line"
        style={{
          height: '1px',
          backgroundColor: 'grey',
          width: '80%',
          margin: '20px auto',
        }}
      />

      {/* Cards container */}
      <div
        className="cards-container"
        style={{
          width: '80%',
          // backgroundColor: 'green',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '10px',
          margin: '40px auto',
        }}
      >
        {cardsContainer.map(([name, id, status], index) => (
          <React.Fragment key={id}>
            <Card
              onClick={() => handleCardClick([name, id, status], "cardsContainer")}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid hsl(240, 5%, 64.9%)',
                borderRadius: '8px',
                height: '40px',
                padding: '0 16px',
                margin: '5px',
                backgroundColor: 'white',
                color: 'black',
              }}
            >
              {name}
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
