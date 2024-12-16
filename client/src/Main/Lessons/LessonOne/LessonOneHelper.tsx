export const filterByOrder = (data: any[], order: string) => {
    if (order === "first") {
        return data.slice(0, 6);
    }
    if (order === "forth") {
        return data.slice(6, 12);
    }
    return data;
};

export const shuffleArray = (array: any[]) => {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};
