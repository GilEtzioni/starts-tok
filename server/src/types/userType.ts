export enum DaysOfTheWeek {
    Sunday = "sunday",
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday"
}

export enum DaysOfTheWeekHebrew {
    Sunday = "ראשון",
    Monday = "שני",
    Tuesday = "שלישי",
    Wednesday = "רביעי",
    Thursday = "חמישי",
    Friday = "שישי",
    Saturday = "שבת"
}

export type UserType = {
    userId: string;
    userName: string,
    points: number;
    pointsDate: Date;
}