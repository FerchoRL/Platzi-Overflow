import express from 'express';

import { required } from '../middleware';
import { question } from '../db-api';
import { handleError } from '../utils'
import { async } from 'rxjs/internal/scheduler/async';

const app = express.Router();

const currentUser = {
    firstName: 'Fercho',
    lastName: 'Lagunes',
    email: 'rlfernando7@getMaxListeners.com',
    password: '12345'
};

//Create functions to receive methods from frontend

//Question subpaths for apis
// GET api/questions: get all the question with method get calling DB with async
app.get('/', async (req, res) => {
    try {
        const questions = await question.findAll();
        res.status(200).json(questions)
    } catch (error) {
        handleError(error,res,'An error ocured when try to get all questions');
    }
    
});

//GET api/questions/:id. Get only question with the id calling DB with async
app.get('/:id', async (req, res) => {
    try {
        const q = await question.findById(req.params.id)
        res.status(200).json(q);
    } catch (error) {
        handleError(error,res,`An error ocured when try to get question with Id ${req.params.id}`);
    }
    
});

// POST /api/questions
app.post('/', required, (req, res) => {
    const question = req.body;
    question._id = +new Date();// number of seconds since 1970
    question.user = req.user;//User from middleware
    question.createdDate = new Date();
    question.answers = [];
    req.questions.push(question);
    res.status(201).json(question);//Return response
});

//Endpoint to create answers in the question
// POST /api/questions/:id/answer
//Use required middleware to validate user is loggin to create an answer
app.post('/:id/answers', required, (req,res) => {
    const answer = req.body;
    const question = req.question;
    answer.createDate = new Date();
    answer.user = req.user;//From user middleware
    question.answers.push(answer);//Push in the answers of the questions
    res.status(201).json(answer);
});

export default app;