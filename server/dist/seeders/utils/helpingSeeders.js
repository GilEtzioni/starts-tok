"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseNamesArray = exports.generateCourseIds = exports.rowGameId = exports.speedGameId = exports.hangmanGameId = void 0;
exports.shuffleArray = shuffleArray;
const uuid_1 = require("uuid");
exports.hangmanGameId = (0, uuid_1.v4)();
exports.speedGameId = (0, uuid_1.v4)();
exports.rowGameId = (0, uuid_1.v4)();
const generateCourseIds = () => {
    const courseIds = [];
    for (let i = 0; i <= 150 * 4; i++) {
        courseIds.push({
            index: i,
            uuid: (0, uuid_1.v4)(),
            courseName: exports.courseNamesArray[i],
        });
    }
    return courseIds;
};
exports.generateCourseIds = generateCourseIds;
exports.courseNamesArray = [
    "Colors", "Numbers", "Family Members", "Days of the Week", "Months", "Introduction",
    "Weather", "Clothes", "Food Products", "Beverages", "Parts of the House", "Animals",
    "Emotions", "Transportation", "School Supplies", "Professions", "Body Parts", "Hobbies",
    "Furniture", "Sports", "Shapes", "Time", "Common Actions", "Shopping", "Technology",
    "Health and Fitness", "Intermediate Clothes", "Intermediate Animals", "Holidays",
    "Intermediate Numbers", "Seasons", "Intermediate Body Parts", "Health", "Directions",
    "Means of Communication", "Intermediate Furniture", "Intermediate Weather", "Kitchen Tools",
    "Musical Instruments", "Economic Terms", "Social Media", "Intermediate Introduction",
    "Education", "City and Village", "Intermediate Technology", "Recycling", "Intermediate Hobbies",
    "Politics", "Intermediate Family Members", "Intermediate Shopping", "Intermediate Colors",
    "Advanced Animals", "Cultural Diversity", "Intermediate Professions", "Intermediate Politics",
    "Intermediate Economic Terms", "Climate Change", "Intermediate Transportation", "Science",
    "Social Issues", "Intermediate Sports", "Higher Education", "Competitions",
    "Intermediate Food Products", "Adventures", "Work", "Intermediate Emotions",
    "Intermediate Kitchen Tools", "Numbers by Tens", "Advanced Weather", "Intermediate Shapes",
    "Intermediate Directions", "Beverages", "Intermediate Musical Instruments",
    "Intermediate Education", "Advanced Colors", "Advanced Clothes", "Intermediate School Supplies",
    "Intermediate Health", "Intermediate Days of the Week", "Taxes", "Philosophical Topics",
    "Intermediate Parts of the House", "Describing People", "Crypto", "Advanced Politics",
    "International Relations", "Stars", "Theatre", "Human Rights", "Chemistry",
    "Artificial Intelligence", "Intermediate Holidays", "Numbers by Hundreds",
    "Numbers by Thousands", "Mathematical Topics", "Intermediate Higher Education", "Biology",
    "Intermediate Work", "Advanced Emotions", "Digital Marketing", "Graphic Design",
    "Classical Music", "Museums", "Stock Market", "Cooking", "Robots", "Services", "Christmas",
    "Fruits", "Vegetables", "Makeup", "Countries", "Extreme Sports", "Surfing", "Camping",
    "Martial Arts", "Market", "Gifts", "Restaurant", "Bank", "News", "Writing Tools",
    "Advanced Tools", "Business Communication", "Cyber", "Academic Writing",
    "Leadership and Management", "Legal Terms", "Globalization", "Topics in Psychology",
    "Renewable Energy", "Neuroscience", "Topics in Physics", "Topics in Architecture",
    "Religions", "Tools", "Plants and Flowers", "Sea", "Office Supplies",
    "Advanced Conversation Management", "Nature Trip", "Cars", "Houses", "Gym",
    "Brain Research", "Army", "Cinema", "Extreme Sports"
];
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
