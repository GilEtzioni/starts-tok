import { Words } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { Word } from "../../types/seedersType";
import { v4 as uuidv4 } from "uuid";

export const wordSeeder = async (userId: string, courseIds: Array<{ index: number; uuid: string; courseName: string }>) => {

  console.log("Seeding database...");
  // { hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1,  germanWord: "rot", hebrewWord: "אדום", knowledge: "?" },

  const words: Word[] = [
  // Colors - 1

    { hebrewWord: "אדום", germanWord: "rot", italianWord: "rosso", spanishWord: "rojo", frenchWord: "rouge", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "כחול", germanWord: "blau", italianWord: "blu", spanishWord: "azul", frenchWord: "bleu", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "ירוק", germanWord: "grün", italianWord: "verde", spanishWord: "verde", frenchWord: "vert", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "צהוב", germanWord: "gelb", italianWord: "giallo", spanishWord: "amarillo", frenchWord: "jaune", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "שחור", germanWord: "schwarz", italianWord: "nero", spanishWord: "negro", frenchWord: "noir", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "לבן", germanWord: "weiß", italianWord: "bianco", spanishWord: "blanco", frenchWord: "blanc", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "כתום", germanWord: "orange", italianWord: "arancione", spanishWord: "naranja", frenchWord: "orange", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "ורוד", germanWord: "rosa", italianWord: "rosa", spanishWord: "rosa", frenchWord: "rose", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "אפור", germanWord: "grau", italianWord: "grigio", spanishWord: "gris", frenchWord: "gris", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "חום", germanWord: "braun", italianWord: "marrone", spanishWord: "marrón", frenchWord: "marron", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "סגול", germanWord: "lila", italianWord: "viola", spanishWord: "morado", frenchWord: "violet", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },
    { hebrewWord: "תכלת", germanWord: "hellblau", italianWord: "azzurro", spanishWord: "celeste", frenchWord: "bleu clair", hebrewLevel: "מבוא" as const, englishLevel: "A1" as const, courseNameEnglish: "Colors", courseOrder: 1 },

  // Numbers - 2
  // Family Members - 3
  // Days of the Week - 4
  // Months - 5
  // Introduction - 6
  // Weather - 7
  // Clothes - 8
  // Food Products - 9
  // Beverages - 10
  // Parts of the House - 11
  // Animals - 12

  // Health and Fitness - 26
  // Intermediate Clothes - 27
  // Intermediate Animals - 28
  // Holidays - 29
  // Intermediate Numbers - 30
  // Seasons - 31
  // Intermediate Body Parts - 32
  // Health - 33
  // Directions - 34
  // Means of Communication - 35
  // Intermediate Furniture - 36
  // Intermediate Weather - 37
  // Kitchen Tools - 38
  // Musical Instruments - 39
  // Economic Terms - 40
  // Social Media - 41
  // Intermediate Introduction - 42
  // Education - 43
  // City and Village - 44
  // Intermediate Technology - 45
  // Recycling - 46
  // Intermediate Hobbies - 47
  // Politics - 48
  // Intermediate Family Members - 49
  // Intermediate Shopping - 50

  // Intermediate Colors - 51
    // { hebrewWord: "בורדו", germanWord: "bordeauxrot", italianWord: "borgogna", spanishWord: "burdeos", frenchWord: "bordeaux", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "זהב", germanWord: "gold", italianWord: "oro", spanishWord: "dorado", frenchWord: "doré", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "כסף", germanWord: "silber", italianWord: "argento", spanishWord: "plateado", frenchWord: "argenté", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "שנהב", germanWord: "elfenbein", italianWord: "avorio", spanishWord: "marfil", frenchWord: "ivoire", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "זית", germanWord: "olivgrün", italianWord: "verde oliva", spanishWord: "verde oliva", frenchWord: "vert olive", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "טורקיז", germanWord: "türkis", italianWord: "turchese", spanishWord: "turquesa", frenchWord: "turquoise", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "ארגמן", germanWord: "purpurrot", italianWord: "porpora", spanishWord: "púrpura", frenchWord: "pourpre", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "ליים", germanWord: "limettengrün", italianWord: "lime", spanishWord: "lima", frenchWord: "citron vert", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "קרם", germanWord: "cremefarben", italianWord: "crema", spanishWord: "crema", frenchWord: "crème", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },
    // { hebrewWord: "פוקסיה", germanWord: "fuchsienrot", italianWord: "fucsia", spanishWord: "fucsia", frenchWord: "fuchsia", hebrewLevel: "בינוני" as const, englishLevel: "B1" as const, courseNameEnglish: "Intermediate Colors", courseOrder: 51 },

  // Advanced Animals - 52
  // Cultural Diversity - 53
  // Intermediate Professions - 54
  // Intermediate Politics - 55
  // Intermediate Economic Terms - 56
  // Climate Change - 57
  // Intermediate Transportation - 58
  // Science - 59
  // Social Issues - 60
  // Intermediate Sports - 61
  // Higher Education - 62
  // Competitions - 63
  // Intermediate Food Products - 64
  // Adventures - 65
  // Work - 66
  // Intermediate Emotions - 67
  // Intermediate Kitchen Tools - 68
  // Numbers by Tens - 69
  // Advanced Weather - 70
  // Intermediate Shapes - 71
  // Intermediate Directions - 72
  // Beverages - 73
  // Intermediate Musical Instruments - 74
  // Intermediate Education - 75

  // Advanced Colors - 76

    // { hebrewWord: "בורדו", germanWord: "bordeauxrot", italianWord: "borgogna", spanishWord: "burdeos", frenchWord: "bordeaux", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "זהב", germanWord: "gold", italianWord: "oro", spanishWord: "dorado", frenchWord: "doré", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "כסף", germanWord: "silber", italianWord: "argento", spanishWord: "plateado", frenchWord: "argenté", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "שנהב", germanWord: "elfenbein", italianWord: "avorio", spanishWord: "marfil", frenchWord: "ivoire", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "זית", germanWord: "olivgrün", italianWord: "verde oliva", spanishWord: "verde oliva", frenchWord: "vert olive", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "טורקיז", germanWord: "türkis", italianWord: "turchese", spanishWord: "turquesa", frenchWord: "turquoise", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "ארגמן", germanWord: "purpurrot", italianWord: "porpora", spanishWord: "púrpura", frenchWord: "pourpre", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "ליים", germanWord: "limettengrün", italianWord: "lime", spanishWord: "lima", frenchWord: "citron vert", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "קרם", germanWord: "cremefarben", italianWord: "crema", spanishWord: "crema", frenchWord: "crème", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 },
    // { hebrewWord: "פוקסיה", germanWord: "fuchsienrot", italianWord: "fucsia", spanishWord: "fucsia", frenchWord: "fuchsia", hebrewLevel: "מתקדם" as const, englishLevel: "B2" as const, courseNameEnglish: "Colors", courseOrder: 76 }

  // Advanced Clothes - 77
  // Intermediate School Supplies - 78
  // Intermediate Health - 79
  // Intermediate Days of the Week - 80
  // Taxes - 81
  // Philosophical Topics - 82
  // Intermediate Parts of the House - 83
  // Describing People - 84
  // Crypto - 85
  // Advanced Politics - 86
  // International Relations - 87
  // Stars - 88
  // Theatre - 89
  // Human Rights - 90
  // Chemistry - 91
  // Artificial Intelligence - 92
  // Intermediate Holidays - 93
  // Numbers by Hundreds - 94
  // Numbers by Thousands - 95
  // Mathematical Topics - 96
  // Intermediate Higher Education - 97
  // Biology - 98
  // Intermediate Work - 99
  // Advanced Emotions - 100

  // Digital Marketing - 101
  // Graphic Design - 102
  // Graphic Design - 103
  // Classical Music - 104
  // Museums - 105
  // Stock Market - 106
  // Cooking - 107
  // Robots - 108
  // Services - 109
  // Christmas - 110
  // Fruits - 111
  // Vegetables - 112
  // Makeup - 113
  // Countries - 114
  // Extreme Sports - 115
  // Surfing - 116
  // Camping - 117
  // Martial Arts - 118
  // Market - 119
  // Gifts - 120
  // Restaurant - 121
  // Bank - 122
  // News - 123
  // Writing Tools - 124
  // Advanced Tools - 125

  // Business Communication - 126
  // Cyber - 127
  // Academic Writing - 128
  // Leadership and Management - 129
  // Legal Terms - 130
  // Globalization - 131
  // Topics in Psychology - 132
  // Renewable Energy - 133
  // Neuroscience - 134
  // Topics in Physics - 135
  // Topics in Architecture - 136
  // Religions - 137
  // Tools - 138
  // Plants and Flowers - 139
  // Sea - 140
  // Office Supplies - 141
  // Advanced Conversation Management - 142
  // Nature Trip - 143
  // Cars - 144
  // Houses - 145
  // Gym - 146
  // Brain Research - 147
  // Army - 148
  // Cinema - 149
  // Extreme Sports - 150

];

const getUuidByCourseName = ( courseIds: Array<{ index: number; uuid: string; courseName: string }>, courseName: string ): string => {
  const resultItem = courseIds.find((item) => item.courseName.toLowerCase() === courseName.toLowerCase());
  if (!resultItem) {
    console.error(`Course name "${courseName}" not found in courseIds`);
    console.error("Available course names:", courseIds.map((item) => item.courseName));
    throw new Error(`Course name "${courseName}" not found in courseIds`);
  }
  return resultItem.uuid;
};

const wordData = words.map((word) => ({
  ...word,
  userId,
  knowledge: "X",
  wordId: uuidv4(),
  courseId: getUuidByCourseName(courseIds, word.courseNameEnglish),

}));

await db.insert(Words).values(wordData).returning({ id: Words.courseId });
};