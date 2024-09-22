import {Router} from 'express'
import { getUserChats, singleChat } from '../controllers/chat.js';
import { protectAuth } from '../middleware/auth.js';

const router = Router();


router.get("/",protectAuth, singleChat);
router.get("/userChat",protectAuth, getUserChats);


export default router