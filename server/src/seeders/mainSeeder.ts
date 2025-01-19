import { courseSeeder } from "./seedersTables/courseSeeder";
import { wordSeeder } from "./seedersTables/wordSeeder";
import { gameSeeder } from "./seedersTables/gameSeeder";
import { missingWordSeeder } from "./seedersTables/missingWordSeeder";
import { sentenceSeeder } from "./seedersTables/sentenceSeeder";
import { userSeeder } from "./seedersTables/userSeeder";
import { generateCourseIds, hangmanGameId, speedGameId, rowGameId } from "./utils/helpingSeeders";

export const mainSeeder = async (userId: string) => {

    const courseIds = generateCourseIds();
    const userName = "גיל"; // i will change it dinamiclly in in next few days (when the sign-up will be done)
    
    console.log("\nstart seeding courses...");
    await courseSeeder(userId, courseIds);
    console.log("courses seeded\n");
  
    console.log("\nstart seeding words...");
    await wordSeeder(userId, courseIds);
    console.log("words seeded\n");
  
    console.log("\nstart seeding games...");
    await gameSeeder(userId, hangmanGameId, speedGameId, rowGameId);
    console.log("games seeded\n");
 
    console.log("\nstart seeding missingWord...");
    await missingWordSeeder(userId, courseIds);
    console.log("missingWord seeded\n");

    console.log("\nstart seeding sentence...");
    await sentenceSeeder(userId, courseIds);
    console.log("sentence seeded\n");

    console.log("\nstart seeding users...");
    await userSeeder(userId, userName);
    console.log("users seeded\n");

    console.log("\n\n---- seeding completed successfully ----\n\n");
};

if (require.main === module) {
  const args = process.argv.slice(2);
  const userId = args[0];

  if (!userId) {
    process.exit(1);
  }

  mainSeeder(userId);
}
