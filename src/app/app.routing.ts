import { Routes, RouterModule } from '@angular/router';
import { QuestionScreenComponent } from './question/question-screen.component';
import { SignInScreenComponent } from './auth/signin-screen.component';
import { SignUpScreenComponent } from './auth/signup-screen.component';
import { QUESTION_ROUTES } from './question/question.routing';

const APP_ROUTES: Routes = [
    { path: '', component: QuestionScreenComponent, pathMatch: 'full' },
    { path: 'signin', component: SignInScreenComponent },
    { path: 'signup', component: SignUpScreenComponent },
    { path: 'questions', children: QUESTION_ROUTES }
    /*
        children is for:
        /question --> questionList
        /question/new --> new question screen
        /question/:id --> question detail
     */
];

//Sistema de rutas para nuesta aplicacion
export const Routing = RouterModule.forRoot(APP_ROUTES);