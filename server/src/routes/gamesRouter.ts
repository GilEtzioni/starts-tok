import { Router } from "express";
import { getAllWords, getHangmanScore, getHangmanMaxScore, addHangmanScore} from "../controllers/gamesController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/wordle", requireAuth(), getAllWords);
router.get("/hangman", requireAuth(), getAllWords);
router.get("/speedGame", requireAuth(), getAllWords);
router.get("/hangman/allScore", requireAuth(), getHangmanScore);
router.get("/hangman/score", requireAuth(), getHangmanScore);
router.get("/hangman/maxScore", requireAuth(), getHangmanMaxScore);
router.post("/hangman/score", requireAuth(), addHangmanScore);

export default router;