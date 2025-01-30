import { FinishedType } from "../types/courseTypes";

export const getNumberOfLessonsCompleted = (arr: FinishedType[] | undefined | null): number[] => {
    if (!arr || !Array.isArray(arr) || arr === null) {
        return [0, 0, 0, 0, 0, 0];
    }

    const newArray = [0, 1, 2, 3, 4, 5];

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item.level === "A1") newArray[0] = item.totalLessonsCompleted || 0;
        if (item.level === "A2") newArray[1] = item.totalLessonsCompleted || 0;
        if (item.level === "B1") newArray[2] = item.totalLessonsCompleted || 0;
        if (item.level === "B2") newArray[3] = item.totalLessonsCompleted || 0;
        if (item.level === "C1") newArray[4] = item.totalLessonsCompleted || 0;
        if (item.level === "C2") newArray[5] = item.totalLessonsCompleted || 0;
    }

    return newArray;
};

export const generateRandomBubbles = (count: number) => {
    const bubbles = [];
    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * 40) + 20;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.3 + 0.1;
      bubbles.push({ size, top, left, opacity });
    }
    return bubbles;
  };