// react + antd
import React, { useState } from 'react';
import { CloseOutlined, CheckOutlined, QuestionOutlined } from '@ant-design/icons';

// redux
import { setVyBoolean, setExBoolean, setQuestionBoolean, addOneClick } from "../../dataDictionary/DictionarySlice";
import { useDispatch } from 'react-redux';

type IconItem = {
  id: number;
  isClicked: boolean;
  defaultColor: string;
  activeColor: string;
  icon: React.JSX.Element;
};

const icons = [
  { id: 1, isClicked: false, defaultColor: 'grey', activeColor: 'red', icon: <CloseOutlined /> },
  { id: 2, isClicked: false, defaultColor: 'grey', activeColor: 'green', icon: <CheckOutlined /> },
  { id: 3, isClicked: false, defaultColor: 'grey', activeColor: 'blue', icon: <QuestionOutlined /> },
];

const DictionaryIconsTop: React.FC = () => {
  // redux variables
  const dispatch = useDispatch();

  const [activeIcon, setActiveIcon] = useState(icons);

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
    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '8px' }}>
      {activeIcon.map(({ id, isClicked,  defaultColor, activeColor, icon }) => (
        <div
          key={id}
          onClick={() => handleIconsClicked(activeIcon, id)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          className="icon-container"
        >
          {React.cloneElement(icon, {
            style: {
              fontSize: '24px',
              color: isClicked ? activeColor : defaultColor,
              transition: 'color 0.3s',
            },
          })}
        </div>
      ))}
    </div>
  );
};

export default DictionaryIconsTop;
