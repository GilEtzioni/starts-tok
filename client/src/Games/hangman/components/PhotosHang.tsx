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

  // redux
  const wrongCounter = useSelector((state: RootState) => state.hangman.wrongCounter);

  const currImage = (): string => {
    switch (wrongCounter) {
      case 0:
        return image1;
      case 1:
        return image2;
      case 2:
        return image3;
      case 3:
        return image4;
      case 4:
        return image5;
      case 5:
        return image6;
      default:
        return image6;
    }
  };
  
  return (
    <div>
      <img src={currImage()} alt="Hangman" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}

export default PhotosHang;
