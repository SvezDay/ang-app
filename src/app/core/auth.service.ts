import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Headers, Http, Request, RequestOptions, RequestMethod, URLSearchParams} from '@angular/http';
import Auth0Lock from 'auth0-lock';
import {AuthHttp} from 'angular2-jwt';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { CONFIG } from '../../../config/config';

@Injectable()
export class AuthService {
   userProfile: any;
   // lock = new Auth0Lock(CONFIG.clientID, CONFIG.domain,{
   //    oidcConformant: true,
   //    autoclose: true,
   //    auth: {
   //       redirectUrl: CONFIG.callbackURL,
   //       responseType: 'token id_token',
   //       audience: CONFIG.audience,
   //       params: {
   //          scope: 'openid profile user_metadata email'
   //       }
   //    },
   //    rememberLastLogin: true,
   //    //  allowForgotPassword: true,
   //    //  languageDictionary: { title: 'Cowoffee'},
   //    //  socialButtonStyle: 'small'
   // });

   constructor(private router: Router, public authHttp: AuthHttp, public http: Http) {
      // this.lock.on("authenticated", (authResult:any) => {
      //    console.log(JSON.stringify(authResult));
      //    localStorage.setItem("access_token", authResult.accessToken);
      //    localStorage.setItem("id_token", authResult.idToken);
      //    if( authResult.idTokenPayload && authResult.idTokenPayload.updated_at){
      //       let expires_at = authResult.idTokenPayload.updated_at + authResult.expiresIn;
      //       localStorage.setItem("expires_at", expires_at);
      //       let user_info = {
      //          first: authResult.idTokenPayload.given_name,
      //          last: authResult.idTokenPayload.family_name,
      //          email: authResult.idTokenPayload.email,
      //          email_verified: authResult.idTokenPayload.email_verified
      //       };
      //
      //       if (authResult.idTokenPayload.sub){
      //          let str = authResult.idTokenPayload.sub;
      //          let re = /(google-oauth2)\|([0-9]*)/gi;
      //          let match = re.exec(str);
      //          user_info['auth_type'] = match[1];
      //          user_info['auth_user_id'] = match[2];
      //       }else{
      //          return console.log('error login: no auth user id');
      //       };
      //       localStorage.setItem("test", JSON.stringify(authResult));
      //       localStorage.setItem("first", user_info.first);
      //       localStorage.setItem("last", user_info.last);
      //       localStorage.setItem("email", user_info.email);
      //       localStorage.setItem("email_verified", user_info.email_verified);
      //       console.log(user_info);
      //
      //       this.authHttp.post(`${CONFIG.API_URL}/person_check`, {user_info: user_info})
      //       // .map(res => res.json())
      //       .subscribe(
      //          // data => localStorage.setItem('profile', data),
      //          data => console.log(data),
      //          error => console.log(error),
      //          () => this.router.navigate(['/profile'])
      //       );
      //    }
      // });
   }
   signup(): void{

   }
   login(cred:any): void {
      // this.lock.show();

   }
   public handleAuthentication(): void {
      //   this.auth0.parseHash((err, authResult) => {
      //     if (authResult && authResult.accessToken && authResult.idToken) {
      //        localStorage.setItem('test_access_token', authResult.accessToken);
      //       window.location.hash = '';
      //       this.setSession(authResult);
      //       localStorage.setItem('test1', typeof authResult);
      //       localStorage.setItem('test2', JSON.stringify(authResult));
      //       this.router.navigate(['/profile']);
      //     } else if (err) {
      //       this.router.navigate(['/profile']);
      //       console.log(err);
      //     }
      //   });
   }

   // private setSession(authResult): void {
   //   // Set the time that the access token will expire at
   //   const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
   //   localStorage.setItem('access_token', authResult.accessToken);
   //   localStorage.setItem('id_token', authResult.idToken);
   //   localStorage.setItem('expires_at', expiresAt);
   //  //  localStorage.setItem('userId', authResult.user_id);
   //  //  this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
   //  //     if (profile) {
   //  //       localStorage.setItem('profile', profile.email);
   //  //     }
   //  //   });
   // }
   // public getProfile(cb): void {
   //   const accessToken = localStorage.getItem('access_token');
   //   if (!accessToken) {
   //     throw new Error('Access token must exist to fetch profile');
   //   }
   //
   //   const self = this;
   //   this.auth0.client.userInfo(accessToken, (err, profile) => {
   //     if (profile) {
   //       self.userProfile = profile;
   //     }
   //     cb(err, profile);
   //   });
   // }

   public logout(): void {
      // Remove tokens and expiry time from localStorage

      // Go back to the home route
      this.router.navigate(['/']);
   }

   public isAuthenticated(): boolean {
      // Check whether the current time is past the ---- Modify the function --------------------------   WARNING
      if(localStorage.getItem('token')){ return true }
      else{ return false }
   }
}
