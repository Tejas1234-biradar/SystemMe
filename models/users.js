// models/users.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true},
<<<<<<< HEAD
    hidden: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
=======
    hidden: { type: Boolean, default: false }
>>>>>>> 2553a94adcdf5183457e4522535b07e2a23d80cf
});

const User = mongoose.model("User", userSchema);
export default User;
