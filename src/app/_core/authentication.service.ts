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
         let user = response.json();
         if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('auth_token', user.token);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_name', user.name);
         }

         return user;
      });
   }

   logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
   }

   isLogged(){
      if(localStorage.getItem('auth_token')){
         return true;
      }else{
         return false;
      }
   }
}
