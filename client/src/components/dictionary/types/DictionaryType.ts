import { DictionaryKnowledgeType } from "../../../types/types";

export type KnowledgeType = {
  isEx: boolean;
  isVy: boolean;
  isQueistion: boolean;
};

export interface UpdatedWordType {
  id: string; 
  knowledge: DictionaryKnowledgeType;
}

export enum DictionaryColors {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Gray = "gray",
}

export interface IconItem {
  id: number;
  isClicked: boolean;
  defaultColor: DictionaryColors;
  activeColor: DictionaryColors;
  icon: React.JSX.Element;
};

export interface TranslatedWordsType {
  id: string, 
  word: string
}