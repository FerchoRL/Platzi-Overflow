//Create model for answer using only the constructor
import { Question } from '../question/question.model';

export class User{
	constructor(
		public firstName: string,
		public lastName: string
	)//Method implementation
	{}
}
export class Answer{
	constructor(
		public description: string,
		public question: Question,
		public createDate?: Date,
		public user?: User
	){}
}