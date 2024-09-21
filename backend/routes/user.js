import {Router} from 'express'
import { getSingleUser, loginUser, registerUser } from '../controllers/user.js';
import { protectAuth } from '../middleware/auth.js';

const router = Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/",protectAuth,getSingleUser)


export default router