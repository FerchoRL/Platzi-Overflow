import mongoose, { Schema } from 'mongoose';

const AnswerSchema = Schema({
    description: { type: String, required: true},
    createDate: { type: Date, default: Date.now, required: true},
});

export default mongoose.model('Answer', AnswerSchema)