import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { getAllPoints, getLastWeekPoints, addPoints, getOneDayPoints } from "../controllers/usersController";

const router = Router();

router.get("/allPoints", requireAuth(), getAllPoints);
router.get("/currentWeekPoints", requireAuth(), getLastWeekPoints);
router.post("/addPoints", requireAuth(), addPoints);
router.get("/:day/getOneDayPoints", requireAuth(), getOneDayPoints);

export default router;