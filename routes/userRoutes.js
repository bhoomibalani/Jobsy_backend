import express from 'express';
import userAuth from '../middlewares/authMiddlewares.js';
import { updateUserController } from '../controllers/userController.js';
//rrouter objevt()
const router = express.Router()

//routes
//get users

//update user
router.put('/update-user',userAuth,updateUserController)


export default router