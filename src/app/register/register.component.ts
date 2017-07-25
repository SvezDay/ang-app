import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';

import { AlertService }             from '../_core/alert.service';
import { UserService }              from '../_core/user.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styles: ['register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
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
