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
  new_course = {value:'', model_title:''};
  objectKeys = Object.keys;
  modelList =[];

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
  modelSelection(model){

    this.new_course.model_title = model.title;
    console.log(this.new_course.model_title)
  };

  ngOnInit() {
    this.apiService.query('get', '/get_model_list')
    .subscribe(
      res =>{

         console.log(res.data.list);
         this.modelList = res.data.list;
         this.new_course.model_title = res.data.list[0].title;
         console.log('this.new_course.model', res.data.list[0])
      },
      error =>{
         this.router.navigate(['/course_list']);
      });
  };

};
