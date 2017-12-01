import { APIModel } from './../../models/APIModel';
import { TokenModel } from './../../models/TokenModel';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CookieService } from 'ngx-cookie-service';

import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

@Component({
   templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    constructor(
        private _httpService: Http,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager,
        private cookieService: CookieService,
        public api_model: APIModel,
        public access_model: TokenModel,
        vcr: ViewContainerRef
    ) { 
        this.toastr.setRootViewContainerRef(vcr);
    }

    private returnUrl: string;

    // login form
    private loginform: FormGroup;
    private usernameLogin: FormControl;
    private passwordLogin: FormControl;

    private apiUrl = 'http://localhost:4066/api/token';

    ngOnInit() {
        if (this.cookieService.get('access_token')) {
            console.log('Cookie Not Expired');
            this.router.navigate(['/']);
        } else {
            console.log('Expired');
            this.removeCookie();
        }

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.usernameLogin = new FormControl('', Validators.required);
        this.passwordLogin = new FormControl('', Validators.required);
    }

    createForm() {
        this.loginform = new FormGroup({
            username: this.usernameLogin,
            password: this.passwordLogin
        });
    }

    removeCookie() {
        this.cookieService.deleteAll();
        localStorage.clear();
    }

    login() {
        if (this.loginform.valid) {
            const body = new URLSearchParams();
            body.set('username', this.loginform.value['username']); // 'yourchapter/testcgn19284@mychapterroom.com');
            body.set('password', this.loginform.value['password']);
            body.set('grant_type', 'password');
            // const _apimodel = this.api_model = new APIModel();
            // interface RootObject {
            //     _body: string;
            //     status: number;
            //     ok: boolean;
            //     statusText: string;
            //     headers: Headers;
            //     type: number;
            //     url: string;
            // }
            // this.api_model = new APIModel();
            // interface AccessToken {
            //     access_token: string;
            //     token_type: string;
            //     expires_in: number;
            //     User: string;
            //     MemberId: string;
            //     MemberType: string;
            //     ChapterId: string;
            //     BondId: string;
            //     FirstName: string;
            //     LastName: string;
            //     IsAdmin: string;
            // }

            this._httpService.post(this.apiUrl, body)
                .subscribe(
                    data => {
                        this.loginform.reset();
                        const response = JSON.stringify(data);
                        const jsonObj: any = JSON.parse(response);
                        // const obj: RootObject = <RootObject>jsonObj;
                        // const obj = new APIModel();
                        // this.api_model = <APIModel>jsonObj;

                        const obj: APIModel = <APIModel>jsonObj;
                        const accessToken: TokenModel = <TokenModel>JSON.parse(obj._body);

                        console.log('token', accessToken);

                        localStorage.setItem('MemberId', accessToken.MemberId);
                        localStorage.setItem('MemberType', accessToken.MemberType);
                        localStorage.setItem('ChapterId', accessToken.ChapterId);
                        localStorage.setItem('FirstName', accessToken.FirstName);
                        localStorage.setItem('LastName', accessToken.LastName);
                        localStorage.setItem('IsAdmin', accessToken.IsAdmin);
                        localStorage.setItem('token_type', accessToken.token_type);

                        this.cookieService.set('access_token', accessToken.access_token, accessToken.expires_in);
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        if (error.status === 404) {
                            return this.toastr.warning('Account Not Found', '404');
                        }

                        this.toastr.error('Error in logging in.', 'Oops!');
                    }
                );
        }
    }

    forgetPassword() {
        this.router.navigate(['/forgetPassword']);
    }
}