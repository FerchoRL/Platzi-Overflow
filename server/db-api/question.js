import Debug from 'debug';

import { Question } from '../models'
const debug = new Debug('platzi-overflow:db-api:question');

export default {
    findAll: () => {
        debug('Finding all questions');
        //Return all questions with its answers using await
        return Question.find().populate('answers')
    },

    findById: (_id) =>{
        debug(`Finding question with ID ${_id}`);
        return Question
            .findOne({ _id })
            //user as we mention in question.js models
            .populate('user')
            .populate({
                path: 'answers',
                //Return the answers with createdDate desc
                options: { sort: '-createdDate'},
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })
    },

    //Create a new question
    create: (q) =>{
        debug(`Creating new question ${q}`);
        const question = new Question(q);
        return question.save();
    }
}