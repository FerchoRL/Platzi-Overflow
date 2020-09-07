import express from 'express'
import { question } from './routes'

//Nos devuelve en una variable nuestro servidor
const app = express()


//Declare my endpoint when use the server, Main path
app.use('/api/questions', question)

export default app