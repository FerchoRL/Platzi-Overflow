//Create a ts component for my answer-form component
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

//Indicate where can I find the template, which selector I will use and the css
@Component({
	selector: 'app-answer-form',
	templateUrl: './answer-form.component.html',
	styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent{
	//Call my component answer(onSubmit) and send parameters (create an object)
	onSubmit(form: NgForm){
		console.log(form.value.answerDescription);
	}
}