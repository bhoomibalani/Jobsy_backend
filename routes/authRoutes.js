import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'

//router
const router  = express.Router()

//routes
//regiter rouotes
router.post('/register',registerController);

//login route
router.post("/login",loginController)

//export
export default router