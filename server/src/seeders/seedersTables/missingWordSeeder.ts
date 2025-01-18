import { MissingWords } from "../../drizzle/schema"; 
import { db } from "../../drizzle/db";
import { MissingWordsType } from "../../types/seedersType";

export const missingWordSeeder = async (userId: string, courseIds: Array<{ index: number; uuid: string; courseName: string }>) => {

  console.log("Seeding database...");

  const missingWords: MissingWordsType[] = [
    /* ---------------------------------------------------------------------------------------------------------------- */
      /* level: A1-מבוא , course: Colors-1 , lesson: 1 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 1,

        missingSentenceOneHebrew: "הדלת כתומה",
        missingSentenceTwoHebrew: "החלון כחול",
        missingWordOneHebrew: "כתום",
        missingWordTwoHebrew: "כחול",
        
        missingSentenceOneGerman: "Die Tür ist orange",
        missingWordOneGerman: "orange",
        missingSentenceTwoGerman: "Das Fenster ist blau",
        missingWordTwoGerman: "blau",
        
        missingSentenceOneItalian: "La porta è arancione", 
        missingWordOneItalian: "arancione", 
        missingSentenceTwoItalian: "La finestra è blu",  
        missingWordTwoItalian: "blu", 
        
        missingSentenceOneSpanish: "La puerta es naranja", 
        missingWordOneSpanish: "naranja", 
        missingSentenceTwoSpanish: "La ventana es azul",  
        missingWordTwoSpanish: "azul", 
        
        missingSentenceOneFrench: "La porte est orange", 
        missingWordOneFrench: "orange", 
        missingSentenceTwoFrench: "La fenêtre est bleue",  
        missingWordTwoFrench: "bleue",        
        finished: false,
    
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 2,

        missingSentenceOneHebrew: "השולחן ירוק",
        missingSentenceTwoHebrew: "הכיסא אפור",
        missingWordOneHebrew: "ירוק",
        missingWordTwoHebrew: "אפור",
        
        missingSentenceOneGerman: "Der Tisch ist grün",
        missingWordOneGerman: "grün",
        missingSentenceTwoGerman: "Der Stuhl ist grau",
        missingWordTwoGerman: "grau",
        
        missingSentenceOneItalian: "Il tavolo è verde", 
        missingWordOneItalian: "verde", 
        missingSentenceTwoItalian: "La sedia è grigia",  
        missingWordTwoItalian: "grigia", 
        
        missingSentenceOneSpanish: "La mesa es verde", 
        missingWordOneSpanish: "verde", 
        missingSentenceTwoSpanish: "La silla es gris",  
        missingWordTwoSpanish: "gris", 
        
        missingSentenceOneFrench: "La table est verte", 
        missingWordOneFrench: "verte", 
        missingSentenceTwoFrench: "La chaise est grise",  
        missingWordTwoFrench: "grise",

        finished: false,
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 3,

        missingSentenceOneHebrew: "הספר ירוק",
        missingSentenceTwoHebrew: "העט ורוד",
        missingWordOneHebrew: "ירוק",
        missingWordTwoHebrew: "ורוד",
        
        missingSentenceOneGerman: "Das Buch ist grün",
        missingWordOneGerman: "grün",
        missingSentenceTwoGerman: "Der Stift ist rosa",
        missingWordTwoGerman: "rosa",
        
        missingSentenceOneItalian: "Il libro è verde", 
        missingWordOneItalian: "verde", 
        missingSentenceTwoItalian: "La penna è rosa",  
        missingWordTwoItalian: "rosa", 
        
        missingSentenceOneSpanish: "El libro es verde", 
        missingWordOneSpanish: "verde", 
        missingSentenceTwoSpanish: "El bolígrafo es rosa",  
        missingWordTwoSpanish: "rosa", 
        
        missingSentenceOneFrench: "Le livre est vert", 
        missingWordOneFrench: "vert", 
        missingSentenceTwoFrench: "Le stylo est rose",  
        missingWordTwoFrench: "rose",        
               
        finished: false,
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 4, 

        missingSentenceOneHebrew: "המחשב שחור",
        missingSentenceTwoHebrew: "המקלדת לבנה",
        missingWordOneHebrew: "שחור",
        missingWordTwoHebrew: "לבנה",
        
        missingSentenceOneGerman: "Der Computer ist schwarz",
        missingWordOneGerman: "schwarz",
        missingSentenceTwoGerman: "Die Tastatur ist weiß",
        missingWordTwoGerman: "weiß",
        
        missingSentenceOneItalian: "Il computer è nero", 
        missingWordOneItalian: "nero", 
        missingSentenceTwoItalian: "La tastiera è bianca",  
        missingWordTwoItalian: "bianca", 
        
        missingSentenceOneSpanish: "El ordenador es negro", 
        missingWordOneSpanish: "negro", 
        missingSentenceTwoSpanish: "El teclado es blanco",  
        missingWordTwoSpanish: "blanco", 
        
        missingSentenceOneFrench: "L'ordinateur est noir", 
        missingWordOneFrench: "noir", 
        missingSentenceTwoFrench: "Le clavier est blanc",  
        missingWordTwoFrench: "blanc",        
               
        finished: false,
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 5,

        missingSentenceOneHebrew: "הכובע אדום",
        missingSentenceTwoHebrew: "המעיל כחול",
        missingWordOneHebrew: "אדום",
        missingWordTwoHebrew: "כחול",
        
        missingSentenceOneGerman: "Der Hut ist rot",
        missingWordOneGerman: "rot",
        missingSentenceTwoGerman: "Der Mantel ist blau",
        missingWordTwoGerman: "blau",
        
        missingSentenceOneItalian: "Il cappello è rosso", 
        missingWordOneItalian: "rosso", 
        missingSentenceTwoItalian: "Il cappotto è blu",  
        missingWordTwoItalian: "blu", 
        
        missingSentenceOneSpanish: "El sombrero es rojo", 
        missingWordOneSpanish: "rojo", 
        missingSentenceTwoSpanish: "El abrigo es azul",  
        missingWordTwoSpanish: "azul", 
        
        missingSentenceOneFrench: "Le chapeau est rouge", 
        missingWordOneFrench: "rouge", 
        missingSentenceTwoFrench: "Le manteau est bleu",  
        missingWordTwoFrench: "bleu",        
               
        finished: false,
      },

      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 6,

        missingSentenceOneHebrew: "התיק ירוק",
        missingSentenceTwoHebrew: "הנעליים חומות",
        missingWordOneHebrew: "ירוק",
        missingWordTwoHebrew: "חומות",
        
        missingSentenceOneGerman: "Die Tasche ist grün",
        missingWordOneGerman: "grün",
        missingSentenceTwoGerman: "Die Schuhe sind braun",
        missingWordTwoGerman: "braun",
        
        missingSentenceOneItalian: "La borsa è verde", 
        missingWordOneItalian: "verde", 
        missingSentenceTwoItalian: "Le scarpe sono marroni",  
        missingWordTwoItalian: "marroni", 
        
        missingSentenceOneSpanish: "La bolsa es verde", 
        missingWordOneSpanish: "verde", 
        missingSentenceTwoSpanish: "Los zapatos son marrones",  
        missingWordTwoSpanish: "marrones", 
        
        missingSentenceOneFrench: "Le sac est vert", 
        missingWordOneFrench: "vert", 
        missingSentenceTwoFrench: "Les chaussures sont marron",  
        missingWordTwoFrench: "marron",        
               
        finished: false,
      },


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

const missingWordData = missingWords.map((missingWord) => ({
  ...missingWord,
  userId,
  courseId: getUuidByCourseName(courseIds, missingWord.courseNameEnglish),
}));

await db.insert(MissingWords).values(missingWordData).returning();
};