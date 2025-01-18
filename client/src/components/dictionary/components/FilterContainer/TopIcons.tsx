import React, { useState } from 'react';
import { CloseOutlined, CheckOutlined, QuestionOutlined } from '@ant-design/icons';
import { DictionaryColors, IconItem } from '../../types/DictionaryType';

// redux
import { setVyBoolean, setExBoolean, setQuestionBoolean, addOneClick } from "../../slices/DictionarySlice";
import { useDispatch } from 'react-redux';

const icons = [
  { id: 1, isClicked: false, defaultColor: DictionaryColors.Gray, activeColor: DictionaryColors.Red, icon: <CloseOutlined /> },
  { id: 2, isClicked: false, defaultColor: DictionaryColors.Gray, activeColor: DictionaryColors.Green, icon: <CheckOutlined /> },
  { id: 3, isClicked: false, defaultColor: DictionaryColors.Gray, activeColor: DictionaryColors.Blue, icon: <QuestionOutlined /> },
];

const DictionaryIconsTop: React.FC = () => {
  // redux variables
  const dispatch = useDispatch();

  const [activeIcon, setActiveIcon] = useState<IconItem[]>(icons);

  function handleIconsClicked(myIcons: IconItem[], myId: number) {
    const updatedIcons = myIcons.map((iconTupple) => {
      if (iconTupple.id === myId) {
        const prev = iconTupple.isClicked;
        const updatedIcon = { ...iconTupple, isClicked: !prev }; 

        if (myId === 1) {
          dispatch(setExBoolean(!prev));
        }
        else if (myId === 2) {
          dispatch(setVyBoolean(!prev));
        }
        else if (myId === 3) {
          dispatch(setQuestionBoolean(!prev));
        }
        return updatedIcon;
      }
      return iconTupple;
    });
  
    dispatch(addOneClick());
    setActiveIcon(updatedIcons);
  }


  return (
    <div className="flex items-center gap-2">
      {activeIcon.map(({ id, isClicked,  defaultColor, activeColor, icon }) => (
      <div key={id} onClick={() => handleIconsClicked(activeIcon, id)} className="flex justify-center items-center w-9 h-9 rounded-full cursor-pointer transition-colors hover:bg-gray-200"  >
        {React.cloneElement(icon, {style: { fontSize: '24px', color: isClicked ? activeColor : defaultColor, transition: 'color 0.3s'},
        })}
      </div>
      ))}
    </div>
  );
};

export default DictionaryIconsTop;
