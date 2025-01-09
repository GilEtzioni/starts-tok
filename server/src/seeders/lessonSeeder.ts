import { Lessons} from "../drizzle/schema";
import { db } from "../drizzle/db";

async function seed() {

    console.log("Seeding database...");

    const userId = "user_2rLdvxl8OaqqsqX1Jv72KhuGq32"; 

    await db.insert(Lessons).values([
    /* level: A1-מבוא , course: Greetings-6 , lesson: 1 */
    { clerkUserId: userId , levelHebrew: "מבוא", levelEnglish: "A1",courseNameEnglish: "Greetings", courseId: 6, lessonId: 1,

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
      wordTwoGerman: "wie gehts", wordTwoHebrew: "מה שלומך",
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
      finished: false,
    },

    /* level: A1-מבוא , course: Greetings-6 , lesson: 2 */
    { clerkUserId: userId , levelHebrew: "מבוא", levelEnglish: "A1",courseNameEnglish: "Greetings", courseId: 6, lessonId: 2,

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
      finished: false,
    },

    /* level: A1-מבוא , course: Greetings-6 , lesson: 3 */
  { clerkUserId: userId , levelHebrew: "מבוא", levelEnglish: "A1", courseNameEnglish: "Greetings", courseId: 6, lessonId: 3,

    // sentence game 
    sentenceOneGerman: "Guten Tag, wie heißt du?", sentenceOneHebrew: "צהריים טובים, איך קוראים לך?",
    sentenceTwoGerman: "Ich heiße Anna", sentenceTwoHebrew: "קוראים לי אנה",

    // missing words game
    missingSentenceOneGerman: "Guten Abend! Ich heiße David", missingSentenceOneHebrew: "ערב טוב! קוראים לי דוד",
    missingWordOneGerman: "heiße", missingWordOneHebrew: "קוראים",
    missingSentenceTwoGerman: "Hallo! Wie heißt du?", missingSentenceTwoHebrew: "שלום! איך קוראים לך?",
    missingWordTwoGerman: "wie heißt", missingWordTwoHebrew: "איך קוראים",

    // word couples game
    wordOneGerman: "Guten Tag", wordOneHebrew: "צהריים טובים",
    wordTwoGerman: "Ich heiße", wordTwoHebrew: "קוראים לי",
    wordThreeGerman: "wie heißt", wordThreeHebrew: "איך קוראים",
    wordFourGerman: "Bruder", wordFourHebrew: "אח",
    wordFiveGerman: "Schwager", wordFiveHebrew: "גיס",
    wordSixGerman: "Freund", wordSixHebrew: "חבר",
    wordSevenGerman: "braun", wordSevenHebrew: "חום",
    wordEightGerman: "grau", wordEightHebrew: "אפור",
    wordNineGerman: "schwarz", wordNineHebrew: "שחור",
    wordTenGerman: "blau", wordTenHebrew: "כחול",
    wordElevenGerman: "fünf", wordElevenHebrew: "חמש",
    wordTwelveGerman: "zwölf", wordTwelveHebrew: "שתים עשרה",
    finished: false,
  },

  /* level: A1-מבוא , course: Greetings-6 , lesson: 4 */
{ clerkUserId: userId , levelHebrew: "מבוא", levelEnglish: "A1", courseNameEnglish: "Greetings", courseId: 6, lessonId: 4,

  // sentence game 
  sentenceOneGerman: "Entschuldigung, wie spät ist es?", sentenceOneHebrew: "סליחה, מה השעה?",
  sentenceTwoGerman: "Es ist drei Uhr", sentenceTwoHebrew: "השעה שלוש",

  // missing words game
  missingSentenceOneGerman: "Entschuldigung, ich verstehe nicht", missingSentenceOneHebrew: "סליחה, אני לא מבין",
  missingWordOneGerman: "verstehe", missingWordOneHebrew: "מבין",
  missingSentenceTwoGerman: "Ich komme aus Israel", missingSentenceTwoHebrew: "אני מישראל",
  missingWordTwoGerman: "Israel", missingWordTwoHebrew: "ישראל",

  // word couples game
  wordOneGerman: "Entschuldigung", wordOneHebrew: "סליחה",
  wordTwoGerman: "verstehe", wordTwoHebrew: "מבין",
  wordThreeGerman: "komme", wordThreeHebrew: "בָּא",
  wordFourGerman: "Uhr", wordFourHebrew: "שָׁעָה",
  wordFiveGerman: "es", wordFiveHebrew: "זה",
  wordSixGerman: "drei", wordSixHebrew: "שלוש",
  wordSevenGerman: "grün", wordSevenHebrew: "ירוק",
  wordEightGerman: "blau", wordEightHebrew: "כחול",
  wordNineGerman: "rot", wordNineHebrew: "אדום",
  wordTenGerman: "orange", wordTenHebrew: "כתום",
  wordElevenGerman: "eins", wordElevenHebrew: "אחד",
  wordTwelveGerman: "zwei", wordTwelveHebrew: "שתיים",
  finished: false,
},


/* level: A1-מבוא , course: Greetings-6 , lesson: 5 */
{ clerkUserId: userId , levelHebrew: "מבוא", levelEnglish: "A1", courseNameEnglish: "Greetings", courseId: 6, lessonId: 5,

  // sentence game 
  sentenceOneGerman: "Wo wohnst du?", sentenceOneHebrew: "איפה אתה גר?",
  sentenceTwoGerman: "Ich wohne in Berlin", sentenceTwoHebrew: "אני גר בברלין",

  // missing words game
  missingSentenceOneGerman: "Wie alt bist du?", missingSentenceOneHebrew: "בן כמה אתה?",
  missingWordOneGerman: "alt", missingWordOneHebrew: "בן",
  missingSentenceTwoGerman: "Ich bin zwanzig Jahre alt", missingSentenceTwoHebrew: "אני בן עשרים",
  missingWordTwoGerman: "zwanzig", missingWordTwoHebrew: "עשרים",

  // word couples game
  wordOneGerman: "Wo wohnst", wordOneHebrew: "איפה אתה גר",
  wordTwoGerman: "Ich wohne", wordTwoHebrew: "אני גר",
  wordThreeGerman: "Wie alt", wordThreeHebrew: "בן כמה",
  wordFourGerman: "bist", wordFourHebrew: "אתה",
  wordFiveGerman: "zwanzig", wordFiveHebrew: "עשרים",
  wordSixGerman: "Jahre", wordSixHebrew: "שנים",
  wordSevenGerman: "Berlin", wordSevenHebrew: "ברלין",
  wordEightGerman: "alt", wordEightHebrew: "בן",
  wordNineGerman: "Wohnort", wordNineHebrew: "מקום מגורים",
  wordTenGerman: "Stadt", wordTenHebrew: "עיר",
  wordElevenGerman: "Großstadt", wordElevenHebrew: "עיר גדולה",
  wordTwelveGerman: "Land", wordTwelveHebrew: "ארץ",
  finished: false,
},

/* level: A1-מבוא , course: Greetings-6 , lesson: 6 */
{ clerkUserId: userId , levelHebrew: "מבוא", levelEnglish: "A1", courseNameEnglish: "Greetings", courseId: 6, lessonId: 6,

  // sentence game 
  sentenceOneGerman: "Wie heißt das auf Deutsch?", sentenceOneHebrew: "איך קוראים לזה בגרמנית?",
  sentenceTwoGerman: "Das heißt Apfel", sentenceTwoHebrew: "קוראים לזה תפוח",

  // missing words game
  missingSentenceOneGerman: "Wie spät ist es jetzt?", missingSentenceOneHebrew: "מה השעה עכשיו?",
  missingWordOneGerman: "jetzt", missingWordOneHebrew: "עכשיו",
  missingSentenceTwoGerman: "Das ist mein Freund", missingSentenceTwoHebrew: "זה החבר שלי",
  missingWordTwoGerman: "mein", missingWordTwoHebrew: "שלי",

  // word couples game
  wordOneGerman: "Wie heißt", wordOneHebrew: "איך קוראים",
  wordTwoGerman: "das", wordTwoHebrew: "זה",
  wordThreeGerman: "auf Deutsch", wordThreeHebrew: "בגרמנית",
  wordFourGerman: "Apfel", wordFourHebrew: "תפוח",
  wordFiveGerman: "jetzt", wordFiveHebrew: "עכשיו",
  wordSixGerman: "mein", wordSixHebrew: "שלי",
  wordSevenGerman: "Freund", wordSevenHebrew: "חבר",
  wordEightGerman: "Haus", wordEightHebrew: "בית",
  wordNineGerman: "Buch", wordNineHebrew: "ספר",
  wordTenGerman: "Tisch", wordTenHebrew: "שולחן",
  wordElevenGerman: "Stuhl", wordElevenHebrew: "כיסא",
  wordTwelveGerman: "Fenster", wordTwelveHebrew: "חלון",
  finished: false,
},

    ]).returning({ id: Lessons.id });
}

seed();