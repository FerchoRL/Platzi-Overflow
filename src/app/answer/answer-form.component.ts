//Create a ts component for my answer-form component
import { Component,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer,User } from './answer.model';
import { Question } from '../question/question.model';

//Indicate where can I find the template, which selector I will use and the css
@Component({
	selector: 'app-answer-form',
	templateUrl: './answer-form.component.html',
	styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent{
	//Con Input indico que es una propiedad que se le va a pasar
	@Input() question: Question;
	//Call my component answer(onSubmit) and send parameters (create an object)
	onSubmit(form: NgForm){
		const answer = new Answer(
			form.value.answerDescription,
			this.question,
			new Date(),
			new User('Fernando','Lagunes')
		);
		console.log(answer.question);
		//Agrego la respuesta que genere aqui a la propiedad answer de mi pregunta
		this.question.answer.unshift(answer);
		//Reseteo el formulario para que borre los datos despues de insertar la pregunta
		form.reset();
	}
}