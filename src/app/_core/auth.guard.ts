import { Injectable }                  from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
                                     } from '@angular/router';
import {Observable}                    from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
      let auth = localStorage.getItem('auth_token');
      let exp = localStorage.getItem('auth_token_exp')
      let now = new Date().getTime();
        if (auth && Number(exp) > now) {
        // if(localStorage.getItem('auth_token_exp')){
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/authenticate'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['/authenticate']);
        return false;
    }
}
