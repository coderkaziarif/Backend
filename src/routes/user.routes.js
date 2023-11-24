import {Router} from 'express';
import { registerUser } from '../controllers/user.controller.js';
import {upload} from "../middlewares/multer.js";

const router = Router();
//test
router.post('/test', (req, res) => {
    res.json({ message: 'Test route works!' });
});

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