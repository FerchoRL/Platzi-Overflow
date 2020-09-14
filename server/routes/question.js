import express from 'express';

import { required, questionMiddleware } from '../middleware';
import { question } from '../db-api';
import { handleError } from '../utils';
import { User } from '../models'

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
        //Receive parameter from frontend
        const { sort } = req.query;
        const questions = await question.findAll(sort);//Send sort to query
        res.status(200).json(questions)
    } catch (error) {
        handleError(error,res,'An error ocured when try to get all questions');
    }
    
});

//GET api/questions/:id. Get only question with the id calling DB with async
app.get('/:id', questionMiddleware, async (req, res) => {
    try {
        res.status(200).json(req.question);
    } catch (error) {
        handleError(error,res,`An error ocured when try to get question with Id ${req.params.id}`);
    }
    
});

// POST /api/questions
app.post('/', required, async (req, res) => {
    const { title, description, icon } = req.body;
    const q = {
        title,
        description,
        icon,
        user: req.user._id//From middleware auth required
    };
    try {
        //In this part call to create in question in db_api (I guess)
        const savedQuestion = await question.create(q);
        res.status(201).json(savedQuestion);
    } catch (error) {
        handleError(error,res,`An error ocured when try create a new question`);
    }
    
});

//Endpoint to create answers in the question
// POST /api/questions/:id/answer
//Use required middleware to validate user is loggin to create an answer
app.post('/:id/answers', required, questionMiddleware, async (req,res) => {
    const a = req.body;
    const q = req.question;
    a.createDate = new Date();
    a.user = new User(req.user);//From user middleware. Need to populate with user to show the user name when create the answer
    try {
        //In this part call to create in question in db_api (I guess)
        const savedAnswer = await question.createAnswer(q, a);
        res.status(201).json(savedAnswer);
    } catch (error) {
        handleError(error,res,`An error ocured when try create a new question`);
    }
});

export default app;