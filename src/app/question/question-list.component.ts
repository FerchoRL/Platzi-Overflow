import { Component, OnInit } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service'

@Component({
	selector: 'app-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-detail.component.css'],
	providers: [QuestionService]//To conect my backend with my frontend
})

export class QuestionListComponent implements OnInit{
	constructor(private questionService: QuestionService){
		//Angular can inject the object without any code
	}
	questions: Question[];
	loading = true;//Indicate if we charge the data from backend

	ngOnInit(){
		this.questionService
			.getQuestions()//Backend method for get questionList
			.then((questions: Question[]) =>{
				this.questions = questions;
				this.loading = false;//When charge all questions
				console.log(this.questions)
			})
	}
}