import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { CourseService }                 from '../_core/course.service';

@Component({
  moduleId:module.id,
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
  providers:[CourseService]
})
export class CourseCreateComponent implements OnInit {
  new_course = {value:'', schema:''};
  objectKeys = Object.keys;
  schemaList =[];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  create(){
    this.courseService.create(this.new_course)
    .subscribe(
      data => {
        this.router.navigate(['/course_list']);
      },
      error => {
        this.router.navigate(['/course_list']);
      }
    );
  };
  schemaSelection(schema){
    this.new_course.schema = schema;
  };


  ngOnInit() {
    this.courseService.getSchemaList()
      .subscribe(
        data =>{
           console.log(data.list);
           this.schemaList = data.list;
           this.new_course.schema = Object.keys(data.list)[0];
        },
        error =>{
           // this.alertService.error(error);
           // this.loading = false;
           this.router.navigate(['/course_list']);
        }
      )
  }

}
