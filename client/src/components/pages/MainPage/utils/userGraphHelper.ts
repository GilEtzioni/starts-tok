import { format, subDays } from "date-fns";
import { weekPointsType } from "../../../../api/common/types";
  import { DaysOfTheWeekHebrew } from "../type/mainPageType";

export const fillMissingWeekDays = (weekScore: weekPointsType[] | undefined): (weekPointsType[] | undefined) => {

    if (weekScore === undefined) return;

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekPoints = weekScore;
    const filledWeekPoints: weekPointsType[] = [];

    const lastDate = new Date(weekPoints[weekPoints.length - 1]?.date || new Date());

    for (let i = 6; i >= 0; i--) {
        const currentDate = subDays(lastDate, i);
        const formattedDate = format(currentDate, "yyyy-MM-dd");
        const dayName = daysOfWeek[currentDate.getDay()];

        console.log("9")
        const existingEntry = weekPoints.find(entry => entry.date === formattedDate);

        if (existingEntry) {
            filledWeekPoints.push({
                date: formattedDate,
                points: existingEntry.points,
                day: englishDayToHebrew(dayName),
            });
        } else {
            filledWeekPoints.push({
                date: formattedDate,
                points: 0,
                day: englishDayToHebrew(dayName),
            });
        }
    }

    return filledWeekPoints;
};

const englishDayToHebrew = (englishDay: string): string => {
    switch (englishDay) {
      case "Sunday":
        return DaysOfTheWeekHebrew.Sunday;
      case "Monday":
        return DaysOfTheWeekHebrew.Monday;
      case "Tuesday":
        return DaysOfTheWeekHebrew.Tuesday;
      case "Wednesday":
        return DaysOfTheWeekHebrew.Wednesday;
      case "Thursday":
        return DaysOfTheWeekHebrew.Thursday;
      case "Friday":
        return DaysOfTheWeekHebrew.Friday;
      case "Saturday":
        return DaysOfTheWeekHebrew.Saturday;
      default:
        throw new Error(`Invalid English day: ${englishDay}`);
    }
  };