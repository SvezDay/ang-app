import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';
// import { Http, Headers, RequestOptions, Response }
//                                     from '@angular/http';

import { AlertService }             from '../_core/alert.service';
import { UserService }              from '../_core/user.service';
// import { User }                     from '../_models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styles: ['register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;
   //  api_url = 'http://localhost:3200';

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
      //   private http: Http
     ) { }

    register() {
        this.loading = true;
      //   this.http
      //       .post(this.api_url + '/register', this.model)
      //       .map((response: Response)=>{
      //          let resp = response.json();
      //          console.log(resp);
      //         this.alertService.success('Registration successful', true);
      //         this.router.navigate(['/authenticate']);
      //       });

        this.userService.register(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                     this.alertService.success('Registration successful', true);
                     this.router.navigate(['/authenticate']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
