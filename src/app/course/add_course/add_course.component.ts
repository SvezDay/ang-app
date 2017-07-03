import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';
// import { AuthService } from '../../core/auth.service';

@Component({
   moduleId: module.id,
   // selector: 'add',
   templateUrl: './add_course.component.html',
   providers: [CourseService]
})
export class AddCourseComponent implements OnInit {
   new_course = {name:""};
   constructor(
      private courseService: CourseService,
      // private auth: AuthService,
      private router: Router
   ){
   }

   add_course(){
      // console.log("submited add_course function");
      // // let new_course = new Course({null, 'helo'});
      // console.log(this.new_course);
      //
      // let x = this.courseService.add_course(this.new_course);
      // console.log(x);
      this.courseService.add_course(this.new_course);
      setTimeout(()=>{
         // console.log(this.courseService.response);
         // this.courseList = this.courseService.response.data;
      this.router.navigate(['/course']);
      }, 2000);
   }

   ngOnInit() {
      console.log(this.new_course);
      // this.new_course.name = 'hello';
      // console.log(this.new_course);
      // const user_id = JSON.parse(localStorage.getItem('profile')).identities[0].user_id;
      // console.log(user_id);
      // this.courseService.getAll().then(response => {
      //    this.courseList = response.data;
      //    console.log(response.data);
      // })
   }

}
