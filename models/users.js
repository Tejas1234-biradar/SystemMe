// models/users.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true},
    hidden: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
export default User;
