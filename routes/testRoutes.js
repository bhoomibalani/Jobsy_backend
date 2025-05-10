import express from 'express'
import { testPostController } from '../controllers/testControllers.js'
import userAuth from '../middlewares/authMiddlewares.js';

//router object
const router = express.Router()


//test
router.post('/test-post',userAuth,testPostController);

//export
export default router;

