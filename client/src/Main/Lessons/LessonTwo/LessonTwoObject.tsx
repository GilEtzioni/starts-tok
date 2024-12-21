import React from 'react';

interface LessonTwoFrontProps {
  germanWords: Array<[string, string, string]>; // [word, id, status]
  hebrewWords: Array<[string, string, string]>; // [word, id, status]
  germanSentence: string; 
}

const LessonTwoObject: React.FC<LessonTwoFrontProps> = ({
  germanWords,
  hebrewWords,
  germanSentence,
}) => {
  // clean the sentence and splits it into words
  const cleanAndSplitSentence = (sentence: string): string[] => {
    return sentence
      .replace(/[.,?/;:]/g, '') // remove special characters
      .split(' ')               // add spaces
      .filter(Boolean);         // remove empty strings
  };

  // match sentence words with German and Hebrew words
  const sentenceWordsArray = (
    germanSentence: string,
    germanWords: Array<[string, string, string]>,
    hebrewWords: Array<[string, string, string]>
  ): Array<[number, string, string]> => {
    const cleanWords = cleanAndSplitSentence(germanSentence);

    // match words with IDs and their translations
    return cleanWords.map((word, index) => {
      // Find the matching german word object
      const germanWord = germanWords.find(([german]) => german === word);

      if (germanWord) {
        const wordId = germanWord[1];
        const hebrewWord = hebrewWords.find(([_, id]) => id === wordId);

        return [index + 1, word, hebrewWord ? hebrewWord[0] : ''];
      } else {
        return [index + 1, word, ''];
      }
    });
  };

  // generate sentence words array
  const result = sentenceWordsArray(germanSentence, germanWords, hebrewWords);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Lesson Two Object</h3>
      <p>German Sentence: {germanSentence}</p>
      <ul>
        {result.map(([index, germanWord, hebrewWord]) => (
          <li key={index}>
            {index}. {germanWord} - {hebrewWord}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonTwoObject;
