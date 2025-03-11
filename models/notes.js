<<<<<<< HEAD
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: String,
    desc: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference User
    hidden: Boolean
});

export default mongoose.model("Note", NoteSchema);
=======
import mongoose from 'mongoose';
const { Schema } = mongoose; // Corrected: Extract 'Schema' from 'mongoose'

const noteSchema = new Schema({
 
  title: String,
  desc: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
});

const Note = mongoose.model('Note', noteSchema); // Corrected capitalization for 'User'
export default Note;
>>>>>>> 2553a94adcdf5183457e4522535b07e2a23d80cf
