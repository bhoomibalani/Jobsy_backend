import userModel from "../models/userModel.js";

export const registerController=async(req,res)=>{

    try{
        const{name,email,password}=req.body
        //validate
        if(!name){
            return res.status(400).send({
                message:"please provide name",
                success:false
            })
        }
        if(!email){
            return res.status(400).send({
                message:"please provide email",
                success:false
            })
        }
        if(!password){
            return res.status(400).send({
                message:"please provide password",
                success:false
            })
        }

        const existingUser=await userModel.findOne({email})
       if(existingUser){
        return res.status(200).send({
            success:false,
            message:'email alreday register , please login'
        })
       }
       const user = await userModel.create({
       name, email,password
       })

       res.status(201).send({
        success:true,
        message:'user created successfully',
        user
       })

    }catch(error){
        console.log(error)
        res.status(400).send({
            message:'error in regster controller',
            success:false,
            error
        })
    }

};