import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import urljoin from 'url-join';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable()
export class AuthService {
    usersUrl: string;
    currentUser?: User;

    constructor(private http: HttpClient){
        this.usersUrl = urljoin(environment.apiUrl,'auth');
        if (this.isLoggedIn()){
            const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
            this.currentUser = new User(email,null,firstName,lastName,userId);
        }
    }

    //Method to signIn
    signIn(user: User){
        const body = JSON.stringify(user);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(urljoin(this.usersUrl,'signin'), body, { headers })
            .pipe(
                map((response: any)=>{
                    const json = response.json();
                    this.login(response);
                    return json;
                }),
                catchError((error: Response) => {
                    console.log(error);
                    return Observable.throw(error.json);
                })
            );
    }

    login = ({ token, userId, firstName, lastName, email}) => {
        this.currentUser = new User(email, null, firstName, lastName, userId);
        //Local storage guarda localmente los datos que se le envian (normalmente credenciales de inicio de sesion)
        localStorage.setItem('token', token);
        //Seria interesante ver la diferencia con la siguiente linea
        //localStorage.setItem('user', JSON.stringify(this.currentUser));
        localStorage.setItem('user', JSON.stringify( { userId, firstName, lastName, email }));
    }

    isLoggedIn(){
        //if is different nul, then the user is logged
        return localStorage.getItem('token') !== null;
    }
}