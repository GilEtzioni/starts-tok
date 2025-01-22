import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { getAllPoints, getLastWeekPoints, addPoints, getOneDayPoints, changeLanguage, getUserLanguage, getBestUsers } from "../controllers/usersController";

const router = Router();

router.get("/bestUsers", requireAuth(), getBestUsers);
router.get("/allPoints", requireAuth(), getAllPoints); 
router.get("/currentWeekPoints", requireAuth(), getLastWeekPoints);
router.post("/addPoints", requireAuth(), addPoints);
router.get("/:day/getOneDayPoints", requireAuth(), getOneDayPoints);
router.get("/userLanguage", requireAuth(), getUserLanguage);
router.patch("/changeLanguage", requireAuth(), changeLanguage);

export default router;