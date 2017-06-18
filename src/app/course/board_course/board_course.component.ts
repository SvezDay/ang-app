import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { AuthService } from '../../core/auth.service';

@Component({
   moduleId: module.id,
   selector: 'board',
   templateUrl: './board_course.component.html',
   providers: [CourseService]
})
export class BoardCourseComponent implements OnInit {
   courseList: Course[];

   constructor(
      private courseService: CourseService,
      private auth: AuthService
   ){
   }

   recallCourse(course: Object) {
      // console.log(course);
   }
   start(){
      // this.courseService.start().then(response => {
      //    console.log(response);
      // })
   }
   ngOnInit() {
      this.courseService.course_list();
      setTimeout(()=>{
         console.log(this.courseService.response);
         this.courseList = this.courseService.response.data;
      }, 2000);
      // this.courseService.course_list().subscribe((data)=>{
      //    this.courseList = data;
      //    console.log('course list');
      //    console.log(data);
      //
      // });
      // console.log(x);
      // setTimeout(()=>{
      //
      // console.log(this.courseService.response);
      // }, 3000);
      // const user_id = JSON.parse(localStorage.getItem('profile')).identities[0].user_id;
      // console.log(user_id);
      // this.courseService.getAll().then(response => {
      //    this.courseList = response.data;
      //    console.log(response.data);
      // })
   }

}
