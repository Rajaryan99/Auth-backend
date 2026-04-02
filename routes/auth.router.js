import { Router } from "express";
import * as authcontroller from '../controllers/signup.js'

const authRouter  = Router();

authRouter.post('/signup', authcontroller.signup)
// authRouter.post('/login')
authRouter.get("getMe", authcontroller.getMe)

export default authRouter;