//Add an anotation to the class to inject in the components
import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


//Define methods to get questionList and questionID from backend
@Injectable()
export class QuestionService {

    private questionsUrl: string;

    //Inject http in the servie
    constructor(private http: HttpClient){
        //Define URL to get the questions. urljoin add the '/' at the end of the endpoint
        //Import apiUrl from environments
        this.questionsUrl = urljoin(environment.apiUrl, 'questions');
    }

    //Url to get questionList
    getQuestions(): Promise<void | Question[]>{
        //Call http in the backend. 
        return this.http.get(this.questionsUrl)
            .toPromise()//To get a correct or incorrect response
            .then(response => response as Question[])
            .catch(this.handleError)
    }

    //Url to get question id
    getQuestion(id): Promise<void | Question> {
        const url = urljoin(this.questionsUrl, id)
        return this.http.get(url)
            .toPromise()
            .then(response => response as Question)
            .catch(this.handleError);
    }

    //Url to create new question(post)
    addQuestion(question: Question): Observable<any>{
        //Create an string of the question
        const body = JSON.stringify(question);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        //Create the post to our questionsUrl
        return this.http.post(this.questionsUrl, body, { headers })
            .pipe(
                catchError((error: Response) => Observable.throw(error.json))
            );
    }

    handleError(error: any){
        const errMsg = error.message ? error.message : 
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
    }
}