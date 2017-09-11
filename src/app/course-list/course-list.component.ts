import { Component, OnInit }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { CourseService }               from '../_core/course.service';
import { ErrorService }                from '../_core/error.service';

@Component({
  moduleId: module.id,
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers:[CourseService, ErrorService]
})
export class CourseListComponent implements OnInit {
  list = [];


  constructor(
    private courseService: CourseService,
    private errorService: ErrorService,
    private router: Router
  ) { }


  add(){
    this.router.navigate(['/course_create']);
  };


  detail(item){
    this.router.navigate(['/course_detail'], {queryParams:{id:item.id}});
  };


  ngOnInit() {
    this.courseService.query('get', '/get_all_course')
    .subscribe( response =>{
      this.list = response.data;
    }, error => {
      console.log('error', error);
      this.errorService.handler(error);
      // this.alertService.error(error);
      // this.loading = false;
      // this.router.navigate(['/authenticate']);
    });
  };


};
