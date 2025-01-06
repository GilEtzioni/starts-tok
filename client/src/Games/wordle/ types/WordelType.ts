export enum letterColor {
  gray = 'gray',
  green = 'green',
  yellow = 'yellow',
  notSelected = 'notSelected',
}

export type wordleType = {
  letterColor: string;
  letter: string;
  isInGame: boolean;
} | null;
