import React, { useState } from 'react';
import { CloseOutlined, CheckOutlined, QuestionOutlined } from '@ant-design/icons';
import "./Mid.css";

// Icons status
import { isExTrue, isVyTrue, isQuesttionTrue } from '../HelpingFunctionsDictionary';

// Patch
import usePatchItem from '../../dataDictionary/patchAxios';

type IconItem = {
  id: number;
  isClicked: boolean;
  defaultColor: string;
  activeColor: string;
  icon: React.JSX.Element;
};

interface MidIconsProps {
  knowlage: string;
  id: number;
}

const MidIcons: React.FC<MidIconsProps> = ({ knowlage, id }) => {
  const icons: IconItem[] = [
    { id: 1, isClicked: isExTrue(knowlage), defaultColor: 'grey', activeColor: 'red', icon: <CloseOutlined /> },            // X button
    { id: 2, isClicked: isVyTrue(knowlage), defaultColor: 'grey', activeColor: 'green', icon: <CheckOutlined /> },          // V button
    { id: 3, isClicked: isQuesttionTrue(knowlage), defaultColor: 'grey', activeColor: 'blue', icon: <QuestionOutlined /> }, // ? button
  ];

  const [activeIcon, setActiveIcon] = useState<IconItem[]>(icons);
  const { mutate: updateItem } = usePatchItem();

  // ButtonIconType: {1 = X, 2 = V, 3 = ?}
  const handleIconsClicked = ( myIcons: IconItem[], buttonIconType: number, event: React.MouseEvent<HTMLDivElement> ) => {
    event.stopPropagation(); // prevent the row click h

    const updatedIcons = myIcons.map((iconTupple) => {
      if (iconTupple.id === buttonIconType) {
        // set isClicked 
        return { ...iconTupple, isClicked: true };
      }
      // reset isClicked to false for other icons
      return { ...iconTupple, isClicked: false };
    });

    setActiveIcon(updatedIcons); 

    const newKnowlage = buttonIconType === 1 ? 'X' : buttonIconType === 2 ? 'V' : '?';
    updateItem({ id, knowlage: newKnowlage });
  };

  return (
    <div className='icon-main-container'>
      {activeIcon.map(({ id, isClicked, defaultColor, activeColor, icon }) => (
        <div
          key={id}
          onClick={(event) => handleIconsClicked(activeIcon, id, event)}
          className="icon-container"
        >
          {React.cloneElement(icon, { style: { fontSize: '24px', color: isClicked ? activeColor : defaultColor, transition: 'color 0.3s'}})}
        </div>
      ))}
    </div>
  );
};

export default MidIcons;
