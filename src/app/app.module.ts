//Import all the modules I need to use to my project
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { QuestionDetailComponent } from './question/question-detail.component';
import { MomentModule } from 'angular2-moment';
import { AnswerFormComponent } from './answer/answer-form.component';
import { SignInScreenComponent } from './auth/signin-screen.component';
import { SignUpScreenComponent } from './auth/signup-screen.component';
import { QuestionListComponent } from './question/question-list.component';
import { QuestionFormComponent } from './question/question-form.component';
import { Routing } from './app.routing';
import { AuthService } from './auth/auth.service'


//Indicate which modules or declarations I will use in my project
@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswerFormComponent,
    SignInScreenComponent,
    SignUpScreenComponent,
    QuestionListComponent,
    QuestionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    Routing,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { };
