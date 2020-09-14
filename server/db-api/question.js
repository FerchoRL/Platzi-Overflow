import Debug from 'debug';

import { Question } from '../models'
const debug = new Debug('platzi-overflow:db-api:question');

export default {
    findAll: async () => {
        debug('Finding all questions');
        //Return all questions with its answers using await
        return await Question.find().populate('answers')
    },

    findById: async (id) =>{
        debug(`Finding question with ID ${_id}`);
        return await Question
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
    }
}