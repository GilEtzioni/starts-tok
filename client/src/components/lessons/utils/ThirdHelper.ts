export const splitTheSentence = (foreignSentence: string, foreignWord: string) => {
  let firstPart = "";
  let secondPart = "";
  const wordLength = foreignWord.length;

  for (let i = 0; i <= foreignSentence.length - wordLength; i++) {
      const currentWord = foreignSentence.substring(i, i + wordLength).toLocaleLowerCase();
      if (currentWord === foreignWord.toLocaleLowerCase()) {
          firstPart = foreignSentence.substring(0, i).trim();
          secondPart = foreignSentence.substring(i + wordLength).trim();
          break; // exit when the word is found
      }
  }

  return {
      firstPart,
      secondPart,
  };
};