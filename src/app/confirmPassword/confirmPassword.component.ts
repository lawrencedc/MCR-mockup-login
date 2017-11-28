import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

@Component({
   templateUrl: './confirmPassword.component.html'
})

export class ConfirmPasswordComponent implements OnInit {
    constructor(
        private _httpService: Http,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager,
        vcr: ViewContainerRef
    ) { this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
    }

    signIn() {
        this.router.navigate(['/login']);
    }
}