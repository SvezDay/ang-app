import { Component }                        from '@angular/core';
import { Router, ActivatedRoute }           from '@angular/router';

import { AuthenticationService }            from '../_core/authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['../app.component.css','register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    return_url: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private auth: AuthenticationService
     ) { }

     ngOnInit(){
       this.return_url = this.route.snapshot.queryParams['returnUrl'] || '/';
     };

    register() {
      this.loading = true;

      this.auth.register(this.model)
      .subscribe(
          (user) => {
              // set success message and pass true paramater to persist the message after redirecting to the login page
              //  this.router.navigate(['/authenticate']);
               this.router.navigate([this.return_url]);
          },
          error => {
              this.loading = false;
      });
    };

}
