import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { Session } from '../session/session';

import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forgetPassword/forgetPassword.component';
import { ConfirmPasswordComponent } from './confirmPassword/confirmPassword.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import { APIModel } from '../models/APIModel';
import { TokenModel } from './../models/TokenModel';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ConfirmPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    ToastModule.forRoot()
  ],
  providers: [
    CookieService,
    APIModel,
    TokenModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
