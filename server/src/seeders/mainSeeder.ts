import { wordSeeder } from "./wordSeeder";
import { courseSeeder } from "./courseSeeder";
import { gameSeeder } from "./gameSeeder";
import { lessonSeeder } from "./lessonSeeder";

export const mainSeeder = (userId: string) => {
    courseSeeder(userId);
    wordSeeder(userId);
    gameSeeder(userId);
    lessonSeeder(userId);
};

if (require.main === module) {
    const args = process.argv.slice(2);
    const userId = args[0]; 

    if (!userId) {
        process.exit(1); 
    }

    mainSeeder(userId);
}
