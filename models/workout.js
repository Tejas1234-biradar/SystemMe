import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    workoutName: {
        type: String,
        required: true
    },
    workoutDuration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    monthlyGoal: {
        type: String,
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;