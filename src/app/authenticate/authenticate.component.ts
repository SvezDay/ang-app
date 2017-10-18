import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { AuthenticationService }    from '../_core/authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: 'authenticate.component.html',
    styleUrls: ['../app.component.css','authenticate.component.css']
})

export class AuthenticateComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthenticationService
    ){}

    ngOnInit() {
      // reset login status
      this.auth.logout();
      
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.auth.login(this.model.email, this.model.password)
        .subscribe(
        user => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.loading = false;
        });
    }
}
