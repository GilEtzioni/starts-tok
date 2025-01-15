import { Users } from "../../drizzle/schema";
import {db} from "../../drizzle/db";

export async function userSeeder(userId: string, userName: string) {

  console.log("Seeding database...");

  await db.insert(Users).values([
    { userId, userName, points: 13, pointsDate: "2025-01-13" },
    { userId, userName, points: 14, pointsDate: "2025-01-14" },
    { userId, userName, points: 7, pointsDate: "2025-01-17" },
    { userId, userName, points: 0 },
    
    { userId, userName, points: 16, pointsDate: "2025-01-16" },
  ]).returning({ id: Users.userId });
}