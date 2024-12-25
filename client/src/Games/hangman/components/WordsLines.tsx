import React from 'react'

interface WordsLinesProps {
  lettersArray: Array<[string, boolean]>;
}

const WordsLines: React.FC<WordsLinesProps> = ({ lettersArray }) => {

  return (
    <div>
      {lettersArray.map((item, index) => (
        <span key={index} style={{ marginRight: "5px" }}>
          {item[1] === true ? item[0] : "_"}
        </span>
      ))}
    </div>
  );
}  

export default WordsLines;
