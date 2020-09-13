import express from 'express';

import { required,
questionMiddleware,
questionsMiddleware } from '../middleware'

const app = express.Router();

const currentUser = {
    firstName: 'Fercho',
    lastName: 'Lagunes',
    email: 'rlfernando7@getMaxListeners.com',
    password: '12345'
};

//Create functions to receive methods from frontend

//Question subpaths for apis
// GET api/questions: get all the question with method get
app.get('/', questionsMiddleware, (req, res) => res.status(200).json(req.questions));

//GET api/questions/:id. Get only question with the id
//First execute questionMiddleware and then with the next, execute the next middleware
app.get('/:id', questionMiddleware, (req, res) => {
    res.status(200).json(req.question);//question from middleware
});

// POST /api/questions
app.post('/', required, questionsMiddleware, (req, res) => {
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
app.post('/:id/answers', required, questionMiddleware, (req,res) => {
    const answer = req.body;
    const question = req.question;
    answer.createDate = new Date();
    answer.user = req.user;//From user middleware
    question.answers.push(answer);//Push in the answers of the questions
    res.status(201).json(answer);
});

export default app;