import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import urljoin from 'url-join';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
    usersUrl: string;
    currentUser?: User;

    constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar){
        this.usersUrl = urljoin(environment.apiUrl,'auth');
        if (this.isLoggedIn()){
            const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
            this.currentUser = new User(email,null,firstName,lastName,userId);
        }
    }

    //Method to signIn
    signIn(user: User): Observable<any>{
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
                    return throwError(error);
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

    signup(user: User, secondPass: string){
        //If I need to send more parameters in my body from fronted:
        const body = JSON.stringify({user,'secondPass':secondPass});
        console.log("myBody: "+body);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(urljoin(this.usersUrl, 'signup'), body, { headers })
            .pipe(
                
                map((response: any)=>{
                    this.login(response);
                    return response;
                }),
                catchError((error: Response) => {
                    console.log(error);
                    return throwError(error);
                })
            );
    }

    public showError = (message) => {
        this.snackBar.open(message,'x',{ duration: 2500});
    }

    public handleError = (error: any) => {
        const { error: { name }, message } = error;
        console.log('name: '+error);
        if (name === 'TokenExpiredError') {
            this.showError('Tu sesion ha expirado');
        } else if ( name === 'JsonWebTokenError') {
            this.showError('Ha habido un problema con tu sesion');
        }else{
            this.showError(message || 'Ha ocurrido un error. Intentalo nuevamente');
        }
        this.logout();
    }
}