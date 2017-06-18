import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Headers, Http, Request, RequestOptions, RequestMethod, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { AUTH_CONFIG } from '../../../config/auth.config';


// import { tokenNotExpired } from 'angular2-jwt';
// import { myConfig } from '../../../config/auth.config';

// import {routing, appRoutingProviders} from './app-routing.module';

// Avoid name not found warnings
// declare var Auth0Lock: any;

@Injectable()
export class AuthService{
   userProfile: any;
   API_URL: string = 'http://localhost:3200/api';
  // auth0 = new auth0.WebAuth({
  //   clientID: 'OGZd6gS5rnKZl8Y2a37vpUqycCU0DkLk',
  //   domain: 'svezday.eu.auth0.com',
  //   responseType: 'token id_token',
  //   audience: 'https://svezday.eu.auth0.com/userinfo',
  //   redirectUri: 'https://ang-rest-graph-web.herokuapp.com',
  //   scope: 'openid profile read:course create:course'
  // });

  // lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain)
  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain,{
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUrl: AUTH_CONFIG.callbackURL,
      responseType: 'token id_token',
      audience: AUTH_CONFIG.audience,
      params: {
        scope: 'openid profile user_metadata email'
      // scope: 'openid profile email'
      }
    },
    rememberLastLogin: true,
   //  allowForgotPassword: true,
   //  languageDictionary: { title: 'Cowoffee'},
   //  socialButtonStyle: 'small'
  });

  constructor(private router: Router, public authHttp: AuthHttp, public http: Http) {
     this.lock.on("authenticated", (authResult:any) => {
        console.log(JSON.stringify(authResult));
         localStorage.setItem("access_token", authResult.accessToken);
         localStorage.setItem("id_token", authResult.idToken);
         if( authResult.idTokenPayload && authResult.idTokenPayload.updated_at){
            let expires_at = authResult.idTokenPayload.updated_at + authResult.expiresIn;
            localStorage.setItem("expires_at", expires_at);
            let user_info = {
               first: authResult.idTokenPayload.given_name,
               last: authResult.idTokenPayload.family_name,
               email: authResult.idTokenPayload.email,
               email_verified: authResult.idTokenPayload.email_verified
            };

            if (authResult.idTokenPayload.sub){
               let str = authResult.idTokenPayload.sub;
               let re = /(google-oauth2)\|([0-9]*)/gi;
               let match = re.exec(str);
               user_info['auth_type'] = match[1];
               user_info['auth_user_id'] = match[2];
            }else{
               return console.log('error login: no auth user id');
            };
            localStorage.setItem("test", JSON.stringify(authResult));
            localStorage.setItem("first", user_info.first);
            localStorage.setItem("last", user_info.last);
            localStorage.setItem("email", user_info.email);
            localStorage.setItem("email_verified", user_info.email_verified);
            console.log(user_info);

            this.authHttp.post(`${this.API_URL}/person_check`, {user_info: user_info})
               // .map(res => res.json())
               .subscribe(
                  // data => localStorage.setItem('profile', data),
                  data => console.log(data),
                  error => console.log(error),
                  () => this.router.navigate(['/profile'])
               );
         }
      });
  }
  // login() {

 //   this.lock.show((error: string, profile: Object, id_token: string) => {
 //     if (error) {
 //       console.log(error);
 //     }
 //     // We get a profile object for the user from Auth0
 //     localStorage.setItem('profile', JSON.stringify(profile));
 //     // We also get the user's JWT
 //     localStorage.setItem('id_token', id_token);
 //     localStorage.setItem('expires_at', 'hello');
 //   });
 // }

  public login(): void {
   //   this.auth0.authorize();
   this.lock.show();
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('test');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
   //  const expiresAt = JSON.parse(localStorage.getItem('expires_in'));
   //  return new Date().getTime() < expiresAt;
     // Modify the function -------------------------------------------------------------------   WARNING
   // return new Date().getTime() < new Date(localStorage.getItem('expires_at')).getTime();
   if(localStorage.getItem('expires_at')){ return true}
   else{ return false}
  }

  // public login() {
  //   // Call the show method to display the widget.
  //   this.lock.show();
  //
  // };
  //
  // public authenticated() {
  //   // Check if there's an unexpired JWT
  //   // It searches for an item in localStorage with key == 'id_token'
  //   return tokenNotExpired('id_token');
  // };
  //
  // public logout() {
  //   // Remove token from localStorage
  //   localStorage.removeItem('id_token');
  // };

  public getData ():any{

   //   this.auth0.client.userInfo(accessToken, (err, profile) => {
   //    if (profile) {
   //       self.userProfile = profile;
   //    }
   //    cb(err, profile);
   //   });
 }
}
// {"accessToken":"yvkFE1-wnLKsinPY",
// "idToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UYzBOek13TTBFMVF6VkZPRFExTkVVM1FUUTFNVVF5TnpGQ01VTTFOakUyUkRJNU16VTROZyJ9.eyJuYW1lIjoiUnVkIEdyYXkiLCJnaXZlbl9uYW1lIjoiUnVkIiwiZmFtaWx5X25hbWUiOiJHcmF5Iiwibmlja25hbWUiOiJydWQuZ3JheSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLVhkVUlxZE1rQ1dBL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBLzQyNTJyc2NidjVNL3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuLUdCIiwidXBkYXRlZF9hdCI6IjIwMTctMDYtMTNUMTM6NDg6MjEuNjA5WiIsImlzcyI6Imh0dHBzOi8vc3ZlemRheS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDczMjM0NTc5MDk5ODU3NDY3MzAiLCJhdWQiOiJPR1pkNmdTNXJuS1psOFkyYTM3dnBVcXljQ1UwRGtMayIsImV4cCI6MTQ5NzM5NzcwMSwiaWF0IjoxNDk3MzYxNzAxLCJub25jZSI6Im9ZekYxR3hWMHgyZFlfTi5rTFBVc1VxNnBxeWR0Q3AzIiwiYXRfaGFzaCI6IlVwUDRfbXh2bHZHQ1p4WEhPRkVYTEEifQ.bfWHicFafzyXjqZMVSRAA3o_0e7ex1IXaa9HllDu6Z1J90BrPH5C5AFX3I-HREbY8EdgbxYHR1n_47Lr4FXom2Dx_fZ4Njs87jm0IoYVUeN6li-HQjmOQJpUYB629csiWholVaNVo_Hp6zxdT0dKz7mb4HqrDKZxxkL8wGysZZBZTVQ9TIgHj4oNza7av1D1ltz-cdzwbWUu5_CHVqfVBfyT4cPGEaYV3T987iXePOERedJ-RSuQmamhcy1fe-NqpJSbg6zgfoJlk6bmWv8EbsuUWpy04GOp9EviQ-nnG_nziX6a6Gxby6dduS74MBlQXhdlbM4PyPsd_ovd2OdAeg","idTokenPayload":{"name":"Rud Gray","given_name":"Rud","family_name":"Gray","nickname":"rud.gray","picture":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg","locale":"en-GB","updated_at":"2017-06-13T13:48:21.609Z","iss":"https://svezday.eu.auth0.com/","sub":"google-oauth2|107323457909985746730","aud":"OGZd6gS5rnKZl8Y2a37vpUqycCU0DkLk","exp":1497397701,"iat":1497361701,"nonce":"oYzF1GxV0x2dY_N.kLPUsUq6pqydtCp3","at_hash":"UpP4_mxvlvGCZxXHOFEXLA"},
// "appStatus":null,
// "refreshToken":null,
// "state":"vVPLkFqYx~NPnycaZvHoiQkQQ1Qh1BkL",
// "expiresIn":7200,
// "tokenType":"Bearer",
// "scope":"openid profile"}


//
// {"accessToken":"t4M2slhpF8u5AvVx",
// "idToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UYzBOek13TTBFMVF6VkZPRFExTkVVM1FUUTFNVVF5TnpGQ01VTTFOakUyUkRJNU16VTROZyJ9.eyJpc3MiOiJodHRwczovL3N2ZXpkYXkuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA3MzIzNDU3OTA5OTg1NzQ2NzMwIiwiYXVkIjoiT0daZDZnUzVybktabDhZMmEzN3ZwVXF5Y0NVMERrTGsiLCJleHAiOjE0OTczMjc2MDIsImlhdCI6MTQ5NzI5MTYwMiwibm9uY2UiOiJqYTdabkRKenlsZ2ZncGZPZEUtZVNlUnNGTEFuTjRCQyIsImF0X2hhc2giOiIydGNkelpXOFFvN0J1dHE0T1RuVmVRIn0.caSsxM5fkv5qcwICks-kjV6P-jEHCIRmF8c1V5oiNQVI3SytmcbYQ4e4XVrC33SH-xRHJl6Nd2OsWQm4eGIo9bUs7EOw__wn64ZaEwHjF4oFMIrT1cC9PNozMdn9F-WQri6AG6UnYR9Ukp2sfWq6maFWWk2wwU5zgzVG9KwKkyOtDDAIS5DuuSaX2CmBftdYxn2lxzb-i55TZjMC1XOtR2mLA72OHXlFLTuYAnrrG_Qczx7PGgTZ-ycK-Z9rRNEKRQCHpCarUeX4ZguUx5o3A3RxD0OGzmCKfoGWW3GEC8YIwdrrDv-AGc4xdezSXTEVWbJpq3t6YawxKJmBuSVE8w",
// "idTokenPayload":{
//    "iss":"https://svezday.eu.auth0.com/",
//    "sub":"google-oauth2|107323457909985746730",
//    "aud":"OGZd6gS5rnKZl8Y2a37vpUqycCU0DkLk",
//    "exp":1497327602,
//    "iat":1497291602,
//    "nonce":"ja7ZnDJzylgfgpfOdE-eSeRsFLAnN4BC",
//    "at_hash":"2tcdzZW8Qo7Butq4OTnVeQ"
// },
// "appStatus":null,
// "refreshToken":null,
// "state":"u.0paE8h7H4dbxDB1vmBqdqXYGFF3C.K",
// "expiresIn":7200,
// "tokenType":"Bearer",
// "scope":null}
//
// {"accessToken":"U2SPW4uZ_05O02FH",
// "idToken":"
//    eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UYzBOek13TTBFMVF6VkZPRFExTkVVM1FUUTFNVVF5TnpGQ01VTTFOakUyUkRJNU16VTROZyJ9
//    .eyJuYW1lIjoiUnVkIEdyYXkiLCJnaXZlbl9uYW1lIjoiUnVkIiwiZmFtaWx5X25hbWUiOiJHcmF5Iiwibmlja25hbWUiOiJydWQuZ3JheSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLVhkVUlxZE1rQ1dBL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBLzQyNTJyc2NidjVNL3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuLUdCIiwidXBkYXRlZF9hdCI6IjIwMTctMDYtMTRUMTU6MDc6MTIuODk3WiIsImlzcyI6Imh0dHBzOi8vc3ZlemRheS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDczMjM0NTc5MDk5ODU3NDY3MzAiLCJhdWQiOiJPR1pkNmdTNXJuS1psOFkyYTM3dnBVcXljQ1UwRGtMayIsImV4cCI6MTQ5NzQ4ODgzMiwiaWF0IjoxNDk3NDUyODMyLCJub25jZSI6IktEY1pHX0g0TEVCMFZudGd-dndqaXEzOFl5bG13cUxYIiwiYXRfaGFzaCI6IjhzSUdHOExBaXNsekxnMk5tUnBEMmcifQ
//    .XBTKYmVAqkzRYA8QgWVRQMph2QbwJMw_n6fiZ3Ato_XiORtwuEllJxo3vvrwoD2KDDu10SxP5AV7LLylqA3KTaRl3oPRyQ9J3_bXmlWVJm2RkbDLMTGQxSiaChjrKYKFx0MirEeDhnQ4gyhfGVzNtwdYYIZ5V-bbrl5NIRZVjIQ3J7lKnnrLskhefo1HjfU54sHzMn4N7sUKMMEF4fJ8T0GETgzGgq9tWYiEdsZ4P2Xitsb-GSFZim-UGqpXajokrIr1hkzbC6ntTqrpCrE2WUiNvQ56lMjwiXYfl6L1Eh1wo3C3x3FU2npKUtEEz9jsx0lJAtqqPGxfFm1gOTNkCw",
//    "idTokenPayload":{
//       "name":"Rud Gray",
//       "given_name":"Rud",
//       "family_name":"Gray",
//       "nickname":"rud.gray",
//       "picture":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
//       "locale":"en-GB",
//       "updated_at":"2017-06-14T15:07:12.897Z",
//       "iss":"https://svezday.eu.auth0.com/",
//       "sub":"google-oauth2|107323457909985746730",
//       "aud":"OGZd6gS5rnKZl8Y2a37vpUqycCU0DkLk",
//       "exp":1497488832,
//       "iat":1497452832,
//       "nonce":"KDcZG_H4LEB0Vntg~vwjiq38YylmwqLX",
// "at_hash":"8sIGG8LAislzLg2NmRpD2g"},
// "appStatus":null,"refreshToken":null,"state":"1m2Pj.DuHx1KkwvEcOhIdqSuGLcacqR0","expiresIn":7200,"tokenType":"Bearer"}
//
//
// {"sub":"google-oauth2|107323457909985746730",
// "name":"Rud Gray",
// "given_name":"Rud",
// "family_name":"Gray",
// "nickname":"rud.gray",
// "picture":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
// "locale":"en-GB",
// "updated_at":"2017-06-14T15:07:12.897Z"}

// {"accessToken":"SpuQ4n62V5HRDn5R","idToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UYzBOek13TTBFMVF6VkZPRFExTkVVM1FUUTFNVVF5TnpGQ01VTTFOakUyUkRJNU16VTROZyJ9.eyJuYW1lIjoiUnVkIEdyYXkiLCJnaXZlbl9uYW1lIjoiUnVkIiwiZmFtaWx5X25hbWUiOiJHcmF5Iiwibmlja25hbWUiOiJydWQuZ3JheSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLVhkVUlxZE1rQ1dBL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBLzQyNTJyc2NidjVNL3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuLUdCIiwidXBkYXRlZF9hdCI6IjIwMTctMDYtMTZUMTU6NTA6MTAuMzM5WiIsImlzcyI6Imh0dHBzOi8vc3ZlemRheS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDczMjM0NTc5MDk5ODU3NDY3MzAiLCJhdWQiOiJPR1pkNmdTNXJuS1psOFkyYTM3dnBVcXljQ1UwRGtMayIsImV4cCI6MTQ5NzY2NDIxMCwiaWF0IjoxNDk3NjI4MjEwLCJub25jZSI6InlCODBRMmJ6UW1qczVkfnlyeXpnQUlYeWJ2TElldVlVIiwiYXRfaGFzaCI6IkV1cERTdUNabGI2LWpYVFp2YnBkZncifQ.FdsUr5a5HpwcCc6sMvEAsJdO9lH3NtwBUb7NlbLbrimg7IYkvS5JXz-WPfnhOM2R9p3c8tGevVVlI-Klcip4FcDPZTpL-YMYGHbI6YDJbo_wrLroAw6ru_lDqFbuzZNvL1nWj0jKNaOBYMaj0ud82nJ-v9VLCOAMvJZyv7q3i9Ri-NjDi3GfXJETSwMq4bTRAy-un6flk1Ez0YJcY35w8oZC9cjRJsrEcPVcn4Ux8qGMtYJHW46uVzbAAiSPX3OpUsi1FuwoVcbX5EWf2X1ObGgFwWwbj4-2a1n9eJqVa54yahWifP3DvYfrY1QqW-7NktLEzZ0Stsc8aQOIUZK4ZQ",
// "idTokenPayload":{
//    "name":"Rud Gray",
//    "given_name":"Rud",
//    "family_name":"Gray",
//    "nickname":"rud.gray",
//    "picture":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
//    "locale":"en-GB",
//    "updated_at":"2017-06-16T15:50:10.339Z",
//    "iss":"https://svezday.eu.auth0.com/",
//    "sub":"google-oauth2|107323457909985746730",
//    "aud":"OGZd6gS5rnKZl8Y2a37vpUqycCU0DkLk","exp":1497664210,"iat":1497628210,"nonce":"yB80Q2bzQmjs5d~yryzgAIXybvLIeuYU",
//    "at_hash":"EupDSuCZlb6-jXTZvbpdfw"},
// "appStatus":null,"refreshToken":null,"state":"usps_7CprmIKvy~clAPskz5mKtfZC0r9","expiresIn":7200,"tokenType":"Bearer"}
// {"accessToken":"6ms7pldH9-fG6qnr",
// "idToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UYzBOek13TTBFMVF6VkZPRFExTkVVM1FUUTFNVVF5TnpGQ01VTTFOakUyUkRJNU16VTROZyJ9.eyJuYW1lIjoiUnVkIEdyYXkiLCJnaXZlbl9uYW1lIjoiUnVkIiwiZmFtaWx5X25hbWUiOiJHcmF5Iiwibmlja25hbWUiOiJydWQuZ3JheSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLVhkVUlxZE1rQ1dBL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBLzQyNTJyc2NidjVNL3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuLUdCIiwidXBkYXRlZF9hdCI6IjIwMTctMDYtMTZUMTU6NTU6NDMuOTA0WiIsImVtYWlsIjoicnVkLmdyYXlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vc3ZlemRheS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDczMjM0NTc5MDk5ODU3NDY3MzAiLCJhdWQiOiJPR1pkNmdTNXJuS1psOFkyYTM3dnBVcXljQ1UwRGtMayIsImV4cCI6MTQ5NzY2NDU3OSwiaWF0IjoxNDk3NjI4NTc5LCJub25jZSI6Ik1YVE9qSHQ5eXp5RDBqWnpnQk9wcks3R1h6eGJZekRwIiwiYXRfaGFzaCI6Ijk3dExfWmVzVlBrd3p6b1Vuc21JVmcifQ.QB3kD2nonYBzEkipJ1DxA-U2fUirRFkG2qPkivxp6f212wsh8raTJ1jE999HysC4bE895C7gc_tmGFGZo2oUsudaUNqhkxdUdDgHQ7ZFe8Z2d_HC3RIh1DQhLgOX1r4-EseU_n1Mj-_qukKjejZcXf7W8TUTZTc-aoFGrcxkOwH-yb6dvDFqF7HD4AGXjsCDzGxXSbhBuNKHtnyCwdLFu2bViOfd3-3maCwF6qY57YhQl0ACM7ykcLmB2uAfsq4m9EUzviWsbyhO7CL_pA-7Q2XYjt0nioWyRPBzofE8ozS-zwCq5o-rtBFvirJ2FiZDHbhqdz7zNRhFH-0FaSq2Fg",
// "idTokenPayload":{
//    "name":"Rud Gray","given_name":"Rud","family_name":"Gray","nickname":"rud.gray",
//    "picture":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
//    "locale":"en-GB","updated_at":"2017-06-16T15:55:43.904Z",
//    "email":"rud.gray@gmail.com",
//    "email_verified":true,
//    "iss":"https://svezday.eu.auth0.com/",
//    "sub":"google-oauth2|107323457909985746730",
//    "aud":"OGZd6gS5rnKZl8Y2a37vpUqycCU0DkLk","exp":1497664579,"iat":1497628579,"nonce":"MXTOjHt9yzyD0jZzgBOprK7GXzxbYzDp",
//    "at_hash":"97tL_ZesVPkwzzoUnsmIVg"},
//    "appStatus":null,"refreshToken":null,"state":"r.FyQ2NihCMZzz1nMJ-wZZesgTShkq67","expiresIn":7200,"tokenType":"Bearer"}

{
"accessToken":"Z9VlJSsSjp09sJPg",
"expiresIn":86400,
"scope":"openid profile email",
"idToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5UYzBOek13TTBFMVF6VkZPRFExTkVVM1FUUTFNVVF5TnpGQ01VTTFOakUyUkRJNU16VTROZyJ9.eyJuYW1lIjoicnVkLmdyYXlAZ21haWwuY29tIiwibmlja25hbWUiOiJydWQuZ3JheSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wZDA1N2MzNGVmN2MzNjY4ODU0NTI4NzQ5NDBkNmY2NT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnJ1LnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE3LTA2LTE3VDE1OjU3OjE1LjYzNFoiLCJlbWFpbCI6InJ1ZC5ncmF5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9zdmV6ZGF5LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1OTQ1NTAxMzYyYzBlMzQ1YTYyMmM5OWMiLCJhdWQiOiJPR1pkNmdTNXJuS1psOFkyYTM3dnBVcXljQ1UwRGtMayIsImV4cCI6MTQ5Nzc1MTAzNSwiaWF0IjoxNDk3NzE1MDM1fQ.J2CLre02sw0NWYfTuRZ735EzIpMd9-TrDo0BqBd06gZ-0KrDvropYb5sX6C-zmC1hc3SNpdwzxU0JfXKzkfUSi-MEBS0A6Bz7NWlk-C1ZxJpVIY7f-Gtn47gwcMqY3XCkcCmPocdsQGHAf9YmlxRWReMcygAz6CM3y02iNrtVzT6guICevkZGqlDdEDsdPY4tZI6bIWMN89o9Uj7ti4amoKAQ2mN5WmOqXzlZ0Do2NQvGO8rK_zfBBV-ht8ZxVB8ypEgpQW-O-H50-W4r9LlFW4RfqxLoYfWoYXzlsVyAuL1X9Ypcj_yJpHYopucCksoZ19GR86CG3DJKHauouO1RA",
"tokenType":"Bearer"}
