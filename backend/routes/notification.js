import { Router } from "express";
import {
  allUsersNotifications,
  notificationReadd,
} from "../controllers/notification.js";
import { protectAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", protectAuth, allUsersNotifications);
router.post("/read", protectAuth, notificationReadd);

export default router;
