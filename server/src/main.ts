import "dotenv/config";
import {db} from "./drizzle/db";
import { UserTable } from "./drizzle/schema";
import { and, between, eq, gt, gte, ilike, inArray, isNotNull, isNull, like, lt, lte, ne, not, notBetween, notInArray, notLike, or } from "drizzle-orm";

async function main() {
    await db.insert(UserTable).values({
        fullName: 'gil',
        phone: "0544606868", // Required field
    })
    // await db.delete(UserTable);
    const user1 = await db.select().from(UserTable).where(eq(UserTable.id, 1)); // ==
    // const user2 = await db.select().from(UserTable).where(ne(UserTable.id, 1)); // !=
    // const user3 = await db.select().from(UserTable).where(gt(UserTable.id, 3)); // greater than 3
    // const user4 = await db.select().from(UserTable).where(gte(UserTable.id, 3)); // greater than equtal 3
    // const user5 = await db.select().from(UserTable).where(lt(UserTable.id, 3)); // less than 3
    // const user6 = await db.select().from(UserTable).where(lte(UserTable.id, 3)); // less than equtal 3
    // const user7 = await db.select().from(UserTable).where(isNull(UserTable.age)); // age == null
    // const user8 = await db.select().from(UserTable).where(isNotNull(UserTable.id)); // id != null
    // const user9 = await db.select().from(UserTable).where(inArray(UserTable.id,[2,4])); // id == 2,4
    // const user10 = await db.select().from(UserTable).where(notInArray(UserTable.id,[2,4])); // id != 2,4
    // const user11 = await db.select().from(UserTable).where(between(UserTable.id,2,4)); // 2 <= id <= 4
    // const user12 = await db.select().from(UserTable).where(notBetween(UserTable.id,2,4)); // ! (2 <= id <= 4)
    // const user13 = await db.select().from(UserTable).where(like(UserTable.phone, "%544%")); // ... 544 ....
    // const user14 = await db.select().from(UserTable).where(ilike(UserTable.fullName, "%GiL%")); // ignore capital letters
    // const user15 = await db.select().from(UserTable).where(notLike(UserTable.fullName, "%gil%")); // 
    // const user16 = await db.select().from(UserTable).where(not(eq(UserTable.id, 1))); // not (...)
    // const user17 = await db.select().from(UserTable).where(and(between(UserTable.id,2,4),isNull(UserTable.age))); // (...) and (...)
    // const user18 = await db.select().from(UserTable).where(or(between(UserTable.id,2,4),isNull(UserTable.age))); // (...) or (...)

    console.log(user1);
}

main()