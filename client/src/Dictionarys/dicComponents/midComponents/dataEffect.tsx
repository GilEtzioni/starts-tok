import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../../../app/store";
import { WordsType } from '../../types/wordType'; 
import { sortWordsById, knowlageDataArray } from '../HelpingFunctionsDictionary'; 

const useFilteredWords = (words: WordsType[]) => {
    
  // redux
  const clicksRedux = useSelector((state: RootState) => state.dictionary.clickFilter);
  const levelRedux = useSelector((state: RootState) => state.dictionary.levelFilter);
  const knowlageRedux = useSelector((state: RootState) => state.dictionary.knowlageFilter);

  const [filteredWords, setFilteredWords] = useState<WordsType[]>([]);
  const [translatedWords, setTranslatedWords] = useState<Array<[number, string]>>([]);

  useEffect(() => {
    setTranslatedWords([]); 
    const filterdKnowlage = knowlageDataArray(knowlageRedux);

    // if nothing is selected -> show all data
    if (levelRedux.length === 0 && filterdKnowlage.length === 0) {
      setFilteredWords(sortWordsById([...words]));
      return;
    }

    let filtered = [...words];

    // if the user click on "A1" / "A2" / "B1" / "B2" / "C1" / "C2"
    if (levelRedux.length !== 0) {
      filtered = filtered.filter((item) => levelRedux.includes(item.levelEnglish)); // filter by level
    }

    // if the user click on "V" / "?" / "X" 
    if (filterdKnowlage.length !== 0) {
      filtered = filtered.filter((item) => filterdKnowlage.includes(item.knowlage)); // Use `filterdKnowlage` directly
    }

    // show the filtered data by the id order
    setFilteredWords(sortWordsById(filtered));
  }, [words, levelRedux, clicksRedux, knowlageRedux]);

  return { filteredWords, translatedWords, setTranslatedWords };
};

export default useFilteredWords;
