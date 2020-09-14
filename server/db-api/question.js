import Debug from 'debug';

import { Question } from '../models'
const debug = new Debug('platzi-overflow:db-api:question');

export default {
    findAll: async () => {
        debug('Finding all questions');
        //Return all questions with its answers using await
        return await Question.find().populate('answers')
    }
}