import Debug from 'debug';

import { Question, Answer } from '../models'
const debug = new Debug('platzi-overflow:db-api:question');

export default {
    findAll: (sort = '-createdDate') => {
        debug('Finding all questions');
        //Return all questions with its answers using await
        return Question.find().populate('answers').sort(sort);
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
    },

    createAnswer: async (q,a) =>{
        const answer = new Answer(a);
        const savedAnswer = await answer.save();
        q.answers.push(savedAnswer);
        await q.save();
        return savedAnswer;
    }
}