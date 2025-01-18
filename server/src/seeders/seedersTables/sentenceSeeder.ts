import { Sentences } from "../../drizzle/schema"; 
import { db } from "../../drizzle/db";
import { SentenceType } from "../../types/seedersType";

export const sentenceSeeder = async (userId: string, courseIds: Array<{ index: number; uuid: string; courseName: string }>) => {

  console.log("Seeding database...");

  const senteces: SentenceType[] = [
    /* ---------------------------------------------------------------------------------------------------------------- */
      /* level: A1-מבוא , course: Colors-1 , lesson: 1 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 1, 
        
        sentenceOneHebrew: "המכונית אדומה",
        sentenceTwoGerman: "Die Sonne ist gelb",
        
        sentenceOneGerman: "Das Auto ist rot",  
        sentenceTwoHebrew: "השמש צהובה",
        
        sentenceOneItalian: "La macchina è rossa",  
        sentenceTwoItalian: "Il sole è giallo",  
        
        sentenceOneSpanish: "El coche es rojo",  
        sentenceTwoSpanish: "El sol es amarillo",  
        
        sentenceOneFranch: "La voiture est rouge",  
        sentenceTwoFranch: "Le soleil est jaune",
    
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 2 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 2,
        
        sentenceOneHebrew: "הפרח ורוד",
        sentenceTwoGerman: "Der Himmel ist blau",
        
        sentenceOneGerman: "Die Blume ist rosa",
        sentenceTwoHebrew: "השמיים כחולים",
        
        sentenceOneItalian: "Il fiore è rosa",
        sentenceTwoItalian: "Il cielo è blu",
        
        sentenceOneSpanish: "La flor es rosa",
        sentenceTwoSpanish: "El cielo es azul",
        
        sentenceOneFranch: "La fleur est rose",
        sentenceTwoFranch: "Le ciel est bleu",
    
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 3 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 3,
        
        sentenceOneGerman: "Der Stuhl ist braun",
        sentenceOneHebrew: "הכיסא חום",
        sentenceTwoGerman: "Das Buch ist lila",
        sentenceTwoHebrew: "הספר סגול",
        
        sentenceOneItalian: "La sedia è marrone",  
        sentenceTwoItalian: "Il libro è viola",  
        
        sentenceOneSpanish: "La silla es marrón",  
        sentenceTwoSpanish: "El libro es morado",  
        
        sentenceOneFranch: "La chaise est marron",  
        sentenceTwoFranch: "Le livre est violet",
    
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 4 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 4,

        sentenceOneHebrew: "התפוח אדום",
        sentenceTwoHebrew: "המנורה צהובה",
        
        sentenceOneGerman: "Der Apfel ist rot",
        sentenceTwoGerman: "Die Lampe ist gelb",
        
        sentenceOneItalian: "La mela è rossa",  
        sentenceTwoItalian: "La lampada è gialla",  
        
        sentenceOneSpanish: "La manzana es roja",  
        sentenceTwoSpanish: "La lámpara es amarilla",  
        
        sentenceOneFranch: "La pomme est rouge",  
        sentenceTwoFranch: "La lampe est jaune",        
    
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 5 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 5,
        
        sentenceOneHebrew: "הדגל כחול",
        sentenceTwoHebrew: "הבית לבן",
        
        sentenceOneGerman: "Die Fahne ist blau",
        sentenceTwoGerman: "Das Haus ist weiß",
        
        sentenceOneItalian: "La bandiera è blu",  
        sentenceTwoItalian: "La casa è bianca",  
        
        sentenceOneSpanish: "La bandera es azul",  
        sentenceTwoSpanish: "La casa es blanca",  
        
        sentenceOneFranch: "Le drapeau est bleu",  
        sentenceTwoFranch: "La maison est blanche",
        
        finished: false
      },

      /* level: A1-מבוא , course: Colors-1 , lesson: 6 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 6,
        
        sentenceOneHebrew: "החתול שחור",
        sentenceTwoHebrew: "הכלב גדול",
        
        sentenceOneGerman: "Die Katze ist schwarz",
        sentenceTwoGerman: "Der Hund ist groß",
        
        sentenceOneItalian: "Il gatto è nero",  
        sentenceTwoItalian: "Il cane è grande",  
        
        sentenceOneSpanish: "El gato es negro",  
        sentenceTwoSpanish: "El perro es grande",  
        
        sentenceOneFranch: "Le chat est noir",  
        sentenceTwoFranch: "Le chien est grand",
    
        finished: false
      },

    /* ---------------------------------------------------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------------------------------------------------- */

  

  /* ---------------------------------------------------------------------------------------------------------------- */


  /* ---------------------------------------------------------------------------------------------------------------- */

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

const snetenceData = senteces.map((sentece) => ({
  ...sentece,
  userId,
  courseId: getUuidByCourseName(courseIds, sentece.courseNameEnglish),
}));

await db.insert(Sentences).values(snetenceData).returning();
};