import { v4 as uuidv4 } from "uuid";

export const hangmanGameId = uuidv4();
export const speedGameId = uuidv4();
export const rowGameId = uuidv4();
const NUMBER_OF_COURSES = 150;
const NUMBER_OF_LANGUAGES = 150;

export const generateCourseIds = (): Array<{index: number, uuid: string, courseName: string}> => {
  const courseIds: Array<{index: number, uuid: string, courseName: string}> = [];
  for (let i = 0; i <= NUMBER_OF_COURSES * NUMBER_OF_LANGUAGES; i++) {
    courseIds.push({
      index: i,
      uuid: uuidv4(),
      courseName: courseNamesArray[i],
    });
  }
  return courseIds;
};

export const courseNamesArray = [
  "Colors", "Numbers", "Family Members", "Days of the Week", "Months", 
  "Introduction", "Weather", "Clothes", "Food Products", "Beverages", 
  "Parts of the House", "Animals", "Emotions", "Transportation", "School Supplies", 
  "Professions", "Body Parts", "Hobbies", "Furniture", "Sports", 
  "Shapes", "Time", "Common Actions", "Shopping", "Technology", 
  "Health and Fitness", "Intermediate Clothes", "Intermediate Animals", "Holidays", "Intermediate Numbers", 
  "Countries", "Intermediate Body Parts", "Health", "Directions", "Means of Communication", 
  "Intermediate Furniture", "Intermediate Weather", "Kitchen Tools", "Musical Instruments", "Economic Terms", 
  "Social Media", "Intermediate Introduction", "Education", "City and Village", "Intermediate Technology", 
  "Recycling", "Intermediate Hobbies", "Politics", "Intermediate Family Members", "Intermediate Shopping", 
  "Intermediate Colors", "Advanced Animals", "Cultural Diversity", "Intermediate Professions", "Intermediate Politics", 
  "Intermediate Economic Terms", "Climate Change", "Intermediate Transportation", "Science", "Social Issues", 
  "Intermediate Sports", "Higher Education", "Competitions", "Intermediate Food Products", "Adventures", 
  "Work", "Intermediate Emotions", "Intermediate Kitchen Tools", "Numbers by Tens", "Advanced Weather", 
  "Intermediate Shapes", "Intermediate Directions", "Intermediate Beverages", "Intermediate Musical Instruments", "Intermediate Education", 
  "Advanced Colors", "Advanced Clothes", "Intermediate School Supplies", "Intermediate Health", "Intermediate Days of the Week", 
  "Taxes", "Philosophical Topics", "Intermediate Parts of the House", "Describing People", "Crypto", 
  "Advanced Politics", "International Relations", "Stars", "Theatre", "Human Rights", 
  "Chemistry", "Artificial Intelligence", "Intermediate Holidays", "Numbers by Hundreds", "Numbers by Thousands", 
  "Mathematical Topics", "Intermediate Higher Education", "Biology", "Intermediate Work", "Advanced Emotions", 
  "Digital Marketing", "Intermediate Countries", "Graphic Design", "Classical Music", "Museums", 
  "Stock Market", "Cooking", "Robots", "Services", "Christmas", 
  "Fruits", "Vegetables", "Makeup", "Advanced Countries", "Extreme Sports", 
  "Surfing", "Camping", "Martial Arts", "Market", "Gifts", 
  "Restaurant", "Bank", "News", "Writing Tools", "Tools", 
  "Business Communication", "Cyber", "Academic Writing", "Leadership and Management", "Legal Terms", 
  "Globalization", "Topics in Psychology", "Renewable Energy", "Neuroscience", "Topics in Physics", 
  "Topics in Architecture", "Religions", "Advanced Tools", "Plants and Flowers", "Sea", 
  "Office Supplies", "Advanced Conversation Management", "Nature Trip", "Cars", "Houses", 
  "Gym", "Brain Research", "Army", "Cinema", "Intermediate Extreme Sports",
];
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
interface WordData {
  hebrewSentence: string;
  hebrewWord: string;
  englishSentence: string;
  englishWord: string;
  germanSentence: string;
  germanWord: string;
  italianSentence: string;
  spanishSentence: string;
  italianWord: string;
  spanishWord: string
  frenchSentence: string;
  frenchWord: string;
  courseNameEnglish: string;
  missingSentenceOrder: number;
}

export const generateMissingSentencesJson = (words: WordData[]) => {
  const missingSentences = [];
  const courseCounters: Record<string, number> = {}; 

  for (const word of words) {
    if (!courseCounters[word.courseNameEnglish]) {
      courseCounters[word.courseNameEnglish] = 1;
    }

    missingSentences.push({
      missingSentenceOrder: courseCounters[word.courseNameEnglish],
      courseNameEnglish: word.courseNameEnglish,
      hebrewSentence: word.hebrewSentence,
      hebrewWord: word.hebrewWord,
      englishSentence: word.englishSentence,
      englishWord: word.englishWord,
      germanSentence: word.germanSentence,
      germanWord: word.germanWord,
      frenchSentence: word.frenchSentence,
      frenchWord: word.frenchWord,
      italianSentence: word.italianSentence,
      italianWord: word.italianWord,
      spanishSentence: word.spanishSentence,
      spanishWord: word.spanishWord,
    });

    courseCounters[word.courseNameEnglish]++;
  }

  missingSentences.map((item) => {
    const regex = new RegExp(`(^|\\s|[.,?])${item.hebrewWord.toLowerCase()}([.,?]|\\s|$)`, 'g');  
    if (!regex.test(item.hebrewSentence.toLowerCase())) {
      console.log("\n\n");
      console.log(`courseName: ${item.courseNameEnglish} (order - ${item.missingSentenceOrder})`);
      console.log(`hebrewWord: ${item.hebrewWord}`);
      console.log("\n\n");
    }
  });
  
};

const wordsExample: WordData[] = [

];

generateMissingSentencesJson(wordsExample);