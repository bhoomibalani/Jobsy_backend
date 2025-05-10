import express from 'express'
import userAuth from '../middlewares/authMiddlewares.js'
import { createJobController, getAllJobsController } from '../controllers/jobsController.js'

const router = express.Router()

//routes
//CREATE JOB || POST
router.post('/create-job',userAuth,createJobController);

//get jobs
router.get('/get-jobs',userAuth,getAllJobsController)

export default router