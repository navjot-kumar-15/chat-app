import { Router } from "express";
import {
  addToGroup,
  createGroupChat,
  getUserChats,
  removeFromGroup,
  renameGroup,
  singleChat,
} from "../controllers/chat.js";
import { protectAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", protectAuth, singleChat);
router.get("/userChat", protectAuth, getUserChats);
router.post("/groupChat", protectAuth, createGroupChat);
router.post("/renameGroup", protectAuth, renameGroup);
router.post("/removeUser", protectAuth, removeFromGroup);
router.post("/addUser", protectAuth, addToGroup);
export default router;
