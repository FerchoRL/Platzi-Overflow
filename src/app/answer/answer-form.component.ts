//Create a ts component for my answer-form component
import { Component,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import SweetScroll from 'sweet-scroll';
import { Router } from '@angular/router';

import { Answer } from './answer.model';
import { User } from '../auth/user.model';
import { Question } from '../question/question.model';
import { QuestionService } from '../question/question.service';
import { AuthService } from '../auth/auth.service'

//Indicate where can I find the template, which selector I will use and the css
@Component({
	selector: 'app-answer-form',
	templateUrl: './answer-form.component.html',
	styleUrls: ['./answer-form.component.css'],
	providers: [QuestionService]
})
export class AnswerFormComponent{
	//Con Input indico que es una propiedad que se le va a pasar
	@Input() question: Question;
	sweetScroll: SweetScroll;

	constructor(
		private questionService: QuestionService,
		private authService: AuthService,
		private router: Router
		){
		this.sweetScroll = new SweetScroll();
	}
	//Call my component answer(onSubmit) and send parameters (create an object)
	onSubmit(form: NgForm){
		//If user is not loggin when create an answer then go to signin window
		if (!this.authService.isLoggedIn()) {
			this.router.navigateByUrl('/signin');
		}
		const answer = new Answer(
			form.value.answerDescription,
			this.question
		);
		this.questionService
			.addAnswer(answer)
			.subscribe(
				//put a from backend into array answers
				a => {
					this.question.answers.unshift(a),
					this.sweetScroll.to('#title-answers')
				},
				this.authService.handleError
			);
		form.reset();
		console.log(answer.question);
		//Agrego la respuesta que genere aqui a la propiedad answer de mi pregunta
		//this.question.answer.unshift(answer);
		//Reseteo el formulario para que borre los datos despues de insertar la pregunta
		//form.reset();
	}
}