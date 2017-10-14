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

  get_containers(direction, cont?){
    let params = {container_id: null};

    if(cont && direction == 'forward'){
      this.path.push(cont);
      this.container_to_host = cont;
    }else if(direction == 'back'){
      this.path.pop();
      if(this.path.length == 0){
        this.container_to_host = {};
      }else{
        this.container_to_host = this.path[this.path.length - 1];
      }
    };

    if(this.container_to_host && this.container_to_host.container_id){
      params.container_id = this.container_to_host.container_id;
    };

    return this.http.post(`${this.api_url}/container_get_sub_container`, params, this.jwt())
    .map((response: Response)=>{
      let data = response.json();
      // this.mainlist
      // if(data && data.token){
      //   localStorage.setItem('auth_token', data.token);
      // };
      data.token ? localStorage.setItem('auth_token', data.token) :  null

      return {mainlist:this.mainlist, sublist:this.sublist, path:this.path};
    });

    // .subscribe(res => {
    //   console.log(res);
    //   if(res.response.status == 204){
    //     this.containers = [];
    //   }else{
    //     this.containers = res.data.data;
    //   };
    //   this.modal ? this.modal.close() : null
    //   this.modal = this.modalService.open(content);
    // }, err => {
    //   console.log(err)
    // });
  }
  // query(verb, route, ...param){
  //   if(verb == 'get' || verb == 'delete'){
  //     return this.http[verb](`${this.api_url}${route}`, this.jwt())
  //     .map((response: Response)=>{
  //       let data = response.json();
  //       if(data && data.token){
  //         localStorage.setItem('auth_token', data.token);
  //       };
  //       // data.data ? data = data.data : null
  //       return {response, data};
  //     });
  //   }else{
  //     return this.http[verb](`${this.api_url}${route}`, param[0], this.jwt())
  //     .map((response: Response)=>{
  //       let data = response.json();
  //       if(data && data.token){
  //         localStorage.setItem('auth_token', data.token);
  //       };
  //       // data.data ? data = data.data : null
  //       return {response, data};
  //     });
  //   }
  // };

  private jwt() {
      // create authorization header with jwt token
      let token = localStorage.getItem('auth_token');
       let headers = new Headers({ 'x-access-token': token });
       return new RequestOptions({ headers: headers });
  };

};
