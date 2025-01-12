import { Router } from "express";
import { getAllWords, getHangmanMaxScore, addHangmanScore} from "../controllers/gamesController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/gameWords", requireAuth(), getAllWords);
router.get("/hangman/maxScore", requireAuth(), getHangmanMaxScore);
router.post("/hangman/score", requireAuth(), addHangmanScore);

export default router;