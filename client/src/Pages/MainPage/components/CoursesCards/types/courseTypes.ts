export interface OneCardProps {
    levelHebrew: string;
    levelGerman: string;
    content: string;
    link: string;
    number: number;
    cardDetails: string;
  }

  export type FinishedType = {
    level: string;
    totalLessonsCompleted: number;
};