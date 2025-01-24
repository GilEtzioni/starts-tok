import { Router } from "express";
import { getAllWords, addNewWord, editWord, getFinishedWordsCounter, getFilterWords } from "../controllers/dictionaryController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/filter", requireAuth(), getFilterWords);
router.get("/dictionary", requireAuth(), getAllWords);
router.post("/dictionary/new", requireAuth(), addNewWord);
router.patch("/dictionary/:id", requireAuth(), editWord);
router.get("/finishedWords", requireAuth(), getFinishedWordsCounter);

export default router;