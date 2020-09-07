
import express from 'express'

const app = express.Router()


const question = {
    _id: 1,
    title: '¿Como reutilizo un componente en android?',
    description: 'Miren esta es mi pregunta...',
    createdDate: new Date(),
    icon: 'devicon-android-plain',
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
// api/questions: get all the question with method get
app.get('/',(req, res) => res.status(200).json(questions))

// api/questions/:id. Get only question with the id
app.get('/:id',(req, res) => res.status(200).json(question))

export default app