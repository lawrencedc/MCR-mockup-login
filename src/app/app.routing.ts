import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forgetPassword/forgetPassword.component';
import { ConfirmPasswordComponent } from './confirmPassword/confirmPassword.component';
// import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { Session } from '../session/session';
// import { RegisterComponent } from './register/index';
// import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [Session] },
    { path: 'login', component: LoginComponent },
    { path: 'forgetPassword', component: ForgetPasswordComponent },
    { path: 'confirmPassword', component: ConfirmPasswordComponent },
    // { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);