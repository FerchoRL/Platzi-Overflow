//Create model for answer using only the constructor
import { Question } from '../question/question.model';
import { User } from '../auth/user.model';
export class Answer{
	constructor(
		public description: string,
		public question: Question,
		public createDate?: Date,
		public user?: User
	){}
}