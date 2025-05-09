import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

//schema
 const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:validator.isEmail
},
password:{
    type:String,
    required:[true,'Password is required'],
    minlength:[6,"passsword length should be grator than 6 characters"],
},
location:{
    type:String,
    default:'Mumbai'
}
 },{timestamps:true}
);
userSchema.pre('save',async function(){
const salt =await bcrypt.genSalt(10)
this.password= await bcrypt.hash(this.password,salt);
})
 export default mongoose.model('User',userSchema)