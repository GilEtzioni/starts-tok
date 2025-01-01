import React from 'react';
import { Button } from 'antd';
import { hangmanType } from '../types/hangmanType';

interface GridButtonProps {
  gameArray: Array<hangmanType>
  lettersArray: Array<hangmanType>;
}

const GridButton: React.FC<GridButtonProps> = ({ lettersArray ,gameArray}) => {

    return (
    <div>
        {lettersArray.reverse().map((item) => (
            item.selected === false ? 
            (<Button style={{ background: 'red'}} key={item.letter}> {item.letter} </Button>) : 
            (<Button style={{ background: 'green'}} key={item.letter}> {item.letter} </Button>)
        ))}
    </div>
    );
}
export default GridButton;