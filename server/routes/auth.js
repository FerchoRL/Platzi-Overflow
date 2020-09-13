import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';

const app = express.Router();
const debug = Debug('Platzi-overflow: auth');

const users = [
    {
        firstName: 'Fercho',
        lastName: 'Lagunes',
        email: 'rlfernando7@gmail.com',
        password: '12345',
        _id: 123
    }
];

const secret = 'miclavesecreta';

app.post('/signin', (req, res, next) =>{
    const { email, password } = req.body;//email and password from client
    const user = findUserByEmail(email);

    //If email not found or password don't match

    if(!user){
        debug (`User with email ${email} not found`);
        return handleLoginFailed(res);
    }

    if(!comparePass(password, user.password)){
        debug (`Passwords do not match: ${password} !=== ${user.password}`);
        return handleLoginFailed(res);
    }
    //When email and pass are correct

    //Take the email and pass from user and then encode it. Token expires in 1 day
    const token = jwt.sign({ user }, secret, { expiresIn: 86400 });
    res.status(200).json({
        message: 'Login succeded',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
});

/* is the same than next function
const findUserByEmail = e => users.find(({ email }) => email === e)*/
//Function to return an user by email
function findUserByEmail(email){
    return users.find(user => user.email === email);
}

function comparePass(providedPass, userPass){
    return providedPass === userPass;
}

function handleLoginFailed(res){
    return res.status(401).json({
        message: 'Login failed',
        error: 'Email and password don\'t match'
    });
}

export default app;