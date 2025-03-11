import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    expenditure: {
        type: Number,
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    meetsBudget: {
        type: Boolean,
        required: true,
        default: function() {
            return this.expenditure <= this.budget;
        }
    }
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;