import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
//schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, "passsword length should be grator than 6 characters"],
        select: true,
    },
    location: {
        type: String,
        default: 'Mumbai'
    }
}, { timestamps: true }
);

//midlleware
userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
});


//compare password for logn
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;

}

//json wentoken
userSchema.methods.createJWT = function () {
    return JWT.sign({ userID: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
export default mongoose.model('User', userSchema)

