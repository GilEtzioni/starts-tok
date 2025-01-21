import { useEffect } from 'react';
import { WordsType } from "../../../api/common/types";
import { sortWordsById, knowledgeDataArray } from "./HelpingFunctionsDictionary";
import { KnowledgeType, TranslatedWordsType } from '../types/DictionaryType';

interface TableEffectProps {
  words: WordsType[] | undefined,
  setFilteredWords: (array: WordsType[]) => void, 
  setTranslatedWords: (array: TranslatedWordsType[]) => void,
  knowledge: KnowledgeType,
  clicks: number,
  level: string[],
}

export const useTableEffect = ({ words, setFilteredWords, setTranslatedWords, clicks, knowledge, level }: TableEffectProps) => {
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
    setFilteredWords(filtered);
  }, [words, level, clicks, knowledge]);
};