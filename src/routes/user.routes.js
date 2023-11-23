import {Router} from 'express';
import { registerUser } from '../controllers/user.controller';
import {upload} from "../middlewares/multer";

const router = Router();

router.route('/register').post(upload.fields([
    {
        name:"profilePic",
        maxCount:1
    },
    {
        name:"coverPic",
        maxCount:1
    }
]), registerUser);



export default router