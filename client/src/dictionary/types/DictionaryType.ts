export type KnowlageType = {
  isEx: boolean;
  isVy: boolean;
  isQueistion: boolean;
};

export interface UpdatedWordType {
  id: number; 
  knowlage: string;
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