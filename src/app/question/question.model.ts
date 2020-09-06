import { Answer } from '../answer/answer.model';

//Create class(model) question with constructor. Then I will use with differents objects
export class Question {
	_id?: string;
	title: string;
	description: string;
	createdDate?: Date;
	icon?: string;
	answer: Answer[];

	constructor(
		title: string,
		description: string,
		createdDate?: Date,
		icon?: string
		){
		this._id = '1';
		this.title = title;
		this.description = description;
		this.createdDate = createdDate;
		this.icon = icon;
		this.answer = [];
	}
}