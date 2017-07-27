import { Injectable }         from '@angular/core';
import { Http, Headers, RequestOptions, Response }
                              from '@angular/http';

import { User }               from '../_models/user';


@Injectable()
export class UserService {
   public api_url = 'http://localhost:3200';
    constructor(private http: Http) { }

    register(user: User) {
        return this.http.post(this.api_url + '/register', user)
        .map((response: Response) => response.json());
    }
    getAll() {
        return this.http.get(this.api_url + '/api/users', this.jwt())
        .map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.api_url + '/api/users/' + id, this.jwt())
        .map((response: Response) => response.json());
    }

   //  create(user: User) {
   //      return this.http.post(this.api_url + '/api/users', user, this.jwt())
   //      .map((response: Response) => response.json());
   //  }

    update(user: User) {
        return this.http.put(this.api_url + '/api/users/' + user.id, user, this.jwt())
        .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.api_url + '/api/users/' + id, this.jwt())
        .map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let token = localStorage.getItem('auth_token');
      //   if (currentUser && currentUser.token) {
            let headers = new Headers({ 'x-access-token': token });
            return new RequestOptions({ headers: headers });
      //   }
    }
}
