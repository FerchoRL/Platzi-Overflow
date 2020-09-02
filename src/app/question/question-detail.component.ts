//Create a ts component for my question-detail component
import { Component } from '@angular/core';
import { Question } from './question.model';

@Component({
	selector: 'app-question-detail',
	templateUrl: './question-detail.component.html',
	styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent{
	//Call my component question and send parameters (create an object)
	question: Question = new Question(
		'Esta es una nueva pregunta sobre Android',
		'Miren, tengo esta duda sobre una App de Android',
		new Date,
		'devicon-android-plain'
	);
}