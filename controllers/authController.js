import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {

    try {
        const { name, email, password } = req.body
        //validate
        if (!name) {
            next('name is requred')
        }

        if (!email) {
            next('provide email also')
        }
        if (!password) {
            next('enter password')
        }



        const existingUser = await userModel.findOne({ email }).select("+password")
        if (existingUser) {
            next('email already register')
        }
        const user = await userModel.create({
            name, email, password
        })

        //token
        const token = user.createJWT()

        res.status(201).send({
            success: true,
            message: 'user created successfully',
            user:{
                name:user.name,
                lastname:user.lastname,
                email:user.email,
                location:user.location,
            },
            token
        })

    } catch (error) {
        next(error);
    }
};


export const loginController=async(req,res)=>{
    const {email,password}=req.body;
    //validation
    if(!email||!password){
        next('Please provide all fields')
    }

    //find user by email
    const user= await userModel.findOne({email:email})
    if(!user){
        next('invalid username or password')
    }
    //comapre password
    const isMatch =await user.comparePassword(password)
    if(!isMatch){
        next('nvalid username or password')
    }

    user.password=undefined;

    const token = user.createJWT()
    res.status(200).send({
        success:true,
        message:'Login Successfully',
        user,
        token,
    })
};
