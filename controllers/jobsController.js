import jobsModel from "../models/jobsModel.js";

export const createJobController =async(req,res,next)=>{
    try{
            const {company,position} = req.body;
            if(!company||!position){
                return next('please provide all fields')
            }
            req.body.createdBy=req.user.userId
            const job = await jobsModel.create(req.body)
            res.status(201).json({job});
    }
    catch(err){
        res.send({
            message:'error n create job comntroller',
            status:401,
            err
               })
    }
}


export const getAllJobsController =async(req,res,next)=>{
    const jobs =await jobsModel.find({createdBy:req.user.userId})
    res.status(200).json({
        totalJobs : jobs.length,
        jobs,
    })

};