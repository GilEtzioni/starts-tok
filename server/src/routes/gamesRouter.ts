import { Router } from "express";
import { getAllWords, getGameMaxScore, addGameScore, getKeyboard } from "../controllers/gamesController";
import { requireAuth } from "@clerk/express";
import { GamesNamesType } from "../types/gamesTypes";

const router = Router();

router.get("/gameWords", requireAuth(), getAllWords);

router.get("/:gameName/maxScore", requireAuth(), async (req, res) => {
    const { gameName } = req.params;
    await getGameMaxScore(req, res, gameName as GamesNamesType);
});

router.post("/:gameName/score", requireAuth(), async (req, res) => {
    const { gameName } = req.params;
    await addGameScore(req, res, gameName as GamesNamesType);
});

router.get('/keyboard', requireAuth(), getKeyboard);

export default router;