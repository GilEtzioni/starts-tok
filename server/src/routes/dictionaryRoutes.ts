import { Router } from "express";
import { getAllWords, getWordById, addNewWord, editWord, getFinishedWordsCounter } from "../controllers/dictionaryController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/dictionary", requireAuth(), getAllWords);
router.get("/dictionary/:id", requireAuth(), getWordById);
router.post("/dictionary/new", requireAuth(), addNewWord);
router.patch("/dictionary/:id", requireAuth(), editWord);
router.get("/finishedWords", requireAuth(), getFinishedWordsCounter);

export default router;