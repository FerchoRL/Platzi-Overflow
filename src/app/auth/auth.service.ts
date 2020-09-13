import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import urljoin from 'url-join';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable()
export class AuthService {
    usersUrl: string;
    currentUser?: User;

    constructor(private http: HttpClient, private router: Router){
        this.usersUrl = urljoin(environment.apiUrl,'auth');
        if (this.isLoggedIn()){
            const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
            this.currentUser = new User(email,null,firstName,lastName,userId);
        }
    }

    //Method to signIn
    signIn(user: User) : Observable<any>{
        const body = JSON.stringify(user);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        
        return this.http.post(urljoin(this.usersUrl, 'signin'), body, { headers })
            .pipe(
                
                map((response: any)=>{
                    this.login(response);
                    return response;
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
        //After signin go home
        this.router.navigateByUrl('/');
    }

    isLoggedIn(){
        //if is different null, then the user is logged
        return localStorage.getItem('token') !== null;
    }

    logout(){
        //Clean the local storage and current user is null
        localStorage.clear();
        this.currentUser = null;
        this.router.navigateByUrl('/');
    }
}