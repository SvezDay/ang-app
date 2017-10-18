import { Injectable }                 from '@angular/core';
import { Http, Headers, RequestOptions, Response }
                                      from '@angular/http';


@Injectable()
export class ContainerService {
  public api_url = 'http://localhost:3200/api';
  path = [];
  mainlist = [];
  sublist = [];
  container_to_host: any;

  constructor(
    private http: Http
  ){}



  containers(cont?){
    // search the container needed to the api query
    let params = {container_id: cont || null}; // Set as default value

    return this.http.post(
      `${this.api_url}/container_get_sub_container`, params, this.jwt())
    .map((response: Response)=>{
      let data = response.json();
      if(data && data.token){
        localStorage.setItem('auth_token', data.token);
      };
      return {response, data}
    });
  }


  private jwt() {
      // create authorization header with jwt token
      let token = localStorage.getItem('auth_token');
       let headers = new Headers({ 'x-access-token': token });
       return new RequestOptions({ headers: headers });
  };

};
