const xlsx = require("xlsx");
import * as fs from "fs";
import { Lesson } from "./Lesson";
import { cellData } from "./helpingFunctions";

const wb = xlsx.readFile("./dictionary-excel.xlsx", { cellDates: true });

const sheetNames = wb.SheetNames; 
const len = sheetNames.length;
console.log(len);

const lessons: Lesson[] = [];
for (let j = 0; j < len; j++) {
  let worksheet = wb.Sheets[sheetNames[j]];
  console.log(`start sheet - ${sheetNames[j]}`);

  for (let i = 0; i < 6; i++) {
      const lineNumber = 12 + (i * 21);

      const lesson = new Lesson({
          levelHebrew: cellData("C", 1, worksheet),
          levelEnglish: cellData("C", 2, worksheet),
          courseNameEnglish: cellData("C", 5, worksheet),
          courseId: parseInt(cellData("C", 6, worksheet),10),
          lessonId: i + 1,
          sentenceOneGerman: cellData("C", lineNumber, worksheet),
          sentenceOneHebrew: cellData("D", lineNumber, worksheet),
          sentenceTwoGerman: cellData("C", lineNumber + 1, worksheet),
          sentenceTwoHebrew: cellData("D", lineNumber + 1, worksheet),
          missingSentenceOneHebrew: cellData("C", lineNumber + 5, worksheet),
          missingWordOneHebrew: cellData("D", lineNumber + 5, worksheet),
          missingSentenceOneGerman: cellData("F", lineNumber + 5, worksheet),
          missingWordOneGerman: cellData("E", lineNumber + 5, worksheet),
          missingSentenceTwoHebrew: cellData("C", lineNumber + 6, worksheet),
          missingWordTwoHebrew: cellData("D", lineNumber + 6, worksheet),
          missingSentenceTwoGerman: cellData("F", lineNumber + 6, worksheet),
          missingWordTwoGerman: cellData("E", lineNumber + 6, worksheet),
          wordOneGerman: cellData("D", lineNumber + 11, worksheet),
          wordOneHebrew: cellData("C", lineNumber + 11, worksheet),
          wordTwoGerman: cellData("D", lineNumber + 12, worksheet),
          wordTwoHebrew: cellData("C", lineNumber + 12, worksheet),
          wordThreeGerman: cellData("D", lineNumber + 13, worksheet),
          wordThreeHebrew: cellData("C", lineNumber + 13, worksheet),
          wordFourGerman: cellData("D", lineNumber + 14, worksheet),
          wordFourHebrew: cellData("C", lineNumber + 14, worksheet),
          wordFiveGerman: cellData("D", lineNumber + 15, worksheet),
          wordFiveHebrew: cellData("C", lineNumber + 15, worksheet),
          wordSixGerman: cellData("D", lineNumber + 16, worksheet),
          wordSixHebrew: cellData("C", lineNumber + 16, worksheet),
          wordSevenGerman: cellData("D", lineNumber + 17, worksheet),
          wordSevenHebrew: cellData("C", lineNumber + 17, worksheet),
          wordEightGerman: cellData("D", lineNumber + 18, worksheet),
          wordEightHebrew: cellData("C", lineNumber + 18, worksheet),
          wordNineGerman: cellData("D", lineNumber + 19, worksheet),
          wordNineHebrew: cellData("C", lineNumber + 19, worksheet),
          wordTenGerman: cellData("D", lineNumber + 20, worksheet),
          wordTenHebrew: cellData("C", lineNumber + 20, worksheet),
          wordElevenGerman: cellData("D", lineNumber + 21, worksheet),
          wordElevenHebrew: cellData("C", lineNumber + 21, worksheet),
          wordTwelveGerman: cellData("D", lineNumber + 22, worksheet),
          wordTwelveHebrew: cellData("C", lineNumber + 22, worksheet),
      });

      lessons.push(lesson);
  }
}
// write to .json file
fs.writeFile("lesson_example.json", JSON.stringify(lessons, null, 2), (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("Flattened JSON has been written successfully.");
  }
});