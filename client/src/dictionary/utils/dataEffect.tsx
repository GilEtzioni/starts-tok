import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import { RootState } from "../../app/store";
import { WordsType } from "../../types/types";
import { sortWordsById, knowledgeDataArray } from "./HelpingFunctionsDictionary";
import { TranslatedWordsType } from '../types/DictionaryType';

const useFilteredWords = (words: WordsType[] | undefined) => {
    
  const clicks = useSelector((state: RootState) => state.dictionary.clickFilter);
  const knowledge = useSelector((state: RootState) => state.dictionary.knowledgeFilter);
  const level = useSelector((state: RootState) => state.dictionary.levelFilter);

  const [filteredWords, setFilteredWords] = useState<WordsType[]>([]);
  const [translatedWords, setTranslatedWords] = useState<TranslatedWordsType[]>([]);

  useEffect(() => {
    if (words === undefined || !words) return;
    
    setTranslatedWords([]); 
    const filterdknowledge = knowledgeDataArray(knowledge);

    // if nothing is selected -> show all data
    if (level.length === 0 && filterdknowledge.length === 0 && words) {
      setFilteredWords(sortWordsById([...words]));
      return;
    }

    let filtered = [...words];

    // if the user click on "A1" / "A2" / "B1" / "B2" / "C1" / "C2"
    if (level.length !== 0) {
      filtered = filtered.filter((item) => level.includes(item.englishLevel)); // filter by level
    }

    // if the user click on "V" / "?" / "X" 
    if (filterdknowledge.length !== 0) {
      filtered = filtered.filter((item) => filterdknowledge.includes(item.knowledge)); // Use `filterdKnowledge` directly
    }

    // show the filtered data by the id order
    setFilteredWords(sortWordsById(filtered));
  }, [words, level, clicks, knowledge]);

  return { filteredWords, translatedWords, setTranslatedWords };
};

export default useFilteredWords;
