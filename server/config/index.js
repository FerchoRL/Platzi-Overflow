//It help to encode the tokens we sent to the client. In this case i can set the secret in HEROKU
export const secret = process.env.SECRET || 'miclavesecreta';

//MONGODB_URI is not defined because I can't install mongodblab in HEROKU. Then it will be use localhost
export const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/platzi-overflow';

export const port = process.env.PORT || 3000;