export const filterByOrder = (data: any[], order: number) => {
    if (order === 1) {
        return data.slice(0, 6);
    }
    if (order === 4) {
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
