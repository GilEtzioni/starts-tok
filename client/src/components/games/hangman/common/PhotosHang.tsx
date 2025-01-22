import React from 'react';
import { Image } from 'antd';

// images
import image0 from "../images/hangman0.png"
import image1 from '../images/hangman1.png';
import image2 from '../images/hangman2.png';
import image3 from '../images/hangman3.png';
import image4 from '../images/hangman4.png';
import image5 from '../images/hangman5.png';
import image6 from '../images/hangman6.png';

// redux
import { useSelector } from 'react-redux';
import { RootState } from "../../../../app/store";

const PhotosHang: React.FC = () => {

  const wrongCounter = useSelector((state: RootState) => state.hangman.wrongLettersCounter);

  const imageMap: { [key: number]: string } = {
    0: image0,
    1: image1,
    2: image2,
    3: image3,
    4: image4,
    5: image5,
  };

  const currImage = imageMap[wrongCounter] || image6;

  return (
    <div>
      <Image src={currImage} alt="Hangman"/>
    </div>
  );
};

export default PhotosHang;
