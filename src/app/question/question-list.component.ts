import { Component } from '@angular/core';
import { Question } from './question.model';

const newQuestion = new Question(
	"¿Como guardo una expresion regular en una variable en Angular?","Pregunta que surgio en el curso de MEAN 2017", new Date(),'devicon-angularjs-plain'
);
@Component({
	selector: 'app-question-list',
	templateUrl: './question-list.component.html'
})

export class QuestionListComponent{
	questions: Question[] = new Array(10).fill(newQuestion)
}