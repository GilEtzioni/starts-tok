import { useGlobalClicked } from "../GlobalClickedContext";
import React, { useEffect, useState, useCallback } from "react";
import { Card } from "antd";
import { fetchCourseData } from "../LessonsData";

interface LessonTwoFrontProps {
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

// Shuffle an array
const shuffleArray = (array: any[]) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const LessonTwoFront: React.FC<LessonTwoFrontProps> = ({ setFinished, setError }) => {
  const { isClicked } = useGlobalClicked();
  const [cardsContainer, setCardsContainer] = useState<any[]>([]);
  const [upperContainer, setUpperContainer] = useState<any[]>([]);
  const [midContainer, setMidContainer] = useState<any[]>([]);
  const [upperCapacity, setUpperCapacity] = useState<number>(3);
  const sentence = "לבן ירוק שחור";
  const [combined, setCombined] = useState("");

  const CARD_WIDTH = 100;
  const CONTAINER_WIDTH = 800;

  // Calculate capacity of the upper container
  const calculateUpperCapacity = useCallback(() => {
    const maxCapacity = Math.floor(CONTAINER_WIDTH / CARD_WIDTH);
    setUpperCapacity(maxCapacity);
    setError(false);
  }, [setError]);

  // Fetch data when the component is mounted
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

  // Log combined items in upperContainer and midContainer as a string
  const logCombinedContainers = useCallback(() => {
    const newCombined = [...upperContainer, ...midContainer]
      .map(([name]) => name)
      .join(" ");
    setCombined(newCombined);
    console.log('Combined items in upper and mid containers:', newCombined);
  }, [upperContainer, midContainer]);

  // Move the cards between containers
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

  // Check if combined matches the sentence when isClicked is true
  useEffect(() => {
    if (isClicked) {
      if (combined === sentence) {
        console.log("equal");
        setFinished(true);
      } else {
        console.log("not equal");
        setError(true);
      }
    }
  }, [isClicked, combined, sentence, setFinished, setError]);

  return (
    <div style={{ textAlign: 'center', color: 'black' }}>
      <h1 style={{ textAlign: 'right', color: 'black' }}>תרגמו את המשפט</h1>
      <p style={{ color: 'black' }}>{sentence}</p>

      {/* Upper container */}
      <div
        className="upper-container"
        style={{
          position: 'relative',
          width: '80%',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '10px',
          margin: '20px auto 15px',
        }}
      >
        {upperContainer.map(([name, id, status], index) => (
          <Card
            key={id}
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
        ))}
      </div>

      {/* Mid container */}
      <div
        className="mid-container"
        style={{
          position: 'relative',
          width: '80%',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '10px',
          margin: '15px auto 20px',
        }}
      >
        {midContainer.map(([name, id, status], index) => (
          <Card
            key={id}
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
        ))}
      </div>

      {/* Cards container */}
      <div
        className="cards-container"
        style={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '10px',
          margin: '40px auto',
        }}
      >
        {cardsContainer.map(([name, id, status], index) => (
          <Card
            key={id}
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
        ))}
      </div>
    </div>
  );
};

export default LessonTwoFront;
