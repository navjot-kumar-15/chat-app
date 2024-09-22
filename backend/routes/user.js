import {Router} from 'express'
import { getSingleUser, loginUser, registerUser, searchUser } from '../controllers/user.js';
import { protectAuth } from '../middleware/auth.js';
import multer  from 'multer'   

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/avatar')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() +  file.originalname  )
    }
  })
  
  const upload = multer({ storage: storage })


const router = Router();

router.post("/register",upload.single("image"), registerUser)
router.post("/login",loginUser)
router.get("/",protectAuth,getSingleUser)
router.get("/search",protectAuth,searchUser)


export default router