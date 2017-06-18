import { Injectable } from '@angular/core';
import {Headers, Http, Request, RequestOptions, RequestMethod, URLSearchParams} from '@angular/http';
import {Course} from './course';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
// import 'rxjs/Observable';
// import { Subscription } from "rxjs/Subscription";

export class course {
   name: string
}

@Injectable()
export class CourseService {
   response: any;
   // API_URL: string = 'https://ang-rest-graph-server.herokuapp.com/api';
   API_URL: string = 'http://localhost:3200/api';
   private handleError(error: any): Promise<any>{
      console.log('An error occured', error);
      return Promise.reject(error.messages || error);
   }


   constructor(public authHttp: AuthHttp, public http: Http){ }

   // course_list(): Observable<course[]>{
   course_list(){
      // return new Promise((resolve, reject)=>{
      //
      // })
      // let headers = new Headers();
      // headers.append('content-Type', 'application/json');
      // let header = new Headers({
      //    'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      //
      // });
      // let options = new RequestOptions({ headers: header });
      // let params = new URLSearchParams();
      // // params.append('user_id',user_id);
      // let options = new RequestOptions({
      //    headers: headers,
      //    search: params
      // })
      this.authHttp.get(`${this.API_URL}/course_list`)
         // .map(res => {
         //    let resp = res.json();
         //    return resp.data;
         // });
         .map(res => res.json())
         .subscribe(
            data =>  this.response = data,
            error => error,
            () => console.log('course list request done !')
         );
         // .catch((err)=>{throw err;});
         // .subscribe(courses => {
         //    courses.json() as Course[]
         // })
   };
   add_course(course: any){
      // let headers = new Headers();
      // headers.append('content-Type', 'application/json');
      // let params = new URLSearchParams();
      // params.append('name', course.name);
      // let options = new RequestOptions({
      //    headers: headers,
      //    search: params
      // })
      this.authHttp.post(`${this.API_URL}/add_course`,{name:course.name})
         .map(res => res.json())
         .subscribe(
            data => this.response = data,
            error => this.handleError(error)
         );

         // .toPromise()
         // .then( datas => datas.json() as any)
         // .catch(this.handleError);
         // .subscribe(courses => {
         //    courses.json() as Course[]
         // })
   }

}


// getAll(): Promise<any>{
//    let headers = new Headers();
//    headers.append('content-Type', 'application/json');
//    let params = new URLSearchParams();
//    // params.append('user_id',user_id);
//    let options = new RequestOptions({
//       headers: headers,
//       search: params
//    })
//    return this.http
//       .get(this.domaine + '/api/course_list', options)
//
//       .toPromise()
//       .then( courses => courses.json() as any)
//       .catch(this.handleError);
//       // .subscribe(courses => {
//       //    courses.json() as Course[]
//       // })
// }
