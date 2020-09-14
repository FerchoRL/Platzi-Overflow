import { Component } from '@angular/core';

import { QuestionService } from './question.service';

@Component({
	selector: 'app-question-screen',
	templateUrl: './question-screen.component.html',
	styleUrls: ['./question-detail.component.css'],
	providers: [QuestionService]//To conect my backend with my frontend
})

export class QuestionScreenComponent{

}