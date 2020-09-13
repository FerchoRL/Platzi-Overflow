import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Question } from './question.model';
import icons from './icons';
import { QuestionService } from './question.service';
import { AuthService } from '../auth/auth.service'



@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-detail.component.css'],
    providers: [QuestionService]//To conect my backend with my frontend
})

export class QuestionFormComponent implements OnInit{
    //Inject QuestionServie and Router
    constructor(
        private questionService: QuestionService,
        private authService: AuthService,
        private router: Router
        ){}
    icons: Object[] = icons;
    loading = true;

    ngOnInit(){
        //If user is not loggin when create a question then go to signin window
        if (!this.authService.isLoggedIn()) {
			this.router.navigateByUrl('/signin');
		}
    }

    getIconVersion(icon: any){
        let version;
        if (icon.versions.font.includes('plain-wordmark')){
            version = 'plain-wordmark';
        }else{
            version = icon.versions.font[0];
        }
        return version;
    }

    onSubmit(form: NgForm){
        const question = new Question(
            form.value.title,
            form.value.description,
            new Date(),
            form.value.question_Icon
        );
        //console.log(question)
        //La bronca es aqui ya que no puedo enviar mi post al backend
        this.questionService.addQuestion(question)
        //Subscribe to get an exit or error in the function 
            .subscribe(
                //Get question _id and go to the question detail with router navigation passing the path and id
                ({ _id }) => this.router.navigate(['/questions', _id]),
                //({ _id }) => console.log(_id),}
                //No envia el mensaje correcto en el snack bar
                this.authService.handleError
            );
        form.resetForm();
    }
}