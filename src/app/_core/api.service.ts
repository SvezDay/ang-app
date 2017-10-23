import { Injectable }                 from '@angular/core';
import { Http, Headers, RequestOptions, Response }
                                      from '@angular/http';
import {AuthenticationService}        from './authentication.service';


@Injectable()
export class ApiService {
  public api_url = 'http://localhost:3200/api';


  constructor(
    private http: Http,
    private auth: AuthenticationService
  ){}

  query(verb, route, ...param){
    if(verb == 'get' || verb == 'delete'){
      return this.http[verb](`${this.api_url}${route}`, this.jwt())
      .map((response: Response)=>{
        let data = response.json();

        data && data.token ? localStorage.setItem('auth_token', data.token) : null
        data && data.exp ? this.auth.updateExp(data.exp) : null

        return {response, data};
      });
    }else{
      return this.http[verb](`${this.api_url}${route}`, param[0], this.jwt())
      .map((response: Response)=>{
        let data = response.json();

        data && data.token ? localStorage.setItem('auth_token', data.token) : null
        data && data.exp ? this.auth.updateExp(data.exp) : null

        return {response, data};
      });
    }
  };

  private jwt() {
      // create authorization header with jwt token
      let token = localStorage.getItem('auth_token');
       let headers = new Headers({ 'x-access-token': token });
       return new RequestOptions({ headers: headers });
  };

};
