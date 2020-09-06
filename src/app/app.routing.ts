import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question/question-list.component';
import { SignInScreenComponent } from './auth/signin-screen.component';
import { SignUpScreenComponent } from './auth/signup-screen.component';

const APP_ROUTES: Routes = [
    { path: '', component: QuestionListComponent, pathMatch: 'full' },
    { path: 'signin', component: SignInScreenComponent },
    { path: 'signup', component: SignUpScreenComponent }
];

//Sistema de rutas para nuesta aplicacion
export const Routing = RouterModule.forRoot(APP_ROUTES);