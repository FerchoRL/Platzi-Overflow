//Create a ts component for my sign-up screen component
import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from './user.model';

@Component({
	selector: 'app-signup-screen',
	templateUrl: 'signup-screen.component.html',
	//I use the same css of signin-screen
	styleUrls: ['signin-screen.component.css']
})

//To add validations use onInit (Cuando se inicia el componente)
//With reactive forms its neccesary use Form  and Validators
//Also we need to add ReactiveFormsModule on app module
export class SignUpScreenComponent implements OnInit{
	signupForm: FormGroup;
	ngOnInit(){

		//implement all the validators for each field of my form
		this.signupForm = new FormGroup({
			firstName: new FormControl(null,[
				Validators.required,
				Validators.pattern(/^[a-zA-Z ]+$/i)
				]),
			lastName: new FormControl(null,[
				Validators.required,
				Validators.pattern(/^[a-zA-Z ]+$/i)
				]),
			email: new FormControl(null,[
				Validators.required,
				Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
				]),
			password: new FormControl(null,[
				Validators.required]),
			secondPass: new FormControl(null,[
				Validators.required])
		});
	}

	onSubmit(){
		//When click on sign up save all the fields in User
		if (this.signupForm.valid) {
			const { email, password, firstName, lastName } = this.signupForm.value;
			const user = new User(email, password, firstName, lastName);
			console.log(user);
		}
		else{
			console.log("is invalid");
		}
	}
}