import React from 'react';

// images
import image1 from '../images/hangman1.png';
import image2 from '../images/hangman2.png';
import image3 from '../images/hangman3.png';
import image4 from '../images/hangman4.png';
import image5 from '../images/hangman5.png';
import image6 from '../images/hangman6.png';

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../../../app/store";

const PhotosHang: React.FC = () => {

  const wrongCounter = useSelector((state: RootState) => state.hangman.wrongCounter);

  const imageMap: { [key: number]: string } = {
    0: image1,
    1: image2,
    2: image3,
    3: image4,
    4: image5,
    5: image6,
  };

  const currImage = imageMap[wrongCounter] || image6;

  return (
    <div>
      <img src={currImage} alt="Hangman" className="max-w-full h-auto" />
    </div>
  );
};

export default PhotosHang;
