import express from 'express'
import { testPostController } from '../controllers/testControllers.js'

//router object
const router = express.Router()


//test
router.post('/test-post',testPostController)

//export
export default router;

