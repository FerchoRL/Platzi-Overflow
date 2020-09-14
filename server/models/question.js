import { from } from "rxjs";
import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { ObjectId } = Schema.Types;

const QuestionSchema = Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    createdDate: { type: Date, default: Date.now, required: true},
    icon: { type: String, required: true },
    //Type ObjectId and reference to the Schema model name we need
    user: { type: ObjectId, ref: 'User', required: true },
    answers: [{ type: ObjectId, ref: 'Answer', required: true}]
})

QuestionSchema.plugin(uniqueValidator);

export default mongoose.model('Question', QuestionSchema);