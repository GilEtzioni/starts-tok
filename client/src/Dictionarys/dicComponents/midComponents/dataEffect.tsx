import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import { RootState } from "../../../app/store";
import { WordsType } from '../../types/wordType'; 
import { sortWordsById, knowlageDataArray } from '../HelpingFunctionsDictionary'; 

const useFilteredWords = (words: WordsType[]) => {
    
  // 
  const clicks = useSelector((state: RootState) => state.dictionay.clickFilter);
  const knowlage = useSelector((state: RootState) => state.dictionay.knowlageFilter);
  const level = useSelector((state: RootState) => state.dictionay.levelFilter);

  const [filteredWords, setFilteredWords] = useState<WordsType[]>([]);
  const [translatedWords, setTranslatedWords] = useState<Array<[number, string]>>([]);

  useEffect(() => {
    setTranslatedWords([]); 
    const filterdKnowlage = knowlageDataArray(knowlage);

    // if nothing is selected -> show all data
    if (level.length === 0 && filterdKnowlage.length === 0) {
      setFilteredWords(sortWordsById([...words]));
      return;
    }

    let filtered = [...words];

    // if the user click on "A1" / "A2" / "B1" / "B2" / "C1" / "C2"
    if (level.length !== 0) {
      filtered = filtered.filter((item) => level.includes(item.levelEnglish)); // filter by level
    }

    // if the user click on "V" / "?" / "X" 
    if (filterdKnowlage.length !== 0) {
      filtered = filtered.filter((item) => filterdKnowlage.includes(item.knowlage)); // Use `filterdKnowlage` directly
    }

    // show the filtered data by the id order
    setFilteredWords(sortWordsById(filtered));
  }, [words, level, clicks, knowlage]);

  return { filteredWords, translatedWords, setTranslatedWords };
};

export default useFilteredWords;
