import React, { useState } from 'react';
import { CloseOutlined, CheckOutlined, QuestionOutlined } from '@ant-design/icons';
import { isExTrue, isVyTrue, isQuesttionTrue } from '../HelpingFunctionsDictionary';
import { usePatchItem } from '../../dataDictionary/patchAxios';

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

  const handleIconsClicked = ( myIcons: IconItem[], buttonIconType: number, event: React.MouseEvent<HTMLDivElement> ) => {
    event.stopPropagation(); // prevent the row click

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
    <div className="flex justify-start items-center gap-2">
      {activeIcon.map(({ id, isClicked, defaultColor, activeColor, icon }) => (
        <div 
          className="flex justify-center items-center w-9 h-9 rounded-full cursor-pointer transition-colors duration-300"
          key={id}
          onClick={(event) => handleIconsClicked(activeIcon, id, event)}
        >
          {React.cloneElement(icon, { style: { fontSize: '24px', color: isClicked ? activeColor : defaultColor, transition: 'color 0.3s'}})}
        </div>
      ))}
    </div>
  );
};

export default MidIcons;
