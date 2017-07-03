import { Injectable }                  from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,
   RouterStateSnapshot }               from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
// import {Injectable} from '@angular/core';
// import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// import {CanActivate} from '@angular/router';
// import {Auth} from './auth.service';
//
// @Injectable()
// export class AuthGuard implements CanActivate{
//     constructor(private auth: Auth, private router: Router){
//
//     }
//
//     canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//         if(this.auth.authenticated()){
//             console.log('AUTH GUARD PASSED');
//             return true;
//         } else {
//             console.log('BLOCKED BY AUTH GUARD');
//             this.auth.login();
//             return false;
//         }
//     }
// }
