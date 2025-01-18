import { Lessons } from "../../drizzle/schema"; 
import { db } from "../../drizzle/db";
import { Lesson } from "../../types/seedersType";

export const lessonSeeder = async (userId: string, courseIds: Array<{ index: number; uuid: string; courseName: string }>) => {

  console.log("Seeding database...");

  const lessons: Lesson[] = [
    /* ---------------------------------------------------------------------------------------------------------------- */
      /* level: A1-מבוא , course: Colors-1 , lesson: 1 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 1,
    
        // sentence game
        sentenceOneGerman: "Das Auto ist rot",
        sentenceOneHebrew: "המכונית אדומה",
        sentenceTwoGerman: "Die Sonne ist gelb",
        sentenceTwoHebrew: "השמש צהובה",
    
        // missing words game
        missingSentenceOneGerman: "Das ist ein blaues Haus",
        missingSentenceOneHebrew: "זהו בית כחול",
        missingWordOneGerman: "blaues",
        missingWordOneHebrew: "כחול",
        missingSentenceTwoGerman: "Der Apfel ist grün",
        missingSentenceTwoHebrew: "התפוח ירוק",
        missingWordTwoGerman: "grün",
        missingWordTwoHebrew: "ירוק",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Colors-1 , lesson: 2 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 2,
    
        // sentence game
        sentenceOneGerman: "Die Blume ist rosa",
        sentenceOneHebrew: "הפרח ורוד",
        sentenceTwoGerman: "Der Himmel ist blau",
        sentenceTwoHebrew: "השמיים כחולים",
    
        // missing words game
        missingSentenceOneGerman: "Das Kleid ist weiß",
        missingSentenceOneHebrew: "השמלה לבנה",
        missingWordOneGerman: "weiß",
        missingWordOneHebrew: "לבן",
        missingSentenceTwoGerman: "Der Hund ist schwarz",
        missingSentenceTwoHebrew: "הכלב שחור",
        missingWordTwoGerman: "schwarz",
        missingWordTwoHebrew: "שחור",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Colors-1 , lesson: 3 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 3,
    
        // sentence game
        sentenceOneGerman: "Die Katze ist grau",
        sentenceOneHebrew: "החתול אפור",
        sentenceTwoGerman: "Die Blätter sind grün",
        sentenceTwoHebrew: "העלים ירוקים",
    
        // missing words game
        missingSentenceOneGerman: "Das Fahrrad ist rot",
        missingSentenceOneHebrew: "האופניים אדומים",
        missingWordOneGerman: "rot",
        missingWordOneHebrew: "אדום",
        missingSentenceTwoGerman: "Der Ball ist gelb",
        missingSentenceTwoHebrew: "הכדור צהוב",
        missingWordTwoGerman: "gelb",
        missingWordTwoHebrew: "צהוב",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Colors-1 , lesson: 4 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 4,
    
        // sentence game
        sentenceOneGerman: "Der Stuhl ist braun",
        sentenceOneHebrew: "הכיסא חום",
        sentenceTwoGerman: "Das Buch ist lila",
        sentenceTwoHebrew: "הספר סגול",
    
        // missing words game
        missingSentenceOneGerman: "Die Tasche ist orange",
        missingSentenceOneHebrew: "התיק כתום",
        missingWordOneGerman: "orange",
        missingWordOneHebrew: "כתום",
        missingSentenceTwoGerman: "Das Fenster ist blau",
        missingSentenceTwoHebrew: "החלון כחול",
        missingWordTwoGerman: "blau",
        missingWordTwoHebrew: "כחול",

        finished: false
      },
    
      /* level: A1-מבוא , course: Colors-1 , lesson: 5 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 5,
    
        // sentence game
        sentenceOneGerman: "Der Apfel ist rot",
        sentenceOneHebrew: "התפוח אדום",
        sentenceTwoGerman: "Die Lampe ist gelb",
        sentenceTwoHebrew: "המנורה צהובה",
    
        // missing words game
        missingSentenceOneGerman: "Die Wand ist grün",
        missingSentenceOneHebrew: "הקיר ירוק",
        missingWordOneGerman: "grün",
        missingWordOneHebrew: "ירוק",
        missingSentenceTwoGerman: "Der Boden ist braun",
        missingSentenceTwoHebrew: "הרצפה חומה",
        missingWordTwoGerman: "braun",
        missingWordTwoHebrew: "חום",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Colors-1 , lesson: 6 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Colors",
        lessonOneToSix: 6,
    
        // sentence game
        sentenceOneGerman: "Der Teppich ist grau",
        sentenceOneHebrew: "השגריג",
        sentenceTwoGerman: "Das Sofa ist braun",
        sentenceTwoHebrew: "הספה חומה",
    
        // missing words game
        missingSentenceOneGerman: "Die Tür ist orange",
        missingSentenceOneHebrew: "הדלת כתומה",
        missingWordOneGerman: "orange",
        missingWordOneHebrew: "כתום",
        missingSentenceTwoGerman: "Das Fenster ist blau",
        missingSentenceTwoHebrew: "החלון כחול",
        missingWordTwoGerman: "blau",
        missingWordTwoHebrew: "כחול",
    
        finished: false
      },

    /* ---------------------------------------------------------------------------------------------------------------- */

  /* level: A1-מבוא , course: Numbers-2 , lesson: 1 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Numbers",
    lessonOneToSix: 1,

    // sentence game
    sentenceOneGerman: "Eins, zwei, drei",
    sentenceOneHebrew: "אחד, שתיים, שלוש",
    sentenceTwoGerman: "Vier, fünf, sechs",
    sentenceTwoHebrew: "ארבע, חמש, שש",

    // missing words game
    missingSentenceOneGerman: "Sieben, acht, neun",
    missingSentenceOneHebrew: "שבע, שמונה, תשע",
    missingWordOneGerman: "sieben",
    missingWordOneHebrew: "שבע",
    missingSentenceTwoGerman: "Zehn, elf, zwölf",
    missingSentenceTwoHebrew: "עשר, אחת עשרה, שתים עשרה",
    missingWordTwoGerman: "zehn",
    missingWordTwoHebrew: "עשר",

    finished: false
  },

  /* level: A1-מבוא , course: Numbers-2 , lesson: 2 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Numbers",
    lessonOneToSix: 2,

    // sentence game
    sentenceOneGerman: "Dreizehn, vierzehn, fünfzehn",
    sentenceOneHebrew: "שלוש עשרה, ארבע עשרה, חמש עשרה",
    sentenceTwoGerman: "Sechzehn, siebzehn, achtzehn",
    sentenceTwoHebrew: "שש עשרה, שבע עשרה, שמונה עשרה",

    // missing words game
    missingSentenceOneGerman: "Neunzehn, zwanzig",
    missingSentenceOneHebrew: "תשע עשרה, עשרים",
    missingWordOneGerman: "neunzehn",
    missingWordOneHebrew: "תשע עשרה",
    missingSentenceTwoGerman: "Einundzwanzig, zweiundzwanzig",
    missingSentenceTwoHebrew: "עשרים ואחת, עשרים ושתיים",
    missingWordTwoGerman: "einundzwanzig",
    missingWordTwoHebrew: "עשרים ואחת",

    finished: false
  },

  /* level: A1-מבוא , course: Numbers-2 , lesson: 3 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Numbers",
    lessonOneToSix: 3,

    // sentence game
    sentenceOneGerman: "Fünfundzwanzig, sechsundzwanzig, siebenundzwanzig",
    sentenceOneHebrew: "עשרים וחמש, עשרים ושש, עשרים ושבע",
    sentenceTwoGerman: "Achtundzwanzig, neunundzwanzig, dreißig",
    sentenceTwoHebrew: "עשרים ושמונה, עשרים ותשע, שלושים",

    // missing words game
    missingSentenceOneGerman: "Einunddreißig, zweiunddreißig",
    missingSentenceOneHebrew: "שלושים ואחת, שלושים ושתיים",
    missingWordOneGerman: "einunddreißig",
    missingWordOneHebrew: "שלושים ואחת",
    missingSentenceTwoGerman: "Dreiunddreißig, vierunddreißig",
    missingSentenceTwoHebrew: "שלושים ושלוש, שלושים וארבע",
    missingWordTwoGerman: "dreiunddreißig",
    missingWordTwoHebrew: "שלושים ושלוש",

    finished: false
  },

  /* level: A1-מבוא , course: Numbers-2 , lesson: 4 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Numbers",
    lessonOneToSix: 4,

    // sentence game
    sentenceOneGerman: "Siebenunddreißig, achtunddreißig, neununddreißig",
    sentenceOneHebrew: "שלושים ושבע, שלושים ושמונה, שלושים ותשע",
    sentenceTwoGerman: "Vierzig, einundvierzig, zweiundvierzig",
    sentenceTwoHebrew: "ארבעים, ארבעים ואחת, ארבעים ושתיים",

    // missing words game
    missingSentenceOneGerman: "Dreiundvierzig, vierundvierzig",
    missingSentenceOneHebrew: "ארבעים ושלוש, ארבעים וארבע",
    missingWordOneGerman: "dreiundvierzig",
    missingWordOneHebrew: "ארבעים ושלוש",
    missingSentenceTwoGerman: "Fünfundvierzig, sechsundvierzig",
    missingSentenceTwoHebrew: "ארבעים וחמש, ארבעים ושש",
    missingWordTwoGerman: "fünfundvierzig",
    missingWordTwoHebrew: "ארבעים וחמש",

    finished: false
  },

  /* level: A1-מבוא , course: Numbers-2 , lesson: 5 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Numbers",
    lessonOneToSix: 5,

    // sentence game
    sentenceOneGerman: "Neunundvierzig, fünfzig, einundfünfzig",
    sentenceOneHebrew: "ארבעים ותשע, חמישים, חמישים ואחת",
    sentenceTwoGerman: "Zweiundfünfzig, dreiundfünfzig, vierundfünfzig",
    sentenceTwoHebrew: "חמישים ושתיים, חמישים ושלוש, חמישים וארבע",

    // missing words game
    missingSentenceOneGerman: "Fünfundfünfzig, sechsundfünfzig",
    missingSentenceOneHebrew: "חמישים וחמש, חמישים ושש",
    missingWordOneGerman: "fünfundfünfzig",
    missingWordOneHebrew: "חמישים וחמש",
    missingSentenceTwoGerman: "Siebenundfünfzig, achtundfünfzig",
    missingSentenceTwoHebrew: "חמישים ושבע, חמישים ושמונה",
    missingWordTwoGerman: "siebenundfünfzig",
    missingWordTwoHebrew: "חמישים ושבע",

    finished: false
  },

  /* level: A1-מבוא , course: Numbers-2 , lesson: 6 */
  {
    hebrewLevel: "מבוא",
    englishLevel: "A1",
    courseNameEnglish: "Numbers",
    lessonOneToSix: 6,

    // sentence game
    sentenceOneGerman: "Einundsechzig, zweiundsechzig, dreiundsechzig",
    sentenceOneHebrew: "שישים ואחת, שישים ושתיים, שישים ושלוש",
    sentenceTwoGerman: "Vierundsechzig, fünfundsechzig, sechsundsechzig",
    sentenceTwoHebrew: "שישים וארבע, שישים וחמש, שישים ושש",

    // missing words game
    missingSentenceOneGerman: "Siebenundsechzig, achtundsechzig",
    missingSentenceOneHebrew: "שישים ושבע, שישים ושמונה",
    missingWordOneGerman: "siebenundsechzig",
    missingWordOneHebrew: "שישים ושבע",
    missingSentenceTwoGerman: "Neunundsechzig, siebzig",
    missingSentenceTwoHebrew: "שישים ותשע, שבעים",
    missingWordTwoGerman: "neunundsechzig",
    missingWordTwoHebrew: "שישים ותשע",

    finished: false,
  },
  /* ---------------------------------------------------------------------------------------------------------------- */

    /* level: A1-מבוא , course: Family members-3 , lesson: 1 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family members",
      lessonOneToSix: 1,
  
      // sentence game
      sentenceOneGerman: "Das ist mein Vater",
      sentenceOneHebrew: "זה אבא שלי",
      sentenceTwoGerman: "Das ist meine Mutter",
      sentenceTwoHebrew: "זאת אמא שלי",
  
      // missing words game
      missingSentenceOneGerman: "Das ist mein Bruder",
      missingSentenceOneHebrew: "זה אח שלי",
      missingWordOneGerman: "Bruder",
      missingWordOneHebrew: "אח",
      missingSentenceTwoGerman: "Das ist meine Schwester",
      missingSentenceTwoHebrew: "זאת אחות שלי",
      missingWordTwoGerman: "Schwester",
      missingWordTwoHebrew: "אחות",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family members-3 , lesson: 2 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family members",
      lessonOneToSix: 2,
  
      // sentence game
      sentenceOneGerman: "Das ist mein Großvater",
      sentenceOneHebrew: "זה סבא שלי",
      sentenceTwoGerman: "Das ist meine Großmutter",
      sentenceTwoHebrew: "זאת סבתא שלי",
  
      // missing words game
      missingSentenceOneGerman: "Das ist mein Onkel",
      missingSentenceOneHebrew: "זה דוד שלי",
      missingWordOneGerman: "Onkel",
      missingWordOneHebrew: "דוד",
      missingSentenceTwoGerman: "Das ist meine Tante",
      missingSentenceTwoHebrew: "זאת דודה שלי",
      missingWordTwoGerman: "Tante",
      missingWordTwoHebrew: "דודה",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family members-3 , lesson: 3 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family members",
      lessonOneToSix: 3,
  
      // sentence game
      sentenceOneGerman: "Das ist mein Sohn",
      sentenceOneHebrew: "זה הבן שלי",
      sentenceTwoGerman: "Das ist meine Tochter",
      sentenceTwoHebrew: "זאת הבת שלי",
  
      // missing words game
      missingSentenceOneGerman: "Das ist mein Neffe",
      missingSentenceOneHebrew: "זה אחיין שלי",
      missingWordOneGerman: "Neffe",
      missingWordOneHebrew: "אחיין",
      missingSentenceTwoGerman: "Das ist meine Nichte",
      missingSentenceTwoHebrew: "זאת אחיינית שלי",
      missingWordTwoGerman: "Nichte",
      missingWordTwoHebrew: "אחיינית",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family members-3 , lesson: 4 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family members",
      lessonOneToSix: 4,
  
      // sentence game
      sentenceOneGerman: "Das ist mein Schwager",
      sentenceOneHebrew: "זה הגיס שלי",
      sentenceTwoGerman: "Das ist meine Schwägerin",
      sentenceTwoHebrew: "זאת הגיסה שלי",
  
      // missing words game
      missingSentenceOneGerman: "Das ist mein Großvater",
      missingSentenceOneHebrew: "זה סבא שלי",
      missingWordOneGerman: "Großvater",
      missingWordOneHebrew: "סבא",
      missingSentenceTwoGerman: "Das ist meine Großmutter",
      missingSentenceTwoHebrew: "זאת סבתא שלי",
      missingWordTwoGerman: "Großmutter",
      missingWordTwoHebrew: "סבתא",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family members-3 , lesson: 5 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family members",
      lessonOneToSix: 5,
  
      // sentence game
      sentenceOneGerman: "Das ist mein Cousin",
      sentenceOneHebrew: "זה בן דוד שלי",
      sentenceTwoGerman: "Das ist meine Cousine",
      sentenceTwoHebrew: "זאת בת דוד שלי",
  
      // missing words game
      missingSentenceOneGerman: "Das ist mein Schwager",
      missingSentenceOneHebrew: "זה גיס שלי",
      missingWordOneGerman: "Schwager",
      missingWordOneHebrew: "גיס",
      missingSentenceTwoGerman: "Das ist meine Schwägerin",
      missingSentenceTwoHebrew: "זאת גיסה שלי",
      missingWordTwoGerman: "Schwägerin",
      missingWordTwoHebrew: "גיסה",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Family members-3 , lesson: 6 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Family members",
      lessonOneToSix: 6,
  
      // sentence game
      sentenceOneGerman: "Das ist mein Ehemann",
      sentenceOneHebrew: "זה בעלי",
      sentenceTwoGerman: "Das ist meine Ehefrau",
      sentenceTwoHebrew: "זאת אשתי",
  
      // missing words game
      missingSentenceOneGerman: "Das ist mein Sohn",
      missingSentenceOneHebrew: "זה הבן שלי",
      missingWordOneGerman: "Sohn",
      missingWordOneHebrew: "בן",
      missingSentenceTwoGerman: "Das ist meine Tochter",
      missingSentenceTwoHebrew: "זאת הבת שלי",
      missingWordTwoGerman: "Tochter",
      missingWordTwoHebrew: "בת",
  
      finished: false
    },

   /* ---------------------------------------------------------------------------------------------------------------- */

    /* level: A1-מבוא , course: Days of the week-4 , lesson: 1 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the week",
      lessonOneToSix: 1,
  
      // sentence game
      sentenceOneGerman: "Heute ist Montag",
      sentenceOneHebrew: "היום יום שני",
      sentenceTwoGerman: "Morgen ist Dienstag",
      sentenceTwoHebrew: "מחר יום שלישי",
  
      // missing words game
      missingSentenceOneGerman: "Gestern war Sonntag",
      missingSentenceOneHebrew: "אתמול היה יום ראשון",
      missingWordOneGerman: "Sonntag",
      missingWordOneHebrew: "ראשון",
      missingSentenceTwoGerman: "Der Mittwoch ist in der Mitte der Woche",
      missingSentenceTwoHebrew: "יום רביעי הוא באמצע השבוע",
      missingWordTwoGerman: "Mittwoch",
      missingWordTwoHebrew: "רביעי",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the week-4 , lesson: 2 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the week",
      lessonOneToSix: 2,
  
      // sentence game
      sentenceOneGerman: "Der Freitag ist vor dem Wochenende",
      sentenceOneHebrew: "יום שישי הוא לפני סוף השבוע",
      sentenceTwoGerman: "Der Samstag ist ein Ruhetag",
      sentenceTwoHebrew: "יום שבת הוא יום מנוחה",
  
      // missing words game
      missingSentenceOneGerman: "Sonntag ist der letzte Tag der Woche",
      missingSentenceOneHebrew: "יום ראשון הוא היום האחרון בשבוע",
      missingWordOneGerman: "letzte",
      missingWordOneHebrew: "האחרון",
      missingSentenceTwoGerman: "Montag ist der erste Tag der Arbeitswoche",
      missingSentenceTwoHebrew: "יום שני הוא היום הראשון בשבוע העבודה",
      missingWordTwoGerman: "erste",
      missingWordTwoHebrew: "הראשון",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the week-4 , lesson: 3 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the week",
      lessonOneToSix: 3,
  
      // sentence game
      sentenceOneGerman: "Am Dienstag habe ich ein Meeting",
      sentenceOneHebrew: "ביום שלישי יש לי פגישה",
      sentenceTwoGerman: "Mittwoch ist der Mitte der Woche",
      sentenceTwoHebrew: "יום רביעי הוא באמצע השבוע",
  
      // missing words game
      missingSentenceOneGerman: "Donnerstag ist fast das Wochenende",
      missingSentenceOneHebrew: "יום חמישי הוא כמעט סוף השבוע",
      missingWordOneGerman: "fast",
      missingWordOneHebrew: "כמעט",
      missingSentenceTwoGerman: "Freitag ist ein Arbeitstag",
      missingSentenceTwoHebrew: "יום שישי הוא יום עבודה",
      missingWordTwoGerman: "Arbeitstag",
      missingWordTwoHebrew: "יום עבודה",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the week-4 , lesson: 4 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the week",
      lessonOneToSix: 4,
  
      // sentence game
      sentenceOneGerman: "Montag ist ein geschäftiger Tag",
      sentenceOneHebrew: "יום שני הוא יום עמוס",
      sentenceTwoGerman: "Sonntag ist ein Ruhetag",
      sentenceTwoHebrew: "יום ראשון הוא יום מנוחה",
  
      // missing words game
      missingSentenceOneGerman: "Dienstag ist der zweite Tag der Woche",
      missingSentenceOneHebrew: "יום שלישי הוא היום השני בשבוע",
      missingWordOneGerman: "zweite",
      missingWordOneHebrew: "השני",
      missingSentenceTwoGerman: "Mittwoch ist der Mitte der Woche",
      missingSentenceTwoHebrew: "יום רביעי הוא באמצע השבוע",
      missingWordTwoGerman: "Mitte",
      missingWordTwoHebrew: "אמצע",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the week-4 , lesson: 5 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the week",
      lessonOneToSix: 5,
  
      // sentence game
      sentenceOneGerman: "Samstag ist ein freier Tag",
      sentenceOneHebrew: "יום שבת הוא יום חופשי",
      sentenceTwoGerman: "Freitag ist der letzte Arbeitstag",
      sentenceTwoHebrew: "יום שישי הוא היום האחרון לעבודה",
  
      // missing words game
      missingSentenceOneGerman: "Montag beginnt die Woche",
      missingSentenceOneHebrew: "יום שני מתחיל את השבוע",
      missingWordOneGerman: "beginnt",
      missingWordOneHebrew: "מתחיל",
      missingSentenceTwoGerman: "Sonntag ist ein Tag der Ruhe",
      missingSentenceTwoHebrew: "יום ראשון הוא יום מנוחה",
      missingWordTwoGerman: "Ruhe",
      missingWordTwoHebrew: "מנוחה",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Days of the week-4 , lesson: 6 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Days of the week",
      lessonOneToSix: 6,
  
      // sentence game
      sentenceOneGerman: "Am Wochenende ruhe ich mich aus",
      sentenceOneHebrew: "בסוף השבוע אני נחה",
      sentenceTwoGerman: "Montag fange ich an zu arbeiten",
      sentenceTwoHebrew: "ביום שני אני מתחילה לעבוד",
  
      // missing words game
      missingSentenceOneGerman: "Mittwoch bin ich immer fleißig",
      missingSentenceOneHebrew: "ביום רביעי אני תמיד חרוצה",
      missingWordOneGerman: "fleißig",
      missingWordOneHebrew: "חרוצה",
      missingSentenceTwoGerman: "Donnerstag ist ein langer Tag",
      missingSentenceTwoHebrew: "יום חמישי הוא יום ארוך",
      missingWordTwoGerman: "langer",
      missingWordTwoHebrew: "ארוך",
  
      finished: false
    },

    /* ---------------------------------------------------------------------------------------------------------------- */

      /* level: A1-מבוא , course: Months-4 , lesson: 1 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Months",
        lessonOneToSix: 1,
    
        // sentence game
        sentenceOneGerman: "Januar ist der erste Monat des Jahres",
        sentenceOneHebrew: "ינואר הוא החודש הראשון של השנה",
        sentenceTwoGerman: "Februar hat 28 oder 29 Tage",
        sentenceTwoHebrew: "לפברואר יש 28 או 29 ימים",
    
        // missing words game
        missingSentenceOneGerman: "März ist der dritte Monat",
        missingSentenceOneHebrew: "מרץ הוא החודש השלישי",
        missingWordOneGerman: "März",
        missingWordOneHebrew: "מרץ",
        missingSentenceTwoGerman: "April kommt nach März",
        missingSentenceTwoHebrew: "אפריל מגיע אחרי מרץ",
        missingWordTwoGerman: "April",
        missingWordTwoHebrew: "אפריל",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Months-4 , lesson: 2 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Months",
        lessonOneToSix: 2,
    
        // sentence game
        sentenceOneGerman: "Der Mai ist schön und sonnig",
        sentenceOneHebrew: "מאי הוא חודש יפה ושמשי",
        sentenceTwoGerman: "Juli ist heiß",
        sentenceTwoHebrew: "יולי חם",
    
        // missing words game
        missingSentenceOneGerman: "Juni ist vor Juli",
        missingSentenceOneHebrew: "יוני הוא לפני יולי",
        missingWordOneGerman: "Juni",
        missingWordOneHebrew: "יוני",
        missingSentenceTwoGerman: "August ist oft heiß",
        missingSentenceTwoHebrew: "אוגוסט הוא לעיתים קרובות חם",
        missingWordTwoGerman: "August",
        missingWordTwoHebrew: "אוגוסט",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Months-4 , lesson: 3 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Months",
        lessonOneToSix: 3,
    
        // sentence game
        sentenceOneGerman: "September ist der Anfang des Herbstes",
        sentenceOneHebrew: "ספטמבר הוא תחילת הסתיו",
        sentenceTwoGerman: "Oktober ist kühl",
        sentenceTwoHebrew: "אוקטובר קריר",
    
        // missing words game
        missingSentenceOneGerman: "November ist oft regnerisch",
        missingSentenceOneHebrew: "נובמבר הוא לעיתים קרובות גשום",
        missingWordOneGerman: "November",
        missingWordOneHebrew: "נובמבר",
        missingSentenceTwoGerman: "Dezember ist der letzte Monat",
        missingSentenceTwoHebrew: "דצמבר הוא החודש האחרון",
        missingWordTwoGerman: "Dezember",
        missingWordTwoHebrew: "דצמבר",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Months-4 , lesson: 4 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Months",
        lessonOneToSix: 4,
    
        // sentence game
        sentenceOneGerman: "Im Februar ist es kalt",
        sentenceOneHebrew: "בפברואר קר",
        sentenceTwoGerman: "Im März blühen die Blumen",
        sentenceTwoHebrew: "במרץ הפרחים פורחים",
    
        // missing words game
        missingSentenceOneGerman: "Im April regnet es oft",
        missingSentenceOneHebrew: "באפריל יורד לעיתים קרובות גשם",
        missingWordOneGerman: "April",
        missingWordOneHebrew: "אפריל",
        missingSentenceTwoGerman: "Im Mai scheint die Sonne",
        missingSentenceTwoHebrew: "במאי השמש זורחת",
        missingWordTwoGerman: "Mai",
        missingWordTwoHebrew: "מאי",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Months-4 , lesson: 5 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Months",
        lessonOneToSix: 5,
    
        // sentence game
        sentenceOneGerman: "Im Juni sind die Tage lang",
        sentenceOneHebrew: "ביוני הימים ארוכים",
        sentenceTwoGerman: "Im Juli ist es heiß",
        sentenceTwoHebrew: "ביולי חם",
    
        // missing words game
        missingSentenceOneGerman: "Im August sind viele im Urlaub",
        missingSentenceOneHebrew: "באוגוסט רבים בחופשה",
        missingWordOneGerman: "August",
        missingWordOneHebrew: "אוגוסט",
        missingSentenceTwoGerman: "Im September beginnt die Schule",
        missingSentenceTwoHebrew: "בספטמבר מתחילה שנת הלימודים",
        missingWordTwoGerman: "September",
        missingWordTwoHebrew: "ספטמבר",
    
        finished: false
      },
    
      /* level: A1-מבוא , course: Months-4 , lesson: 6 */
      {
        hebrewLevel: "מבוא",
        englishLevel: "A1",
        courseNameEnglish: "Months",
        lessonOneToSix: 6,
    
        // sentence game
        sentenceOneGerman: "Im Oktober fallen die Blätter",
        sentenceOneHebrew: "באוקטובר העלים נושרים",
        sentenceTwoGerman: "Im Dezember ist es kalt",
        sentenceTwoHebrew: "בדצמבר קר",
    
        // missing words game
        missingSentenceOneGerman: "Im November regnet es viel",
        missingSentenceOneHebrew: "בנובמבר יורד הרבה גשם",
        missingWordOneGerman: "November",
        missingWordOneHebrew: "נובמבר",
        missingSentenceTwoGerman: "Im Januar beginnt das neue Jahr",
        missingSentenceTwoHebrew: "בינואר מתחילה השנה החדשה",
        missingWordTwoGerman: "Januar",
        missingWordTwoHebrew: "ינואר",
    
        finished: false
      },

  /* ---------------------------------------------------------------------------------------------------------------- */

    /* level: A1-מבוא , course: Greetings-6 , lesson: 1 */
    { hebrewLevel: "מבוא", englishLevel: "A1",courseNameEnglish: "Greetings", lessonOneToSix: 1,

      // sentece game 
      sentenceOneGerman: "hallo wie gehts", sentenceOneHebrew: "היי מה שלומך",
      sentenceTwoGerman: "guten morgen", sentenceTwoHebrew: "בוקר טוב",

      // missing words game
      missingSentenceOneGerman: "Hallo! Ich bin Gil", missingSentenceOneHebrew: "שלום! קוראים לי גיל",
      missingWordOneGerman: "hallo", missingWordOneHebrew: "שלום",
      missingSentenceTwoGerman: "Guten morgen, wie gehts", missingSentenceTwoHebrew: "בוקר טוב, מה שלומך?",
      missingWordTwoGerman: "morgen", missingWordTwoHebrew: "בוקר",

      finished: false,
    },

    /* level: A1-מבוא , course: Greetings-6 , lesson: 2 */
    { hebrewLevel: "מבוא", englishLevel: "A1",courseNameEnglish: "Greetings", lessonOneToSix: 2,

      // sentece game 
      sentenceOneGerman: "Tschüss, Bis bald", sentenceOneHebrew: "ביי, נתראה בקרוב",
      sentenceTwoGerman: "Guten Abend. Prost!", sentenceTwoHebrew: "ערב טוב. לחיים!",

      // missing words game
      missingSentenceOneGerman: "Hallo! Ich bin Noam", missingSentenceOneHebrew: "שלום! קוראים לי נעם",
      missingWordOneGerman: "Ich bin", missingWordOneHebrew: "קוראים לי",
      missingSentenceTwoGerman: "Guten Abend, Bis morgen", missingSentenceTwoHebrew: "ערב טוב, נתראה מחר",
      missingWordTwoGerman: "Guten Abend", missingWordTwoHebrew: "ערב טוב",

      finished: false,
    },

    /* level: A1-מבוא , course: Greetings-6 , lesson: 3 */
  { hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Greetings", lessonOneToSix: 3,

    // sentence game 
    sentenceOneGerman: "Guten Tag, wie heißt du?", sentenceOneHebrew: "צהריים טובים, איך קוראים לך?",
    sentenceTwoGerman: "Ich heiße Anna", sentenceTwoHebrew: "קוראים לי אנה",

    // missing words game
    missingSentenceOneGerman: "Guten Abend! Ich heiße David", missingSentenceOneHebrew: "ערב טוב! קוראים לי דוד",
    missingWordOneGerman: "heiße", missingWordOneHebrew: "קוראים",
    missingSentenceTwoGerman: "Hallo! Wie heißt du?", missingSentenceTwoHebrew: "שלום! איך קוראים לך?",
    missingWordTwoGerman: "wie heißt", missingWordTwoHebrew: "איך קוראים",

    finished: false,
  },

  /* level: A1-מבוא , course: Greetings-6 , lesson: 4 */
{ hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Greetings", lessonOneToSix: 4,

  // sentence game 
  sentenceOneGerman: "Entschuldigung, wie spät ist es?", sentenceOneHebrew: "סליחה, מה השעה?",
  sentenceTwoGerman: "Es ist drei Uhr", sentenceTwoHebrew: "השעה שלוש",

  // missing words game
  missingSentenceOneGerman: "Entschuldigung, ich verstehe nicht", missingSentenceOneHebrew: "סליחה, אני לא מבין",
  missingWordOneGerman: "verstehe", missingWordOneHebrew: "מבין",
  missingSentenceTwoGerman: "Ich komme aus Israel", missingSentenceTwoHebrew: "אני מישראל",
  missingWordTwoGerman: "Israel", missingWordTwoHebrew: "ישראל",

  finished: false,
},


/* level: A1-מבוא , course: Greetings-6 , lesson: 5 */
{ hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Greetings", lessonOneToSix: 5,

  // sentence game 
  sentenceOneGerman: "Wo wohnst du?", sentenceOneHebrew: "איפה אתה גר?",
  sentenceTwoGerman: "Ich wohne in Berlin", sentenceTwoHebrew: "אני גר בברלין",

  // missing words game
  missingSentenceOneGerman: "Wie alt bist du?", missingSentenceOneHebrew: "בן כמה אתה?",
  missingWordOneGerman: "alt", missingWordOneHebrew: "בן",
  missingSentenceTwoGerman: "Ich bin zwanzig Jahre alt", missingSentenceTwoHebrew: "אני בן עשרים",
  missingWordTwoGerman: "zwanzig", missingWordTwoHebrew: "עשרים",

  finished: false,
},

/* level: A1-מבוא , course: Greetings-6 , lesson: 6 */
{ hebrewLevel: "מבוא", englishLevel: "A1", courseNameEnglish: "Greetings", lessonOneToSix: 6,

  // sentence game 
  sentenceOneGerman: "Wie heißt das auf Deutsch?", sentenceOneHebrew: "איך קוראים לזה בגרמנית?",
  sentenceTwoGerman: "Das heißt Apfel", sentenceTwoHebrew: "קוראים לזה תפוח",

  // missing words game
  missingSentenceOneGerman: "Wie spät ist es jetzt?", missingSentenceOneHebrew: "מה השעה עכשיו?",
  missingWordOneGerman: "jetzt", missingWordOneHebrew: "עכשיו",
  missingSentenceTwoGerman: "Das ist mein Freund", missingSentenceTwoHebrew: "זה החבר שלי",
  missingWordTwoGerman: "mein", missingWordTwoHebrew: "שלי",

  finished: false,
},

  /* ---------------------------------------------------------------------------------------------------------------- */

    /* level: A1-מבוא , course: Weather-7 , lesson: 1 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Weather",
      lessonOneToSix: 1,
  
      // sentence game
      sentenceOneGerman: "Heute ist es sonnig",
      sentenceOneHebrew: "היום יש שמש",
      sentenceTwoGerman: "Es regnet am Nachmittag",
      sentenceTwoHebrew: "יורד גשם אחר הצהריים",
  
      // missing words game
      missingSentenceOneGerman: "Im Winter ist es kalt",
      missingSentenceOneHebrew: "בחורף קר",
      missingWordOneGerman: "kalt",
      missingWordOneHebrew: "קר",
      missingSentenceTwoGerman: "Im Sommer ist es warm",
      missingSentenceTwoHebrew: "בקיץ חם",
      missingWordTwoGerman: "warm",
      missingWordTwoHebrew: "חם",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Weather-7 , lesson: 2 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Weather",
      lessonOneToSix: 2,
  
      // sentence game
      sentenceOneGerman: "Es ist heute sehr windig",
      sentenceOneHebrew: "היום יש הרבה רוח",
      sentenceTwoGerman: "Der Himmel ist bewölkt",
      sentenceTwoHebrew: "השמיים מעוננים",
  
      // missing words game
      missingSentenceOneGerman: "Im Herbst fallen die Blätter",
      missingSentenceOneHebrew: "בסתיו העלים נושרים",
      missingWordOneGerman: "Herbst",
      missingWordOneHebrew: "סתיו",
      missingSentenceTwoGerman: "Im Frühling blühen die Blumen",
      missingSentenceTwoHebrew: "באביב הפרחים פורחים",
      missingWordTwoGerman: "Frühling",
      missingWordTwoHebrew: "אביב",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Weather-7 , lesson: 3 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Weather",
      lessonOneToSix: 3,
  
      // sentence game
      sentenceOneGerman: "Heute gibt es ein Gewitter",
      sentenceOneHebrew: "היום יש סופת רעמים",
      sentenceTwoGerman: "Es schneit im Winter",
      sentenceTwoHebrew: "יורד שלג בחורף",
  
      // missing words game
      missingSentenceOneGerman: "Im Sommer ist der Himmel klar",
      missingSentenceOneHebrew: "בקיץ השמיים בהירים",
      missingWordOneGerman: "klar",
      missingWordOneHebrew: "בהיר",
      missingSentenceTwoGerman: "Im Winter gibt es Frost",
      missingSentenceTwoHebrew: "בחורף יש כפור",
      missingWordTwoGerman: "Frost",
      missingWordTwoHebrew: "כפור",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Weather-7 , lesson: 4 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Weather",
      lessonOneToSix: 4,
  
      // sentence game
      sentenceOneGerman: "Es ist heute neblig",
      sentenceOneHebrew: "היום יש ערפל",
      sentenceTwoGerman: "Der Wind weht stark",
      sentenceTwoHebrew: "הרוח נושבת חזק",
  
      // missing words game
      missingSentenceOneGerman: "Im Herbst ist es oft stürmisch",
      missingSentenceOneHebrew: "בסתייו יש לעיתים קרובות סופות",
      missingWordOneGerman: "stürmisch",
      missingWordOneHebrew: "סוער",
      missingSentenceTwoGerman: "Im Frühling blühen die Bäume",
      missingSentenceTwoHebrew: "באביב העצים פורחים",
      missingWordTwoGerman: "Bäume",
      missingWordTwoHebrew: "עצים",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Weather-7 , lesson: 5 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Weather",
      lessonOneToSix: 5,
  
      // sentence game
      sentenceOneGerman: "Es ist kalt und windig",
      sentenceOneHebrew: "קר ויש רוח",
      sentenceTwoGerman: "Im Sommer ist es sonnig",
      sentenceTwoHebrew: "בקיץ יש שמש",
  
      // missing words game
      missingSentenceOneGerman: "Der Regen hört auf",
      missingSentenceOneHebrew: "הגשם מפסיק",
      missingWordOneGerman: "hört auf",
      missingWordOneHebrew: "מפסיק",
      missingSentenceTwoGerman: "Es gibt heute keine Wolken",
      missingSentenceTwoHebrew: "אין היום עננים",
      missingWordTwoGerman: "Wolken",
      missingWordTwoHebrew: "עננים",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Weather-7 , lesson: 6 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Weather",
      lessonOneToSix: 6,
  
      // sentence game
      sentenceOneGerman: "Im Frühling gibt es viele Blumen",
      sentenceOneHebrew: "באביב יש הרבה פרחים",
      sentenceTwoGerman: "Im Winter bleibt es lange dunkel",
      sentenceTwoHebrew: "בחורף נשאר חשוך לזמן ארוך",
  
      // missing words game
      missingSentenceOneGerman: "Im Sommer scheint die Sonne stark",
      missingSentenceOneHebrew: "בקיץ השמש זורחת חזק",
      missingWordOneGerman: "scheint",
      missingWordOneHebrew: "זורחת",
      missingSentenceTwoGerman: "Im Herbst ist der Wind kühl",
      missingSentenceTwoHebrew: "בסתייו הרוח קריר",
      missingWordTwoGerman: "kühl",
      missingWordTwoHebrew: "קריר",
  
      finished: false
    },
  
  /* ---------------------------------------------------------------------------------------------------------------- */

    /* level: A1-מבוא , course: Basic clothing-8 , lesson: 1 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Basic clothing",
      lessonOneToSix: 1,
  
      // sentence game
      sentenceOneGerman: "Ich trage eine Jacke",
      sentenceOneHebrew: "אני לובש מעיל",
      sentenceTwoGerman: "Sie trägt ein Kleid",
      sentenceTwoHebrew: "היא לובשת שמלה",
  
      // missing words game
      missingSentenceOneGerman: "Er trägt einen Hut",
      missingSentenceOneHebrew: "הוא חובש כובע",
      missingWordOneGerman: "Hut",
      missingWordOneHebrew: "כובע",
      missingSentenceTwoGerman: "Ich ziehe meine Schuhe an",
      missingSentenceTwoHebrew: "אני נועל את הנעליים שלי",
      missingWordTwoGerman: "Schuhe",
      missingWordTwoHebrew: "נעליים",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Basic clothing-8 , lesson: 2 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Basic clothing",
      lessonOneToSix: 2,
  
      // sentence game
      sentenceOneGerman: "Die Socken sind blau",
      sentenceOneHebrew: "הגרביים כחולים",
      sentenceTwoGerman: "Er trägt eine Hose",
      sentenceTwoHebrew: "הוא לובש מכנסיים",
  
      // missing words game
      missingSentenceOneGerman: "Ich brauche einen Schal",
      missingSentenceOneHebrew: "אני צריך צעיף",
      missingWordOneGerman: "Schal",
      missingWordOneHebrew: "צעיף",
      missingSentenceTwoGerman: "Sie trägt Handschuhe",
      missingSentenceTwoHebrew: "היא לובשת כפפות",
      missingWordTwoGerman: "Handschuhe",
      missingWordTwoHebrew: "כפפות",

      finished: false
    },
  
    /* level: A1-מבוא , course: Basic clothing-8 , lesson: 3 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Basic clothing",
      lessonOneToSix: 3,
  
      // sentence game
      sentenceOneGerman: "Der Hut ist schwarz",
      sentenceOneHebrew: "הכובע שחור",
      sentenceTwoGerman: "Die Handschuhe sind rot",
      sentenceTwoHebrew: "הכפפות אדומות",
  
      // missing words game
      missingSentenceOneGerman: "Die Schuhe sind neu",
      missingSentenceOneHebrew: "הנעליים חדשות",
      missingWordOneGerman: "Schuhe",
      missingWordOneHebrew: "נעליים",
      missingSentenceTwoGerman: "Ich trage ein Hemd",
      missingSentenceTwoHebrew: "אני לובש חולצה",
      missingWordTwoGerman: "Hemd",
      missingWordTwoHebrew: "חולצה",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Basic clothing-8 , lesson: 4 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Basic clothing",
      lessonOneToSix: 4,
  
      // sentence game
      sentenceOneGerman: "Der Mantel ist lang",
      sentenceOneHebrew: "המעיל ארוך",
      sentenceTwoGerman: "Die Schuhe sind bequem",
      sentenceTwoHebrew: "הנעליים נוחות",
  
      // missing words game
      missingSentenceOneGerman: "Das T-Shirt ist weiß",
      missingSentenceOneHebrew: "הטי שירט לבנה",
      missingWordOneGerman: "weiß",
      missingWordOneHebrew: "לבן",
      missingSentenceTwoGerman: "Die Hose ist blau",
      missingSentenceTwoHebrew: "המכנסיים כחולים",
      missingWordTwoGerman: "blau",
      missingWordTwoHebrew: "כחול",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Basic clothing-8 , lesson: 5 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Basic clothing",
      lessonOneToSix: 5,
  
      // sentence game
      sentenceOneGerman: "Das Hemd ist neu",
      sentenceOneHebrew: "החולצה חדשה",
      sentenceTwoGerman: "Die Socken sind bunt",
      sentenceTwoHebrew: "הגרביים צבעוניים",
  
      // missing words game
      missingSentenceOneGerman: "Die Jacke ist warm",
      missingSentenceOneHebrew: "המעיל חם",
      missingWordOneGerman: "warm",
      missingWordOneHebrew: "חם",
      missingSentenceTwoGerman: "Der Hut ist groß",
      missingSentenceTwoHebrew: "הכובע גדול",
      missingWordTwoGerman: "groß",
      missingWordTwoHebrew: "גדול",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Basic clothing-8 , lesson: 6 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Basic clothing",
      lessonOneToSix: 6,
  
      // sentence game
      sentenceOneGerman: "Der Schal ist rot",
      sentenceOneHebrew: "הצעיף אדום",
      sentenceTwoGerman: "Die Schuhe sind schwarz",
      sentenceTwoHebrew: "הנעליים שחורות",
  
      // missing words game
      missingSentenceOneGerman: "Die Handschuhe sind klein",
      missingSentenceOneHebrew: "הכפפות קטנות",
      missingWordOneGerman: "klein",
      missingWordOneHebrew: "קטן",
      missingSentenceTwoGerman: "Das Kleid ist elegant",
      missingSentenceTwoHebrew: "השמלה אלגנטית",
      missingWordTwoGerman: "elegant",
      missingWordTwoHebrew: "אלגנטי",
  
      finished: false
    },
  
  /* ---------------------------------------------------------------------------------------------------------------- */

    /* level: A1-מבוא , course: Common food items-9 , lesson: 1 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Common food items",
      lessonOneToSix: 1,
  
      // sentence game
      sentenceOneGerman: "Ich esse einen Apfel",
      sentenceOneHebrew: "אני אוכל תפוח",
      sentenceTwoGerman: "Sie trinkt Wasser",
      sentenceTwoHebrew: "היא שותה מים",
  
      // missing words game
      missingSentenceOneGerman: "Er isst ein Brot",
      missingSentenceOneHebrew: "הוא אוכל לחם",
      missingWordOneGerman: "Brot",
      missingWordOneHebrew: "לחם",
      missingSentenceTwoGerman: "Ich mag Käse",
      missingSentenceTwoHebrew: "אני אוהב גבינה",
      missingWordTwoGerman: "Käse",
      missingWordTwoHebrew: "גבינה",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Common food items-9 , lesson: 2 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Common food items",
      lessonOneToSix: 2,
  
      // sentence game
      sentenceOneGerman: "Ich kaufe Gemüse",
      sentenceOneHebrew: "אני קונה ירקות",
      sentenceTwoGerman: "Sie isst eine Banane",
      sentenceTwoHebrew: "היא אוכלת בננה",
  
      // missing words game
      missingSentenceOneGerman: "Wir trinken Saft",
      missingSentenceOneHebrew: "אנחנו שותים מיץ",
      missingWordOneGerman: "Saft",
      missingWordOneHebrew: "מיץ",
      missingSentenceTwoGerman: "Er hat einen Kuchen",
      missingSentenceTwoHebrew: "יש לו עוגה",
      missingWordTwoGerman: "Kuchen",
      missingWordTwoHebrew: "עוגה",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Common food items-9 , lesson: 3 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Common food items",
      lessonOneToSix: 3,
  
      // sentence game
      sentenceOneGerman: "Das Brot ist frisch",
      sentenceOneHebrew: "הלחם טרי",
      sentenceTwoGerman: "Der Käse ist lecker",
      sentenceTwoHebrew: "הגבינה טעימה",
  
      // missing words game
      missingSentenceOneGerman: "Ich möchte einen Fisch",
      missingSentenceOneHebrew: "אני רוצה דג",
      missingWordOneGerman: "Fisch",
      missingWordOneHebrew: "דג",
      missingSentenceTwoGerman: "Wir haben Salz und Zucker",
      missingSentenceTwoHebrew: "יש לנו מלח וסוכר",
      missingWordTwoGerman: "Zucker",
      missingWordTwoHebrew: "סוכר",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Common food items-9 , lesson: 4 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Common food items",
      lessonOneToSix: 4,
  
      // sentence game
      sentenceOneGerman: "Wir essen Reis",
      sentenceOneHebrew: "אנחנו אוכלים אורז",
      sentenceTwoGerman: "Der Kuchen ist süß",
      sentenceTwoHebrew: "העוגה מתוקה",
  
      // missing words game
      missingSentenceOneGerman: "Das Gemüse ist frisch",
      missingSentenceOneHebrew: "הירקות טריים",
      missingWordOneGerman: "Gemüse",
      missingWordOneHebrew: "ירקות",
      missingSentenceTwoGerman: "Ich trinke Milch",
      missingSentenceTwoHebrew: "אני שותה חלב",
      missingWordTwoGerman: "Milch",
      missingWordTwoHebrew: "חלב",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Common food items-9 , lesson: 5 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Common food items",
      lessonOneToSix: 5,
  
      // sentence game
      sentenceOneGerman: "Der Apfel ist rot",
      sentenceOneHebrew: "התפוח אדום",
      sentenceTwoGerman: "Die Banane ist gelb",
      sentenceTwoHebrew: "הבננה צהובה",
  
      // missing words game
      missingSentenceOneGerman: "Das Fleisch ist frisch",
      missingSentenceOneHebrew: "הבשר טרי",
      missingWordOneGerman: "Fleisch",
      missingWordOneHebrew: "בשר",
      missingSentenceTwoGerman: "Der Reis ist gekocht",
      missingSentenceTwoHebrew: "האורז מבושל",
      missingWordTwoGerman: "gekocht",
      missingWordTwoHebrew: "מבושל",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: Common food items-9 , lesson: 6 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "Common food items",
      lessonOneToSix: 6,
  
      // sentence game
      sentenceOneGerman: "Ich trinke Wasser",
      sentenceOneHebrew: "אני שותה מים",
      sentenceTwoGerman: "Wir essen Gemüse",
      sentenceTwoHebrew: "אנחנו אוכלים ירקות",
  
      // missing words game
      missingSentenceOneGerman: "Der Zucker ist süß",
      missingSentenceOneHebrew: "הסוכר מתוק",
      missingWordOneGerman: "süß",
      missingWordOneHebrew: "מתוק",
      missingSentenceTwoGerman: "Das Salz ist weiß",
      missingSentenceTwoHebrew: "המלח לבן",
      missingWordTwoGerman: "weiß",
      missingWordTwoHebrew: "לבן",
  
      finished: false
    },
  


  /* ---------------------------------------------------------------------------------------------------------------- */

    /* level: A1-מבוא , course: House parts-10 , lesson: 1 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "House parts",
      lessonOneToSix: 1,
  
      // sentence game
      sentenceOneGerman: "Das Wohnzimmer ist groß",
      sentenceOneHebrew: "הסלון גדול",
      sentenceTwoGerman: "Die Küche ist modern",
      sentenceTwoHebrew: "המטבח מודרני",
  
      // missing words game
      missingSentenceOneGerman: "Das Badezimmer hat eine Dusche",
      missingSentenceOneHebrew: "בחדר האמבטיה יש מקלחת",
      missingWordOneGerman: "Badezimmer",
      missingWordOneHebrew: "חדר אמבטיה",
      missingSentenceTwoGerman: "Das Schlafzimmer hat ein Bett",
      missingSentenceTwoHebrew: "בחדר השינה יש מיטה",
      missingWordTwoGerman: "Bett",
      missingWordTwoHebrew: "מיטה",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: House parts-10 , lesson: 2 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "House parts",
      lessonOneToSix: 2,
  
      // sentence game
      sentenceOneGerman: "Die Tür ist geschlossen",
      sentenceOneHebrew: "הדלת סגורה",
      sentenceTwoGerman: "Das Fenster ist offen",
      sentenceTwoHebrew: "החלון פתוח",
  
      // missing words game
      missingSentenceOneGerman: "Die Decke ist hoch",
      missingSentenceOneHebrew: "התקרה גבוהה",
      missingWordOneGerman: "Decke",
      missingWordOneHebrew: "תקרה",
      missingSentenceTwoGerman: "Die Wand ist weiß",
      missingSentenceTwoHebrew: "הקיר לבן",
      missingWordTwoGerman: "Wand",
      missingWordTwoHebrew: "קיר",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: House parts-10 , lesson: 3 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "House parts",
      lessonOneToSix: 3,
  
      // sentence game
      sentenceOneGerman: "Der Boden ist sauber",
      sentenceOneHebrew: "הרצפה נקייה",
      sentenceTwoGerman: "Die Lampe ist kaputt",
      sentenceTwoHebrew: "המנורה שבורה",
  
      // missing words game
      missingSentenceOneGerman: "Das Wohnzimmer hat ein Sofa",
      missingSentenceOneHebrew: "בסלון יש ספה",
      missingWordOneGerman: "Sofa",
      missingWordOneHebrew: "ספה",
      missingSentenceTwoGerman: "Die Küche hat einen Kühlschrank",
      missingSentenceTwoHebrew: "במטבח יש מקרר",
      missingWordTwoGerman: "Kühlschrank",
      missingWordTwoHebrew: "מקרר",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: House parts-10 , lesson: 4 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "House parts",
      lessonOneToSix: 4,
  
      // sentence game
      sentenceOneGerman: "Das Schlafzimmer hat einen Schrank",
      sentenceOneHebrew: "בחדר השינה יש ארון",
      sentenceTwoGerman: "Das Badezimmer hat eine Badewanne",
      sentenceTwoHebrew: "בחדר האמבטיה יש אמבטיה",
  
      // missing words game
      missingSentenceOneGerman: "Die Wand hat Bilder",
      missingSentenceOneHebrew: "על הקיר יש תמונות",
      missingWordOneGerman: "Bilder",
      missingWordOneHebrew: "תמונות",
      missingSentenceTwoGerman: "Die Küche hat einen Tisch",
      missingSentenceTwoHebrew: "במטבח יש שולחן",
      missingWordTwoGerman: "Tisch",
      missingWordTwoHebrew: "שולחן",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: House parts-10 , lesson: 5 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "House parts",
      lessonOneToSix: 5,
  
      // sentence game
      sentenceOneGerman: "Das Wohnzimmer hat einen Fernseher",
      sentenceOneHebrew: "בסלון יש טלוויזיה",
      sentenceTwoGerman: "Die Küche hat einen Herd",
      sentenceTwoHebrew: "במטבח יש כיריים",
  
      // missing words game
      missingSentenceOneGerman: "Das Schlafzimmer hat einen Teppich",
      missingSentenceOneHebrew: "בחדר השינה יש שטיח",
      missingWordOneGerman: "Teppich",
      missingWordOneHebrew: "שטיח",
      missingSentenceTwoGerman: "Das Badezimmer hat ein Waschbecken",
      missingSentenceTwoHebrew: "בחדר האמבטיה יש כיור",
      missingWordTwoGerman: "Waschbecken",
      missingWordTwoHebrew: "כיור",
  
      finished: false
    },
  
    /* level: A1-מבוא , course: House parts-10 , lesson: 6 */
    {
      hebrewLevel: "מבוא",
      englishLevel: "A1",
      courseNameEnglish: "House parts",
      lessonOneToSix: 6,
  
      // sentence game
      sentenceOneGerman: "Das Wohnzimmer hat einen Teppich",
      sentenceOneHebrew: "בסלון יש שטיח",
      sentenceTwoGerman: "Die Küche hat eine Spüle",
      sentenceTwoHebrew: "במטבח יש כיור מטבח",
  
      // missing words game
      missingSentenceOneGerman: "Das Schlafzimmer hat einen Spiegel",
      missingSentenceOneHebrew: "בחדר השינה יש מראה",
      missingWordOneGerman: "Spiegel",
      missingWordOneHebrew: "מראה",
      missingSentenceTwoGerman: "Das Badezimmer hat eine Toilette",
      missingSentenceTwoHebrew: "בחדר האמבטיה יש שירותים",
      missingWordTwoGerman: "Toilette",
      missingWordTwoHebrew: "שירותים",
  
      finished: false
    },
  
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

const lessonData = lessons.map((lesson) => ({
  ...lesson,
  userId,
  courseId: getUuidByCourseName(courseIds, lesson.courseNameEnglish),
}));

await db.insert(Lessons).values(lessonData).returning();
};