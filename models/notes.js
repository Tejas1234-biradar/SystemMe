import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: String,
    desc: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference User
    hidden: Boolean
});

export default mongoose.model("Note", NoteSchema);
