import { drizzle } from "drizzle-orm/node-postgres";
import { Lessons} from "./drizzle/schema";
import { db } from "./drizzle/db";

async function seed() {
  try {
    console.log("Seeding database...");

    const items = await db.insert(Lessons).values([
    /* level: A1-מבוא , course: Greetings-6 , lesson: 1 */
    { level_hebrew: "מבוא", level_english: "A1",course_name: "Greetings", course_id: 6, lesson_id: 1,

      // sentece game 
      sentence_one_german: "hallo wie gehts", sentence_one_hebrew: "היי מה שלומך",
      sentence_two_german: "guten morgen", sentence_two_hebrew: "בוקר טוב",

      // missing words game
      missing_sentence_one_german: "Hallo! Ich bin Gil", missing_sentence_one_hebrew: "שלום! קוראים לי גיל",
      missing_word_one_german: "hallo", missing_word_one_hebrew: "שלום",
      missing_sentence_two_german: "Guten morgen, wie gehts", missing_sentence_two_hebrew: "בוקר טוב, מה שלומך?",
      missing_word_two_german: "morgen", missing_word_two_hebrew: "בוקר",

      // word couples game
      word_one_german: "hallo", word_one_hebrew: "שלום",
      word_two_german: "wie geths", word_two_hebrew: "מה שלומך",
      word_three_german: "rot", word_three_hebrew: "אדום",
      word_four_german: "blau", word_four_hebrew: "כחול",
      word_five_german: "vater", word_five_hebrew: "אבא",
      word_six_german: "muter", word_six_hebrew: "אמא",
      word_seven_german: "gelb", word_seven_hebrew: "צהוב",
      word_eight_german: "grün", word_eight_hebrew: "ירוק",
      word_nine_german: "sohn", word_nine_hebrew: "בן",
      word_ten_german: "onkel", word_ten_hebrew: "דוד",
      word_eleven_german: "morgen", word_eleven_hebrew: "בוקר",
      word_twelve_german: "guten", word_twelve_hebrew: "טוב",
    },

    /* level: A1-מבוא , course: Greetings-6 , lesson: 2 */
    { level_hebrew: "מבוא", level_english: "A1",course_name: "Greetings", course_id: 6, lesson_id: 2,

      // sentece game 
      sentence_one_german: "Tschüss, Bis bald", sentence_one_hebrew: "ביי, נתראה בקרוב",
      sentence_two_german: "Guten Abend. Prost!", sentence_two_hebrew: "ערב טוב. לחיים!",

      // missing words game
      missing_sentence_one_german: "Hallo! Ich bin Noam", missing_sentence_one_hebrew: "שלום! קוראים לי נעם",
      missing_word_one_german: "Ich bin", missing_word_one_hebrew: "קוראים לי",
      missing_sentence_two_german: "Guten Abend, Bis morgen", missing_sentence_two_hebrew: "ערב טוב, נתראה מחר",
      missing_word_two_german: "Guten Abend", missing_word_two_hebrew: "ערב טוב",

      // word couples game
      word_one_german: "Ich bin", word_one_hebrew: "קוראים לי",
      word_two_german: "Guten Abend", word_two_hebrew: "ערב טוב",
      word_three_german: "Bis morgen", word_three_hebrew: "נתראה  מחר",
      word_four_german: "Schwester", word_four_hebrew: "אחות",
      word_five_german: "Tante", word_five_hebrew: "דודה",
      word_six_german: "Großvater", word_six_hebrew: "סבא רבא",
      word_seven_german: "weiß", word_seven_hebrew: "לבן",
      word_eight_german: "rosa", word_eight_hebrew: "ורוד",
      word_nine_german: "orange", word_nine_hebrew: "כתום",
      word_ten_german: "gelb", word_ten_hebrew: "צהוב",
      word_eleven_german: "vier", word_eleven_hebrew: "ארבע",
      word_twelve_german: "zehn", word_twelve_hebrew: "עשר",
    },
    ]).returning({ id: Lessons.id });

    console.log("Seeding complete. Inserted items:", items);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1); // Exit with failure
  }
}

seed();