import { DaysOfTheWeek, UserType } from "../types/userType";

export const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const getLastWeekDate = (): string => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return lastWeek.toISOString().split('T')[0];
};

export const getDayDate = (day: DaysOfTheWeek): string => {
    const today = new Date();
    const todayDay = today.getDay();
    const targetDay = Object.values(DaysOfTheWeek).indexOf(day);

    const dayDifference = targetDay - todayDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + dayDifference);

    return targetDate.toISOString().split('T')[0];
};

export const generateEmptyWeekPoints = (userId: string, userName: string, weekPoints: UserType[]): UserType[] => {
    const emptyWeekArray: UserType[] = [];
  
    const today = new Date();
  
    for (let i = 0; i < 7; i++) {
      const pointsDate = new Date(today);
      pointsDate.setDate(today.getDate() - i);
  
      const existingEntry = weekPoints.find((point) => {
        const existingDate = new Date(point.pointsDate);
        return (
          existingDate.getFullYear() === pointsDate.getFullYear() &&
          existingDate.getMonth() === pointsDate.getMonth() &&
          existingDate.getDate() === pointsDate.getDate()
        );
      });
  
      if (existingEntry) {
        emptyWeekArray.push(existingEntry);
      } else {
        emptyWeekArray.push({
          userId,
          userName,
          points: 0,
          pointsDate,
        });
      }
    }
  
    return emptyWeekArray;
};

export const convertDateToDay = (dateString: string | null) => {
    if (dateString === null) return;
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}


const lettersEnglish = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const lettersGerman = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß'];

const lettersSpanish = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'á', 'é', 'í', 'ñ', 'ó', 'ú'];

const lettersFrench = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'à', 'â', 'ç', 'é', 'è', 'ê', 'ë', 'î', 'ï', 'ô', 'ù', 'û', 'ÿ'];

const lettersItalian = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'z', 'à', 'è', 'é', 'ì', 'ò', 'ù'];

export const languageDictionaries = {
  english: lettersEnglish,
  german: lettersGerman,
  spanish: lettersSpanish,
  french: lettersFrench,
  italian: lettersItalian
};