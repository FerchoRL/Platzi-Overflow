
import express from 'express'

const app = express.Router()

const currentUser = {
    firstName: 'Fercho',
    lastName: 'Lagunes',
    email: 'rlfernando7@getMaxListeners.com',
    password: '12345'
}

//Create functions to receive methods from frontend

//Create a middleware that get a question with his _id
function questionMiddleware(req, res, next){
    const { id } = req.params // is same like req.params.id
    req.question =  questions.find(({ _id }) => _id === +id)//with +id convert the id in number. Also we use the function to search the questions using the id. This is with arrow function
    next()//execute the next middleware
}

//Create a middleware that get a question with his _id
function userMiddleware(req, res, next){
    req.user = currentUser
    next()//execute the next middleware
}
const question = {
    _id: 1,
    title: '¿Como guardo una expresion regular en una variable en Angular?',
    description: 'Pregunta que surgio en el curso de MEAN 2017',
    createdDate: new Date(),
    icon: 'devicon-angularjs-plain',
    answers: [],
    user: {
        firstName: 'Fercho',
        lastName: 'Lagunes',
        email: 'rlfernando7@getMaxListeners.com',
        password: '12345'
    }
}

const questions = new Array(1).fill(question)

//Question subpaths for apis
// GET api/questions: get all the question with method get
app.get('/',(req, res) => res.status(200).json(questions))

//GET api/questions/:id. Get only question with the id
//First execute questionMiddleware and then with the next, execute the next middleware
app.get('/:id', questionMiddleware, (req, res) => {
    res.status(200).json(req.question)//question from middleware
})

// POST /api/questions
app.post('/', userMiddleware, (req, res) => {
    const question = req.body
    question._id = +new Date()// number of seconds since 1970
    question.user = req.user//User from middleware
    question.createdDate = new Date()
    question.answers = []
    questions.push(question)
    res.status(201).json(question)//Return response
})

//Endpoint to create answers in the question
// POST /api/questions/:id/answer
app.post('/:id/answers', questionMiddleware, userMiddleware, (req,res) => {
    const answer = req.body
    const question = req.question
    answer.createDate = new Date()
    answer.user = req.user//From user middleware
    question.answers.push(answer)//Push in the answers of the questions
    res.status(201).json(answer)
})

export default app