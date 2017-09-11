import { Injectable }         from '@angular/core';
import { Http, Headers, RequestOptions, Response }
                              from '@angular/http';


@Injectable()
export class NoteService {
   public api_url = 'http://localhost:3200/api';
    constructor(private http: Http) { }

    query(verb, route, ...param){
      if(verb == 'get' || verb == 'delete'){
        return this.http[verb](`${this.api_url}${route}`, this.jwt())
        .map((response: Response)=>{
          let data = response.json();
          if(data && data.token){
            localStorage.setItem('auth_token', data.token);
          };
          return data;
        });
      }else{
        return this.http[verb](`${this.api_url}${route}`, param, this.jwt())
        .map((response: Response)=>{
          let data = response.json();
          if(data && data.token){
            localStorage.setItem('auth_token', data.token);
          };
          return data;
        });
      }
    };

    // create(content) {
    //     return this.http.post(this.api_url + '/api/create_note', content, this.jwt())
    //     .map((response: Response) => {
    //        let data = response.json();
    //        if (data && data.token) {
    //          localStorage.setItem('auth_token', data.token);
    //       }
    //       return data;
    //     });
    // };
  //   getAll() {
  //     return this.http.get(this.api_url + '/api/get_all_note', this.jwt())
  //     .map((response: Response) => {
  //        let data = response.json();
  //        if (data && data.token) {
  //          localStorage.setItem('auth_token', data.token);
  //        }
  //        // console.log('data');
  //        // console.log(data);
  //        // if(data.status)
  //       return data;
  //     })
  //  }
   getDetail(note_id){
      return this.http.get(this.api_url + `/api/get_note_detail/${note_id}`, this.jwt())
      .map((response:Response)=>{
         let data = response.json();
         if(data && data.token){
            localStorage.setItem('auth_token', data.token);
         }
         return data;
      });
   };
   update(params){
      return this.http.post(
         this.api_url + '/api/update_property',
         params,
         this.jwt()
      )
      .map((response:Response)=>{
         let data = response.json();
         if(data && data.token){
            localStorage.setItem('auth_token', data.token);
         }
         return data;
      })
   }
   add(params){
      return this.http.post(
         this.api_url + '/api/add_property',
         params,
         this.jwt()
      )
      .map((response:Response)=>{
         let data = response.json();
         if(data && data.token){
            localStorage.setItem('auth_token', data.token);
         }
         return data;
      })
   }
   delete(note_id, property_id){
      return this.http.delete(
         this.api_url + `/api/delete_property/${note_id}/${property_id}`,
         // params,
         this.jwt()
      )
      .map((response:Response)=>{
         let data = response.json();
         if(data && data.token){
            localStorage.setItem('auth_token', data.token);
         }
         return data;
      })
   }

   drop(params){
      return this.http.post(
         this.api_url + `/api/drop_property`,
         params,
         this.jwt()
      )
      .map((response:Response)=>{
         let data = response.json();
         if(data && data.token){
            localStorage.setItem('auth_token', data.token);
         }
         return data;
      })
   }

    private jwt() {
        // create authorization header with jwt token
        let token = localStorage.getItem('auth_token');
         let headers = new Headers({ 'x-access-token': token });
         return new RequestOptions({ headers: headers });
    }
}
