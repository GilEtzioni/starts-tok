"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = require("../controllers/gamesController");
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
router.get("/gameWords", (0, express_2.requireAuth)(), gamesController_1.getAllWords);
router.get("/:gameName/maxScore", (0, express_2.requireAuth)(), async (req, res) => {
    const { gameName } = req.params;
    await (0, gamesController_1.getGameMaxScore)(req, res, gameName);
});
router.post("/:gameName/score", (0, express_2.requireAuth)(), async (req, res) => {
    const { gameName } = req.params;
    await (0, gamesController_1.addGameScore)(req, res, gameName);
});
router.get('/keyboard', (0, express_2.requireAuth)(), gamesController_1.getKeyboard);
exports.default = router;
