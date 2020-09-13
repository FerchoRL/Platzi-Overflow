//Create a ts component for my sign-in screen component
import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { User } from '../auth/user.model';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-signin-screen',
	templateUrl: './signin-screen.component.html',
	styleUrls: ['./signin-screen.component.css']
})

//To add validations use onInit (Cuando se inicia el componente)
//With reactive forms its neccesary use Form  and Validators
//Also we need to add ReactiveFormsModule on app module
export class SignInScreenComponent implements OnInit{
	signinForm: FormGroup;

	constructor(private authService: AuthService){}

	ngOnInit(){
		this.signinForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				//email is required and match with regular expressions
				Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
				]),
			password: new FormControl(null, Validators.required)
		});
	}

	onSubmit(){
		if (this.signinForm.valid) {
			const { email, password } = this.signinForm.value;
			const user = new User(email,password);
			this.authService.signIn(user)
				.subscribe(
					//If signin correct then login
					this.authService.login,
					err => console.log(err)
				);
			console.log(user);
		}else{
			console.log("You write an invalid user");
		}
	}
}