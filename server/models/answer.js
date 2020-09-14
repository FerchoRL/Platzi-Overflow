import mongoose, { Schema } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const AnswerSchema = mongoose.Schema({
    description: { type: String, required: true},
    createDate: { type: Date, default: Date.now, required: true},
    user: { type:ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Answer', AnswerSchema)