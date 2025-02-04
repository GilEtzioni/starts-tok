import React, { useState } from 'react';
import { message } from 'antd';
import { CloseOutlined, CheckOutlined, QuestionOutlined } from '@ant-design/icons';
import { isExTrue, isVyTrue, isQuesttionTrue } from "../../utils/dictionaryHelper";
import { DictionaryColors, IconItem } from '../../types/DictionaryType';
import { DictionaryKnowledgeType } from '../../../../api/common/types';
import { useChangeWordKnowledge } from '../../requests/changeKnowledge';

interface MidIconsProps {
  knowledge: DictionaryKnowledgeType;
  wordId: string;
}

const MidIcons: React.FC<MidIconsProps> = ({ knowledge, wordId }) => {
  const icons: IconItem[] = [
    { id: 1, isClicked: isExTrue(knowledge), defaultColor: DictionaryColors.Gray, activeColor: DictionaryColors.Red, icon: <CloseOutlined /> },            // X button
    { id: 2, isClicked: isVyTrue(knowledge), defaultColor: DictionaryColors.Gray, activeColor: DictionaryColors.Green, icon: <CheckOutlined /> },          // V button
    { id: 3, isClicked: isQuesttionTrue(knowledge), defaultColor: DictionaryColors.Gray, activeColor: DictionaryColors.Blue, icon: <QuestionOutlined /> }, // ? button
  ];

  const [activeIcon, setActiveIcon] = useState<IconItem[]>(icons);
  const { mutate: updateWordKnowledge, isLoading, isError } = useChangeWordKnowledge();

  const handleIconsClicked = (myIcons: IconItem[], buttonIconType: number, event: React.MouseEvent<HTMLDivElement>) => {
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

    const newKnowledge = buttonIconType === 1 ? DictionaryKnowledgeType.Ex : buttonIconType === 2 ? DictionaryKnowledgeType.Vy : DictionaryKnowledgeType.QuestionMark;
    updateWordKnowledge({ id: wordId, knowledge: newKnowledge });

    message.open({
      content: "המילה עודכנה",
      duration: 2,
      icon: null,
    });
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