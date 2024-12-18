export function handleClickedRow(
    id: number,
    word: string,
    translateArray: [number, string][],
    setTranslateArray: React.Dispatch<React.SetStateAction<[number, string][]>>
  ) {
    const existingIndex = translateArray.findIndex(([existingId]) => existingId === id); // find the item by id
  
    // remove the item (if it's already in the list)
    if (existingIndex !== -1) {
      setTranslateArray((prev) => prev.filter(([existingId]) => existingId !== id));
    } else {
      // add the new item (if it's not in the list)
      setTranslateArray((prev) => [...prev, [id, word]]);
    }
  }
  