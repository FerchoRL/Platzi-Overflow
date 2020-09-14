import http from 'http';
import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl } from './config'

const PORT = 3000;
const debug = new Debug('platzi-overflow:root');

//Process async to start the server after the conection with the DB
async function start() {
    await mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

    //declare with arrow function
    //Hacer que mi app escuche en el puerto que le dijimos
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`)
    });
}

start();