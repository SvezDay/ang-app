import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { ApiService }                 from '../_core/api.service';

@Component({
  moduleId:module.id,
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
  providers:[ApiService]
})
export class CourseCreateComponent implements OnInit {
  new_course = {value:'', schema:''};
  objectKeys = Object.keys;
  schemaList =[];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  create(){
    this.apiService.query('post', '/create_course', this.new_course)
    .subscribe(
      data => {
        this.router.navigate(['/course_detail'], {queryParams:{id:data.id}});
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
    this.apiService.query('get', '/get_schema_list')
    .subscribe(
      data =>{
         console.log(data.list);
         this.schemaList = data.list;
         this.new_course.schema = Object.keys(data.list)[0];
      },
      error =>{
         this.router.navigate(['/course_list']);
      });
  };

};
