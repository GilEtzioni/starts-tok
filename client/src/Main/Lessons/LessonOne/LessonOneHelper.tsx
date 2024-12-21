interface Word {
    text: string;
    id: string;
    isSelected: "rightSelected" | "wrongSelected" | null;
  }

export const filterByOrder = (data: Array<Word>, order: number) => {
    if (order === 1) {
        return data.slice(0, 6);
    }
    if (order === 4) {
        return data.slice(6, 12);
    }
    return data;
};

export const shuffleArray = (array: Array<Word>) => {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};
