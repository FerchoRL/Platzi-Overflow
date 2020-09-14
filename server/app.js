import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { question,auth } from './routes';
//import formidable from 'express-formidable'
//Nos devuelve en una variable nuestro servidor
const app = express();

//Read all jsons from client
app.use(bodyParser.json());
//Our server can read with UTF8
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(formidable({ encoding: 'utf-8', keepExtensions: true}))

//If we are in an development environment we can use or server from any port
if (process.env.NODE_ENV === 'development'){
    //Use express midleware and every those headers and methods can access to out service
    app.use((req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-with, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
        next();
    });
}

//If we are in a production environment
if (process.env.NODE_ENV === 'production'){
    //use files in dist
    app.use(express.static(path.join(process.cwd(), 'dist')))
}
//Declare my services and endpoint when use the server, Main path
app.use('/api/questions', question);
app.use('/api/auth', auth);

export default app;