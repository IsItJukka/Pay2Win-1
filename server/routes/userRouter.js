import Router from 'express'
const router = Router()
import userController from "../controllers/userController.js";
import bcrypt from 'bcrypt'
import {User, Wish} from "../models/models.js";
import authMiddleware from "../middleware/authMiddleware.js";


router.post('/registration', userController.registration);
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

export default router;