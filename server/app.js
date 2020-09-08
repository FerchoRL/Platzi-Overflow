import express from 'express'
import bodyParser from 'body-parser'
import { question } from './routes'

//Nos devuelve en una variable nuestro servidor
const app = express()

//Read all jsons from client
app.use(bodyParser.json());
//Our server can read with UTF8
app.use(bodyParser.urlencoded({ extended: true}));

//If we are in an development environment we can use or server from any port
if (process.env.NODE_ENV === 'development'){
    //Use express midleware and every those headers and methods can access to out service
    app.use((req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Acces-Control-Allow-Headers', 'Origin, X-Request-with, Content-Type, Accept')
        res.setHeader('Acces-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
        next()
    })
}

//Declare my services and endpoint when use the server, Main path
app.use('/api/questions', question)

export default app