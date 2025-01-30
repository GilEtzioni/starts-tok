import { Users } from "../../drizzle/schema";
import {db} from "../../drizzle/db";

export async function userSeeder(userId: string, userName: string) {

  console.log("Seeding database...");

  await db.insert(Users).values([
    { userId, userName, points: 0 },
  ]).returning({ id: Users.userId });
}