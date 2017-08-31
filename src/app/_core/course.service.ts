import { Injectable }         from '@angular/core';
import { Http, Headers, RequestOptions, Response }
                              from '@angular/http';


@Injectable()
export class CourseService {
   public api_url = 'http://localhost:3200';
    constructor(private http: Http) { }

    create(course) {
        return this.http.post(this.api_url + '/api/create_course', course, this.jwt())
        .map((response: Response) => {
           let data = response.json();
           if (data && data.token) {
             localStorage.setItem('auth_token', data.token);
          }
          return data;
        });
    };
    getAll() {
      return this.http.get(this.api_url + '/api/get_all_course', this.jwt())
      .map((response: Response) => {
         let data = response.json();
         if (data && data.token) {
           localStorage.setItem('auth_token', data.token);
         }
        return data;
      })
   }
   getSchemaList(){
     return this.http.get(this.api_url + '/api/get_schema_list', this.jwt())
     .map((response: Response) => {
        let data = response.json();
        if (data && data.token) {
          localStorage.setItem('auth_token', data.token);
        }
       return data;
     })
   }
   getDetail(id){
     return this.http.get(`${this.api_url}/api/get_course_detail/${id}`, this.jwt())
      .map((response: Response)=>{
        let data = response.json();
        if (data && data.token){
          localStorage.setItem('auth_token', data.token);
        }
        return data;
      });
   };
   update(course){
     return this.http.post(`${this.api_url}/api/update_course`, course, this.jwt())
      .map((response: Response)=>{
        let data = response.json();
        if(data && data.token){
          localStorage.setItem('auth_token', data.token);
        };
        return data;
      });
   };
   delete(course){
     return this.http.delete(`${this.api_url}/api/delete_course/${course.id}`, this.jwt())
     .map((response: Response)=>{
       return response;
     });
   };
   updateCourseValue(course){
     return this.http.post(`${this.api_url}/api/update_course_value`, course, this.jwt())
     .map((response: Response)=>{
       let data = response.json();
       if (data && data.token){
         localStorage.setItem('auth_token', data.token);
       };
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
