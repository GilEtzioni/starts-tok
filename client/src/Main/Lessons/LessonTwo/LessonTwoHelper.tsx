// filter
export const filterByOrder = (data: any[], order: string) => {
    if (order === "second") {
      return data[0].slice(0, 1); // only the sentence of the first item
    }
    if (order === "fifth") {
      return data[1].slice(0, 1); // only the sentence of the second item
    }
    return data; // return all items
  };
  
  // shuffle the array
  export const shuffleArray = (array: any[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };
  