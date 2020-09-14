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
};

export const questions = new Array(1).fill(question);

//Create a middleware that get all the questions
export const questionsMiddleware =(req, res, next) => {
    req.questions =  questions
    next();//execute the next middleware
}

//Create a middleware that get a question with his _id
export const questionMiddleware = (req, res, next) => {
    const { id } = req.params; // is same like req.params.id
    req.question =  questions.find(({ _id }) => _id === +id);//with +id convert the id in number. Also we use the function to search the questions using the id. This is with arrow function
    next();//execute the next middleware
}