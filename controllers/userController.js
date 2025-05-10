import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    try {

        const { name, email, lastname, location } = req.body;

        // 1. Validate inputs
        if (!name || !email || !lastname || !location) {

            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            });
        }

         const userId = req.user.userId;

        // 2. Fetch the user (req.user.userId must be set by your auth middleware)
        const user = await userModel.findOne({userId});
        console.log("user",user);
        console.log("requseruserId",req.user.userId);



        if (!user) {
            
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 3. Update fields
        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.location = location;

        // 4. Save and respond
        await user.save();
        const token = user.createJWT();

        return res.status(200).json({
            success: true,
            user,
            token
        });

    } catch (err) {
        // Any unexpected error bubbles to your errorMiddleware
        next(err);
    }
};
