import { Injectable }                  from '@angular/core';
import { Http, Headers, Response }     from '@angular/http';
import { Observable }                  from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
   public api_url = 'http://localhost:3200';
   private secret = 'zertyuiopghjkfsddie345678098fjsdkqurqzeljml45678';
   constructor(private http: Http) { }

   authHeaders(header: Headers){
      header.append('x-access-token', localStorage.getItem('auth_token'));
   }

   login(email: string, password: string) {
      return this.http.post(this.api_url + '/authenticate', { email, password } )
      .map((response: Response) => {
         // login successful if there's a jwt token in the response
         let data = response.json();
         if (data && data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_token_exp', data.exp);
            let profile = {first: data.first};
            localStorage.setItem('profile', JSON.stringify(profile));
         }
         return;
      });
   }

   register(creds){
     return this.http.post(`${this.api_url}/register`, creds)
     .map( (response:Response) => {
       let data = response.json();
       if (data && data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('auth_token', data.token);
          let profile = {first: data.first};
          localStorage.setItem('profile', JSON.stringify(profile));
       }
       return;
     })
   };

   logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_token_exp');
      localStorage.removeItem('profile');
   }

   test(){
     let auth = localStorage.getItem('auth_token') || null;
     let exp = localStorage.getItem('auth_token_exp') || null;
     return {auth, exp};
   }

   isLogged(){
     let exp = localStorage.getItem('auth_token_exp');
     let now = new Date().getTime();
    //  let auth = localStorage.getItem('auth_token') || null;
    //   if(auth && exp){
    if(localStorage.getItem('auth_token')){
         return true;
      }else{
         return false;
      }
   }
}
