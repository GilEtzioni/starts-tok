// Filter data by order
export const filterByOrder = (data: any[], order: string) => {
    if (order === "third") {
      return data[0][0]; // only the sentence of the first item
    }
    if (order === "sith") {
      return data[1][0]; // only the sentence of the second item
    }
    return data; // return all items
  };
  
  // Split the sentence into parts, excluding the missing word
  export const splitTheSentence = (sentence: string, word: string) => {
    const cleanedSentence = sentence.replace(/[.,!?;:()'"-]/g, "");
    const cleanedWord = word.replace(/[.,!?;:()'"-]/g, "");
    const arrayWords = cleanedSentence.split(" ");
    let foundWord = -1;
  
    for (let i = 0; i < arrayWords.length; i++) {
      if (arrayWords[i].toLowerCase() === cleanedWord.toLowerCase()) {
        foundWord = i;
        break;
      }
    }
  
    if (foundWord === -1) {
      return {
        firstArrayPart: cleanedSentence,
        secondArrayPart: "",
      };
    }
  
    const firstArrayPart = arrayWords.slice(0, foundWord).join(" ");
    const secondArrayPart = arrayWords.slice(foundWord + 1).join(" ");
  
    return {
      firstArrayPart,
      secondArrayPart,
    };
  };
  