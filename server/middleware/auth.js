import Debug from 'debug';
import jwt from 'jsonwebtoken';
import { secret } from '../config';

const debug = Debug('Platzi-overflow: auth-middleware');

export const users = [
    {
        firstName: 'Fercho',
        lastName: 'Lagunes',
        email: 'rlfernando7@gmail.com',
        password: '12345',
        _id: 123
    }
];

/* is the same than next function
const findUserByEmail = e => users.find(({ email }) => email === e)*/
//Function to return an user by email
export const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
}

export const required = (req, res, next) => {
  //Verify token is valid then call next middleware. If not 401 
  jwt.verify(req.query.token, secret, (err,token) => {
      if (err) {
          debug('JWTF was not encrypted with our secret');
          return res.status(401).json({
              message: 'Unauthorized. You need to login to do this thing',
              error: err
          });
      }
      debug(`Token verified ${token}`);
      //We can access to the user. We receive token from frontend
      req.user = token.user;
      next();
  })
}