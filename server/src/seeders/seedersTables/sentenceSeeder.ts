import { Sentences } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { CourseLangauge } from "../../types/seedersType";

export const sentenceSeeder = async (
  userId: string,
  courseIds: Array<{ index: number; uuid: string; courseName: string }>
) => {
  console.log("Seeding database...");

  const sentences = [
    /* ----------------------------------------------------------------------------------------------------------------------------------------------- */

    // colors - 1
    { senteceOrder: 1, courseNameEnglish: "Colors", hebrew: "המכונית אדומה", english: "The car is red", german: "Das Auto ist rot", french: "La voiture est rouge", italian: "La macchina è rossa", spanish: "El coche es rojo" },
    { senteceOrder: 2, courseNameEnglish: "Colors", hebrew: "הכיסא כחול", english: "The chair is blue", german: "Der Stuhl ist blau", french: "La chaise est bleue", italian: "La sedia è blu", spanish: "La silla es azul" },
    { senteceOrder: 3, courseNameEnglish: "Colors", hebrew: "הבית ירוק", english: "The house is green", german: "Das Haus ist grün", french: "La maison est verte", italian: "La casa è verde", spanish: "La casa es verde" },
    { senteceOrder: 4, courseNameEnglish: "Colors", hebrew: "התפוח צהוב", english: "The apple is yellow", german: "Der Apfel ist gelb", french: "La pomme est jaune", italian: "La mela è gialla", spanish: "La manzana es amarilla" },
    { senteceOrder: 5, courseNameEnglish: "Colors", hebrew: "העץ שחור", english: "The tree is black", german: "Der Baum ist schwarz", french: "L'arbre est noir", italian: "L'albero è nero", spanish: "El árbol es negro" },
    { senteceOrder: 6, courseNameEnglish: "Colors", hebrew: "הקיר לבן", english: "The wall is white", german: "Die Wand ist weiß", french: "Le mur est blanc", italian: "Il muro è bianco", spanish: "La pared es blanca" },
    { senteceOrder: 7, courseNameEnglish: "Colors", hebrew: "הגג חום", english: "The roof is brown", german: "Das Dach ist braun", french: "Le toit est marron", italian: "Il tetto è marrone", spanish: "El techo es marrón" },
    { senteceOrder: 8, courseNameEnglish: "Colors", hebrew: "הדלת ורודה", english: "The door is pink", german: "Die Tür ist rosa", french: "La porte est rose", italian: "La porta è rosa", spanish: "La puerta es rosa" },
    { senteceOrder: 9, courseNameEnglish: "Colors", hebrew: "השמש צהובה", english: "The sun is yellow", german: "Die Sonne ist gelb", french: "Le soleil est jaune", italian: "Il sole è giallo", spanish: "El sol es amarillo" },
    { senteceOrder: 10, courseNameEnglish: "Colors", hebrew: "המים כחולים", english: "The water is blue", german: "Das Wasser ist blau", french: "L'eau est bleue", italian: "L'acqua è blu", spanish: "El agua es azul" },
    { senteceOrder: 11, courseNameEnglish: "Colors", hebrew: "הפרח סגול", english: "The flower is purple", german: "Die Blume ist lila", french: "La fleur est violette", italian: "Il fiore è viola", spanish: "La flor es morada" },
    { senteceOrder: 12, courseNameEnglish: "Colors", hebrew: "הספה אפורה", english: "The sofa is gray", german: "Das Sofa ist grau", french: "Le canapé est gris", italian: "Il divano è grigio", spanish: "El sofá es gris" },    

  /* ----------------------------------------------------------------------------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------------------------------------------------------------------------- */
  ];

  const getUuidByCourseName = (
    courseIds: Array<{ index: number; uuid: string; courseName: string }>,
    courseName: string
  ): string => {
    const resultItem = courseIds.find(
      (item) => item.courseName.toLowerCase() === courseName.toLowerCase()
    );
    if (!resultItem) {
      console.error(`Course name "${courseName}" not found in courseIds`, courseIds);
      throw new Error(`Course name "${courseName}" not found in courseIds`);
    }
    return resultItem.uuid;
  };

  const sentenceData = sentences.flatMap((sentence) => {
    const courseId = getUuidByCourseName(courseIds, sentence.courseNameEnglish);
    const commonData = {
      courseNameEnglish: sentence.courseNameEnglish,
      userId,
      courseId,
      senteceOrder: sentence?.senteceOrder,
    };

    return [
      { ...commonData, language: CourseLangauge.Hebrew, sentence: sentence.hebrew },
      { ...commonData, language: CourseLangauge.English, sentence: sentence.english },
      { ...commonData, language: CourseLangauge.German, sentence: sentence.german },
      { ...commonData, language: CourseLangauge.French, sentence: sentence.french },
      { ...commonData, language: CourseLangauge.Italian, sentence: sentence.italian },
      { ...commonData, language: CourseLangauge.Spanish, sentence: sentence.spanish },
    ];
  });

  for (const row of sentenceData) {
    try {
      await db.insert(Sentences).values(row);
    } catch (error) {
      console.error(`Failed to insert sentence: ${JSON.stringify(row)}`);
      throw error;
    }
  }

  console.log("Sentences seeded successfully.");
};