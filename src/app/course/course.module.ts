import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
// import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { BoardCourseComponent } from './board_course/board_course.component';
import { AddCourseComponent } from './add_course/add_course.component';
import { CourseService } from './course.service';
import { CourseRoutingModule } from './course-routing.module';


// // https://github.com/auth0/angular2-jwt
// export function authHttpServiceFactory(http: Http, options: RequestOptions) {
//   return new AuthHttp(new AuthConfig({
//      headerPrefix: 'Bearer',
//    // noJwtError: true,
//    tokenName:'id_token',
//     tokenGetter: (() => localStorage.getItem('id_token')),
//     globalHeaders: [{'Content-Type':'application/json'}],
//   }), http, options);
// };

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CourseRoutingModule
  ],
  providers: [
     CourseService,
   //   {
   //    provide: AuthHttp,
   //    useFactory: authHttpServiceFactory,
   //    deps: [Http, RequestOptions]
   //   }
  ],
  declarations: [
     BoardCourseComponent,
     AddCourseComponent
  ]
})
export class CourseModule { }
