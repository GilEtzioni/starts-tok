type FinishedType = {
    level: string;
    totalLessonsCompleted: number;
};

export const getArray = (arr: FinishedType[]): Array<number> => {
    const newArray = [0, 1, 2, 3, 4, 5];

    arr.forEach((item) => {
        if (item.level === "A1")
            newArray[0] = item.totalLessonsCompleted || 0;
        if (item.level === "A2")
            newArray[1] = item.totalLessonsCompleted || 0;
        if (item.level === "B1")
            newArray[2] = item.totalLessonsCompleted || 0;
        if (item.level === "B2")
            newArray[3] = item.totalLessonsCompleted || 0;
        if (item.level === "C1")
            newArray[4] = item.totalLessonsCompleted || 0;
        if (item.level === "C2")
            newArray[5] = item.totalLessonsCompleted || 0;
    });
    return newArray;
};
