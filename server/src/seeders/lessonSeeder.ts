import { drizzle } from "drizzle-orm/node-postgres";
import { Lessons} from "../drizzle/schema";
import { db } from "../drizzle/db";

async function seed() {
  try {
    console.log("Seeding database...");

    const items = await db.insert(Lessons).values([
    /* level: A1-מבוא , course: Greetings-6 , lesson: 1 */
    { levelHebrew: "מבוא", levelEnglish: "A1",courseNameEnglish: "Greetings", courseId: 6, lessonId: 1,

      // sentece game 
      sentenceOneGerman: "hallo wie gehts", sentenceOneHebrew: "היי מה שלומך",
      sentenceTwoGerman: "guten morgen", sentenceTwoHebrew: "בוקר טוב",

      // missing words game
      missingSentenceOneGerman: "Hallo! Ich bin Gil", missingSentenceOneHebrew: "שלום! קוראים לי גיל",
      missingWordOneGerman: "hallo", missingWordOneHebrew: "שלום",
      missingSentenceTwoGerman: "Guten morgen, wie gehts", missingSentenceTwoHebrew: "בוקר טוב, מה שלומך?",
      missingWordTwoGerman: "morgen", missingWordTwoHebrew: "בוקר",

      // word couples game
      wordOneGerman: "hallo", wordOneHebrew: "שלום",
      wordTwoGerman: "wie geths", wordTwoHebrew: "מה שלומך",
      wordThreeGerman: "rot", wordThreeHebrew: "אדום",
      wordFourGerman: "blau", wordFourHebrew: "כחול",
      wordFiveGerman: "vater", wordFiveHebrew: "אבא",
      wordSixGerman: "muter", wordSixHebrew: "אמא",
      wordSevenGerman: "gelb", wordSevenHebrew: "צהוב",
      wordEightGerman: "grün", wordEightHebrew: "ירוק",
      wordNineGerman: "sohn", wordNineHebrew: "בן",
      wordTenGerman: "onkel", wordTenHebrew: "דוד",
      wordElevenGerman: "morgen", wordElevenHebrew: "בוקר",
      wordTwelveGerman: "guten", wordTwelveHebrew: "טוב",
    },

    /* level: A1-מבוא , course: Greetings-6 , lesson: 2 */
    { levelHebrew: "מבוא", levelEnglish: "A1",courseNameEnglish: "Greetings", courseId: 6, lessonId: 2,

      // sentece game 
      sentenceOneGerman: "Tschüss, Bis bald", sentenceOneHebrew: "ביי, נתראה בקרוב",
      sentenceTwoGerman: "Guten Abend. Prost!", sentenceTwoHebrew: "ערב טוב. לחיים!",

      // missing words game
      missingSentenceOneGerman: "Hallo! Ich bin Noam", missingSentenceOneHebrew: "שלום! קוראים לי נעם",
      missingWordOneGerman: "Ich bin", missingWordOneHebrew: "קוראים לי",
      missingSentenceTwoGerman: "Guten Abend, Bis morgen", missingSentenceTwoHebrew: "ערב טוב, נתראה מחר",
      missingWordTwoGerman: "Guten Abend", missingWordTwoHebrew: "ערב טוב",

      // word couples game
      wordOneGerman: "Ich bin", wordOneHebrew: "קוראים לי",
      wordTwoGerman: "Guten Abend", wordTwoHebrew: "ערב טוב",
      wordThreeGerman: "Bis morgen", wordThreeHebrew: "נתראה  מחר",
      wordFourGerman: "Schwester", wordFourHebrew: "אחות",
      wordFiveGerman: "Tante", wordFiveHebrew: "דודה",
      wordSixGerman: "Großvater", wordSixHebrew: "סבא רבא",
      wordSevenGerman: "weiß", wordSevenHebrew: "לבן",
      wordEightGerman: "rosa", wordEightHebrew: "ורוד",
      wordNineGerman: "orange", wordNineHebrew: "כתום",
      wordTenGerman: "gelb", wordTenHebrew: "צהוב",
      wordElevenGerman: "vier", wordElevenHebrew: "ארבע",
      wordTwelveGerman: "zehn", wordTwelveHebrew: "עשר",
    },
    ]).returning({ id: Lessons.id });

    console.log("Seeding complete. Inserted items:", items);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1); // Exit with failure
  }
}

seed();