import { Injectable }         from '@angular/core';
import { Http, Headers, RequestOptions, Response }
                              from '@angular/http';


@Injectable()
export class NoteService {
   public api_url = 'http://localhost:3200';
    constructor(private http: Http) { }

    create(content) {
        return this.http.post(this.api_url + '/api/create_note', content, this.jwt())
        .map((response: Response) => {
           let data = response.json();
           if (data && data.token) {
             localStorage.setItem('auth_token', data.token);
          }
          return data;
        });
    };
    getAll() {
      return this.http.get(this.api_url + '/api/get_all_note', this.jwt())
      .map((response: Response) => {
         let data = response.json();
         if (data && data.token) {
           localStorage.setItem('auth_token', data.token);
         }
         console.log('data');
         console.log(data);
         // if(data.status)
        return data;
      })
   }
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

    private jwt() {
        // create authorization header with jwt token
        let token = localStorage.getItem('auth_token');
         let headers = new Headers({ 'x-access-token': token });
         return new RequestOptions({ headers: headers });
    }
}
