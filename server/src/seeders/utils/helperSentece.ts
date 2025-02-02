import { db } from "../../drizzle/db";
import { Words } from "../../drizzle/schema";
import { and, eq, sql } from "drizzle-orm";
import { CourseLangauge } from "../../types/seedersType";

export const processSentence = async ( 
  inputSentence: string, 
  language: "german" | "italian" | "spanish" | "french" | "english" | "hebrew"
): Promise<{ hebrewWord: string; foreignWord: [string] }[]> => {

  const wordArray = inputSentence.split(' ');
  const resultArray: Array<{ hebrewWord: string, foreignWord: [string] }> = [];
  const processedWords = new Set<string>();

  // step 1: words with length 2
  const length2Words = await db
    .select()
    .from(Words)
    .where(
      and(
        eq(sql`length("hebrewWord") - length(REPLACE("hebrewWord", ' ', ''))`, 1),
        eq(Words.language, language),
      )
    );

  const remainingWords = [...wordArray];

  for (let i = 0; i < remainingWords.length - 1; i++) {
    const twoWordPhrase: Array<{ originWord: string, prefixArray: string[] }> = [];
  
    const wordVariations = getTwoWordVariations(remainingWords[i], remainingWords[i + 1]);
  
    twoWordPhrase.push({
      originWord: `${remainingWords[i]} ${remainingWords[i + 1]}`,
      prefixArray: wordVariations,
    });    

    for (const variation of twoWordPhrase) {
      const matchingWord = length2Words.find(word => 
        variation.prefixArray.some(item => item === word.hebrewWord)
      );
    
      if (matchingWord) {      
        remainingWords.splice(i, 2);
        resultArray.push({
          hebrewWord: variation.originWord,
          foreignWord: [matchingWord.foreignWord ?? "המילה לא נמצאת במילון"],
        });
        processedWords.add(variation.originWord);
        i--;
        break;
      }
    }
  }

  // step 2: words with length 1
  const length1Words = await db
    .select()
    .from(Words)
    .where(
      and(
        eq(sql`length("hebrewWord") - length(REPLACE("hebrewWord", ' ', ''))`, 0),
        eq(Words.language, language),
      )
    );

  for (let i = 0; i < remainingWords.length; i++) {
    const oneWordPhrase: Array<{ originWord: string, prefixArray: string[] }> = [];
    const origin = remainingWords[i];

    const wordVariations = getOneWordVariations(origin);

    oneWordPhrase.push({
        originWord: origin,
        prefixArray: wordVariations,
    });

    for (const variation of oneWordPhrase) {
        const matchingWord = length1Words.find(word => 
            variation.prefixArray.some(item => item === word.hebrewWord)
        );

        if (matchingWord) {
            remainingWords.splice(i, 1);
            resultArray.push({
                hebrewWord: variation.originWord,
                foreignWord: [matchingWord.foreignWord ?? "המילה לא נמצאת במילון"],
            });
            processedWords.add(variation.originWord);
            i--;
            break;
        }
    }
  }

  // step 3: add missing word
  remainingWords.forEach(word => {
    if (!processedWords.has(word)) {
      resultArray.push({
        hebrewWord: word,
        foreignWord: ["המילה לא נמצאת במילון"],
      });
    }
  });

  // step 4: arrange the words in the correct order
  resultArray.sort((a, b) => wordArray.indexOf(a.hebrewWord) - wordArray.indexOf(b.hebrewWord));

  return resultArray;
};

(async () => {
  const sentence_one = "הפרח סגול";
  const language = CourseLangauge.English;
  const processedSentenceOne = await processSentence(sentence_one, language);
  console.log("processedSentenceOne", processedSentenceOne)
})();


/* ------------------------------------------------------------ */

const getTwoWordVariations = (word1: string, word2: string): string[] => {
  // word1 options
  const firstVariationsOne = addSuffixesArray(word1);
  const secondVariationsOne = firstVariationsOne.flatMap((word1) => endSuffixesArray(word1));
  const thirdVariationsOne = endSuffixesArray(word1);
  const forthVariationsOne = secondVariationsOne.flatMap((word1) => addSuffixesArray(word1));
  const allOptionsOne = [...firstVariationsOne, ...secondVariationsOne, ...thirdVariationsOne, ...forthVariationsOne].flat()

  // word2 options
  const firstVariationsTwo = addSuffixesArray(word2);
  const secondVariationsTwo = firstVariationsTwo.flatMap((word2) => endSuffixesArray(word2));
  const thirdVariationsTwo = endSuffixesArray(word2);
  const forthVariationsTwo = secondVariationsTwo.flatMap((word2) => addSuffixesArray(word2));
  const allOptionsTwo = [...firstVariationsTwo, ...secondVariationsTwo, ...thirdVariationsTwo, ...forthVariationsTwo].flat()

  const allCombinations = allOptionsOne.flatMap(w1 =>
    allOptionsTwo.map(w2 => `${w1} ${w2}`)
  );

  return allCombinations;
};

/* ------------------------------------------------------------ */

const getOneWordVariations = (word: string): string[] => {
  const firstVariations = addSuffixesArray(word);
  const secondVariations = firstVariations.flatMap((word) => endSuffixesArray(word));
  const thirdVariations = endSuffixesArray(word);
  const forthVariations = thirdVariations.flatMap((word) => addSuffixesArray(word));
  const allOptions = [...firstVariations, ...secondVariations, ...thirdVariations, ...forthVariations].flat()

  return allOptions;
};

/* ------------------------------------------------------------ */

const endSuffixesArray = (word: string): string[] => {
  return [
      word,
      word.endsWith('ה') ? word.substring(0, word.length - 1): null,
      word.endsWith('ך') ? word.substring(0, word.length - 1) + 'כם' : null,
      word.endsWith('ך') ? word.substring(0, word.length - 1) + 'כן' : null,
      word.endsWith('ם') ? word.substring(0, word.length - 1) + 'מים' : null,
      word.endsWith('ם') ? word.substring(0, word.length - 1) + 'מות' : null,
      word.endsWith('ן') ? word.substring(0, word.length - 1) + 'נות' : null,
      word.endsWith('ן') ? word.substring(0, word.length - 1) + 'נים' : null,
      word.endsWith('ץ') ? word.substring(0, word.length - 1) + 'צות' : null,
      word.endsWith('ץ') ? word.substring(0, word.length - 1) + 'צים' : null,
      word.endsWith('כם') ? word.substring(0, word.length - 2) + 'ך' : null,
      word.endsWith('מה') ? word.substring(0, word.length - 2) + 'ם' : null,
      word.endsWith('כם') ? word.substring(0, word.length - 2) + 'ך' : null,
      word.endsWith('כן') ? word.substring(0, word.length - 2) + 'ך' : null,
      word.endsWith('מים') ? word.substring(0, word.length - 3) + 'ם' : null,
      word.endsWith('מות') ? word.substring(0, word.length - 3) + 'ם' : null,
      word.endsWith('נות') ? word.substring(0, word.length - 3) + 'ן' : null,
      word.endsWith('נים') ? word.substring(0, word.length - 3) + 'ן' : null,
      word.endsWith('צות') ? word.substring(0, word.length - 3) + 'ץ' : null,
      word.endsWith('צים') ? word.substring(0, word.length - 3) + 'ץ' : null,
      word.endsWith('ים') ? word.substring(0, word.length - 2) : null,
      word.endsWith('ות') ? word.substring(0, word.length - 2) : null,
  ].filter((w): w is string => w !== null);
};

const addSuffixesArray = (word: string): string[] => {
  return [
    word.startsWith('ו') ? word.substring(1, word.length) : null,
    word.startsWith('ב') ? word.substring(1, word.length) : null,
    word.startsWith('כ') ? word.substring(1, word.length) : null,
    word.startsWith('וב') ? word.substring(1, word.length) : null,
    word.startsWith('כש') ? word.substring(1, word.length) : null,
    word === ('אחד') ? "אחת" : null,
    word === ('אחת') ? "אחד" : null,
    word === ('שתיים') ? "שניים" : null,
    word === ('שניים') ? "שתיים" : null,
    word === ('שלוש') ? "שלושה" : null,
    word === ('שלושה') ? "שלוש" : null,
    word === ('ארבע') ? "ארבעה" : null,
    word === ('ארבעה') ? "ארבע" : null,
    word === ('חמש') ? "חמישה" : null,
    word === ('חמישה') ? "חמש" : null,
    word === ('שש') ? "שישה" : null,
    word === ('שישה') ? "שש" : null,
    word === ('שבע') ? "שבעה" : null,
    word === ('שבעה') ? "שבע" : null,
    word === ('תשע') ? "תשעה" : null,
    word === ('תשעה') ? "תשע" : null,
  ].filter((w): w is string => w !== null);
};

/* ------------------------------------------------------------ */

export const splitTheSentence = (foreignSentence: string, foreignWord: string) => {
  let firstPart = "";
  let secondPart = "";
  const wordLength = foreignWord.length;

  for (let i = 0; i <= foreignSentence.length - wordLength; i++) {
      const currentWord = foreignSentence.substring(i, i + wordLength).toLocaleLowerCase();
      if (currentWord === foreignWord.toLocaleLowerCase()) {
          firstPart = foreignSentence.substring(0, i).trim();
          secondPart = foreignSentence.substring(i + wordLength).trim();
          break;
      }
  }

  return {
      firstPart,
      secondPart,
  };
};