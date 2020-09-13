//Create a ts component for my question-detail component
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Question } from './question.model';
import { QuestionService } from './question.service'

@Component({
	selector: 'app-question-detail',
	templateUrl: './question-detail.component.html',
	styleUrls: ['./question-detail.component.css'],
	providers: [QuestionService]//To conect my backend with my frontend
})
export class QuestionDetailComponent implements OnInit, OnDestroy{
	//Use route to use the params of the route url
	constructor(private questionService: QuestionService, private route: ActivatedRoute){}
	//Call my component question and send parameters (create an object)
	/*question: Question = new Question(
		'Esta es una nueva pregunta sobre Android',
		'Miren, tengo esta duda sobre una App de Android',
		new Date,
		'devicon-android-plain'
	);*/

	question?: Question;
	loading = true;
	sub: any;

	ngOnInit(){
		//Generate a subscription and it's open while we are in our dom
		this.sub = this.route.params.subscribe(params => {
			this.questionService
			.getQuestion(params.id)//We define this id in question.routing
			.then((question:Question) =>{//question from backend
				this.question = question;//this.question of frontend
				this.loading = false;
			});
		});
	}

	//Unsubcriber the sub
	ngOnDestroy(){
		this.sub.unsubscribe();
	}
}