import React, { useRef, useState, RefObject, useEffect } from 'react';
import { useLocation } from "react-router-dom"; 
import MainLayout from "../layout/MainLayout";
import MainPage from './MainPage';
import "../../index.css";
import { getTourSteps } from './LogInPage/Tour/TourRef';

const Main: React.FC = () => {
  const location = useLocation();
  const startTour = location.state?.startTour || false;
  const tourCompleted = localStorage.getItem("tourCompleted") === "true";
  
  const [open, setOpen] = useState(startTour && !tourCompleted);

  useEffect(() => {
    if (startTour && !tourCompleted) {
      setOpen(true);
    }
  }, [startTour, tourCompleted]);

  const handleTourClose = () => {
    setOpen(false);
    localStorage.setItem("tourCompleted", "true");
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const dictionaryRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLButtonElement>(null);

  const steps = getTourSteps({ cardRef, gameRef, graphRef, tableRef, pointsRef, languageRef, contactRef, dictionaryRef, homeRef });

  return (
    <div>
      <MainLayout
        pointsRef={pointsRef} 
        languageRef={languageRef} 
        contactRef={contactRef} 
        dictionaryRef={dictionaryRef} 
        homeRef={homeRef} 
        levelName='' 
        courseName='' 
        myComponent={<MainPage {...{ cardRef, gameRef, graphRef, tableRef, steps, setOpen, open }} />} 
      />
    </div>
  );
};

export default Main;