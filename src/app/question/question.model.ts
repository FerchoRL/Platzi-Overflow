import { Answer } from '../answer/answer.model';

//Create class(model) question with constructor. Then I will use with differents objects
export class Question {
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
		this.title = title;
		this.description = description;
		this.createdDate = createdDate;
		this.icon = icon;
		this.answer = [];
	}
}