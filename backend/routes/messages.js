import { Router } from "express";

import { protectAuth } from "../middleware/auth.js";
import { allSingleChat, sendMessage } from "../controllers/messages.js";

const router = Router();

router.post("/send", protectAuth, sendMessage);
router.get("/:chatId", protectAuth, allSingleChat);

export default router;
