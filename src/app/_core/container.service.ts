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

    // if(cont && direction == 'forward'){
    //   path.push(cont);
    //   this.container_to_host = cont;
    // }else if(direction == 'back'){
    //   this.path.pop();
    //   if(this.path.length == 0){
    //     this.container_to_host = {};
    //   }else{
    //     this.container_to_host = this.path[this.path.length - 1];
    //   }
    // };
    //
    // if(this.container_to_host && this.container_to_host.container_id){
    //   params.container_id = this.container_to_host.container_id;
    // };

    return this.http.post(`${this.api_url}/container_get_sub_container`, params, this.jwt())
    .map((response: Response)=>{
      let data = response.json();
      if(data && data.token){
        localStorage.setItem('auth_token', data.token);
      };
      // data.token ? localStorage.setItem('auth_token', data.token) :  null
      // return {mainlist:this.mainlist, sublist:this.sublist, path:this.path};
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
