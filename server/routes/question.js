
import express from 'express'

const app = express.Router()


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


const questions = new Array(10).fill(question)


//Question subpaths for apis
// GET api/questions: get all the question with method get
app.get('/',(req, res) => res.status(200).json(questions))

//GET api/questions/:id. Get only question with the id
app.get('/:id',(req, res) => {
    const { id } = req.params // is same like req.params.id
    const q = questions.find(({ _id }) => _id === +id)//with +id convert the id in number. Also we use the function to search the questions using the id. This is with arrow function
    res.status(200).json(q)
})

// POST /api/questions
app.post('/', (req, res) => {
    const question = req.body
    question._id = +new Date()// number of seconds since 1970
    question.user = {
        email:'rlfernando7@gmail.com',
        password:'12345',
        firstName:'Ferchower',
        lastName:'RL'
    }
    question.createdDate = new Date()
    question.answers = []
    questions.push(question)
    res.status(201).json(question)//Return response
})


export default app