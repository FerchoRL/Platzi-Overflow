import express from 'express';
import jwt from 'jsonwebtoken';
import Debug from 'debug';
import { secret } from '../config';
import { User } from '../models'


const app = express.Router();
const debug = Debug('Platzi-overflow: auth-middleware');

app.post('/signin', async (req, res, next) =>{
    const { email, password } = req.body;//email and password from fronted
    //Find user in DB
    const user = await User.findOnde({ email });

    //If email not found or password don't match

    if(!user){
        debug (`User with email ${email} not found`);
        return handleLoginFailed(res, 'El usuario con ese correo no existe');
    }

    if(!comparePass(password, user.password)){
        debug (`Passwords do not match: ${password} !=== ${user.password}`);
        return handleLoginFailed(res, 'El correo y la contraseña no coinciden');
    }
    //When email and pass are correct

    //Take the email and pass from user and then encode it. Token expires in 1 day
    const token = createToken(user);
    res.status(200).json({
        message: 'Login succeded',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
});

//Create method for Sign up
app.post('/signup', async (req,res) =>{
    //How to receive more parameter from frontend
    const { firstName, lastName, email, password } = req.body.user;
    const { secondPass } = req.body;
    console.log('password: '+password+' secondPass: '+secondPass)
    const u = new User({
        firstName,
        lastName,
        email,
        password
    });
    if (password === secondPass) {
        debug(`Creating new user: ${u}`);
        //To send the new user to DB (I guess)
        const user = await u.save();
        const token = createToken(user);
        res.status(201).json({
            message: 'User saved',
            token,
            userId: user._id,
            firstName,
            lastName,
            email
        })
    }else{
        debug (`Passwords do not match: ${password} !=== ${secondPass}`);
        return handleLoginFailed(res, 'Las contraseñas no coinciden');
    }
    
})

function comparePass(providedPass, userPass){
    return providedPass === userPass;
}

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 86400 });

function handleLoginFailed(res, message){
    return res.status(401).json({
        message: 'Login failed',
        error: message || 'Email and password don\'t match'
    });
}

export default app;