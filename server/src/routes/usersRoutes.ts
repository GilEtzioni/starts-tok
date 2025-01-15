import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { getAllPoints, getTodayPoints, getLastWeekPoints, addPoints } from "../controllers/usersController";

const router = Router();

router.get("/allPoints", requireAuth(), getAllPoints);
router.get("/todayPoints", requireAuth(), getTodayPoints);
router.get("/currentWeekPoints", requireAuth(), getLastWeekPoints);
router.post("/addPoints", requireAuth(), addPoints);

export default router;