import { drizzle } from "drizzle-orm/node-postgres";
import { Lessons} from "./drizzle/schema";
import { db } from "./drizzle/db";

async function seed() {
  try {
    console.log("Seeding database...");

    const items = await db.insert(Lessons).values([
    // Colors - lesson 1
    // game 1
    { level_hebrew: "מבוא", level_english: "A1", courseId: 1, lessonId:1, gameId: 1, courseName: "Colors", GermanWord: "rot", HebrewWord: "אדום", knowlage: "X" },
    { level_hebrew: "מבוא", level_english: "A1", courseId: 1, lessonId:1, gameId: 1, courseName: "Colors", GermanWord: "blau", HebrewWord: "כחול", knowlage: "X" },
    { level_hebrew: "מבוא", level_english: "A1", courseId: 1, lessonId:1, gameId: 1, courseName: "Colors", GermanWord: "grün", HebrewWord: "ירוק", knowlage: "X" },
    { level_hebrew: "מבוא", level_english: "A1", courseId: 1, lessonId:1, gameId: 1, courseName: "Colors", GermanWord: "gelb", HebrewWord: "צהוב", knowlage: "X" },
    { level_hebrew: "מבוא", level_english: "A1", courseId: 1, lessonId:1, gameId: 1, courseName: "Colors", GermanWord: "schwarz", HebrewWord: "שחור" },
    { level_hebrew: "מבוא", level_english: "A1", courseId: 1, lessonId:1, gameId: 1, courseName: "Colors", GermanWord: "weiß", HebrewWord: "לבן", knowlage: "X" },
    
    ]).returning({ id: Lessons.id });

    console.log("Seeding complete. Inserted items:", items);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1); // Exit with failure
  }
}

seed();