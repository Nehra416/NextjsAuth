import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "This username is already taken"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "This email is already taken"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    userVerifyToken: String,
    userVerifyTokenExpiry: Date,

});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;