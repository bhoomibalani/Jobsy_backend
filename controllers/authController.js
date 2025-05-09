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



        const existingUser = await userModel.findOne({ email })
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
                lastname:user.laastname,
                email:user.email,
                locaton:user.location,
            },
            token
        })

    } catch (error) {
        next(error);
    }
};

