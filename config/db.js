 import mongoose from 'mongoose'

 const connectDB=async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDB databse ${mongoose.connection.host}`)

    }catch(error){
        console.log(`MongoDB error ${error}`)
    }
 };

 export default connectDB;