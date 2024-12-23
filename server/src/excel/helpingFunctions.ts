/* printing funtsioins to de-bug  */ 
export function reverseString(word: string): string {
    let reversedString = "";
    for (let i = 0; i < word.length; i++) {
        reversedString += word.charAt(word.length - i - 1);
    }
    return reversedString;
}

export function Printer(cellWord: string, cellLine: number, language: string, worksheet: any): string {
    const cell = `${cellWord}${cellLine}`;
    const cellValue = worksheet?.[cell]?.v || "";

    if (language === "hebrew") {
        return reverseString(cellValue);
    }
    return cellValue;
}


/* find the dats in the excel file easily */ 
export function cellData(cellWord: string, cellLine: number, worksheet: any): string {
  const cell = `${cellWord}${cellLine}`;
  return worksheet?.[cell]?.v || "";
}

