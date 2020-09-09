import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from './question.model';
import icons from './icons';
import { QuestionService } from './question.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-detail.component.css'],
    providers: [QuestionService]//To conect my backend with my frontend
})

export class QuestionFormComponent{
    //Inject QuestionServie and Router
    constructor(private questionService: QuestionService, private router: Router){}
    icons: Object[] = icons;
    loading = true;

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
                //({ _id }) => console.log(_id),
                error => console.log(error)
            );
        form.resetForm();
    }
}