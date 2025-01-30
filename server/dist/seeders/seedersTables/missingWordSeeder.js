"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingWordSeeder = void 0;
const schema_1 = require("../../drizzle/schema");
const db_1 = require("../../drizzle/db");
const seedersType_1 = require("../../types/seedersType");
const missingWordSeeder = async (userId, courseIds) => {
    console.log("Seeding missing words...");
    const missingSentences = [
        // Colors - 1
        {
            missingSentenceOrder: 1,
            courseNameEnglish: "Colors",
            hebrewSentence: "הכיסא אפור",
            hebrewWord: "אפור",
            englishSentence: "The chair is gray",
            englishWord: "gray",
            germanSentence: "Der Stuhl ist grau",
            germanWord: "grau",
            frenchSentence: "La chaise est grise",
            frenchWord: "grise",
            italianSentence: "La sedia è grigia",
            italianWord: "grigia",
            spanishSentence: "La silla es gris",
            spanishWord: "gris",
        },
        // Colors - 2
        {
            missingSentenceOrder: 2,
            courseNameEnglish: "Colors",
            hebrewSentence: "המחשב שחור",
            hebrewWord: "שחור",
            englishSentence: "The computer is black",
            englishWord: "black",
            germanSentence: "Der Computer ist schwarz",
            germanWord: "schwarz",
            frenchSentence: "L'ordinateur est noir",
            frenchWord: "noir",
            italianSentence: "Il computer è nero",
            italianWord: "nero",
            spanishSentence: "La computadora es negra",
            spanishWord: "negra",
        },
        // Colors - 3
        {
            missingSentenceOrder: 3,
            courseNameEnglish: "Colors",
            hebrewSentence: "הכלב חום",
            hebrewWord: "חום",
            englishSentence: "The dog is brown",
            englishWord: "brown",
            germanSentence: "Der Hund ist braun",
            germanWord: "braun",
            frenchSentence: "Le chien est brun",
            frenchWord: "brun",
            italianSentence: "Il cane è marrone",
            italianWord: "marrone",
            spanishSentence: "El perro es marrón",
            spanishWord: "marrón",
        },
        // Colors - 4
        {
            missingSentenceOrder: 4,
            courseNameEnglish: "Colors",
            hebrewSentence: "הבית ירוק",
            hebrewWord: "ירוק",
            englishSentence: "The house is green",
            englishWord: "green",
            germanSentence: "Das Haus ist grün",
            germanWord: "grün",
            frenchSentence: "La maison est verte",
            frenchWord: "verte",
            italianSentence: "La casa è verde",
            italianWord: "verde",
            spanishSentence: "La casa es verde",
            spanishWord: "verde",
        },
        // Colors - 5
        {
            missingSentenceOrder: 5,
            courseNameEnglish: "Colors",
            hebrewSentence: "החתול לבן",
            hebrewWord: "לבן",
            englishSentence: "The cat is white",
            englishWord: "white",
            germanSentence: "Die Katze ist weiß",
            germanWord: "weiß",
            frenchSentence: "Le chat est blanc",
            frenchWord: "blanc",
            italianSentence: "Il gatto è bianco",
            italianWord: "bianco",
            spanishSentence: "El gato es blanco",
            spanishWord: "blanco",
        },
        // Colors - 6
        {
            missingSentenceOrder: 6,
            courseNameEnglish: "Colors",
            hebrewSentence: "הים כחול",
            hebrewWord: "כחול",
            englishSentence: "The sea is blue",
            englishWord: "blue",
            germanSentence: "Das Meer ist blau",
            germanWord: "blau",
            frenchSentence: "La mer est bleue",
            frenchWord: "bleue",
            italianSentence: "Il mare è blu",
            italianWord: "blu",
            spanishSentence: "El mar es azul",
            spanishWord: "azul",
        },
    ];
    const getUuidByCourseName = (courseIds, courseName) => {
        const resultItem = courseIds.find((item) => item.courseName.toLowerCase() === courseName.toLowerCase());
        if (!resultItem) {
            console.error(`Course name "${courseName}" not found in courseIds`, courseIds);
            throw new Error(`Course name "${courseName}" not found in courseIds`);
        }
        return resultItem.uuid;
    };
    const missingWordData = missingSentences.flatMap((missingSentence) => {
        const courseId = getUuidByCourseName(courseIds, missingSentence.courseNameEnglish);
        const commonData = {
            userId,
            courseId,
            missingSentenceOrder: missingSentence.missingSentenceOrder,
            courseNameEnglish: missingSentence.courseNameEnglish,
        };
        // Generate individual rows for each language
        return [
            {
                ...commonData,
                language: seedersType_1.CourseLangauge.Hebrew,
                missingSentence: missingSentence.hebrewSentence,
                missingWord: missingSentence.hebrewWord,
            },
            {
                ...commonData,
                language: seedersType_1.CourseLangauge.English,
                missingSentence: missingSentence.englishSentence,
                missingWord: missingSentence.englishWord,
            },
            {
                ...commonData,
                language: seedersType_1.CourseLangauge.German,
                missingSentence: missingSentence.germanSentence,
                missingWord: missingSentence.germanWord,
            },
            {
                ...commonData,
                language: seedersType_1.CourseLangauge.French,
                missingSentence: missingSentence.frenchSentence,
                missingWord: missingSentence.frenchWord,
            },
            {
                ...commonData,
                language: seedersType_1.CourseLangauge.Italian,
                missingSentence: missingSentence.italianSentence,
                missingWord: missingSentence.italianWord,
            },
            {
                ...commonData,
                language: seedersType_1.CourseLangauge.Spanish,
                missingSentence: missingSentence.spanishSentence,
                missingWord: missingSentence.spanishWord,
            },
        ];
    });
    for (const row of missingWordData) {
        try {
            await db_1.db.insert(schema_1.MissingWords).values(row); // Avoid duplicate key conflicts
        }
        catch (error) {
            console.error(`Failed to insert missing word: ${JSON.stringify(row)}`);
            throw error;
        }
    }
    console.log("Missing words seeded successfully.");
};
exports.missingWordSeeder = missingWordSeeder;
