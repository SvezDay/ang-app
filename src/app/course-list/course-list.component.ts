import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { CourseService }                 from '../_core/course.service';

@Component({
  moduleId: module.id,
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers:[CourseService]
})
export class CourseListComponent implements OnInit {
  list = [];
  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  add(){
    this.router.navigate(['/course_create']);
  };
  detail(id){
    this.router.navigate(['/course_detail'], {queryParams:{course_id:id}});
  };

  ngOnInit() {
    this
    .courseService.getAll()
    .subscribe(
       data =>{
          console.log(data);
          this.list = data.data;
       },
       error =>{
          // this.alertService.error(error);
          // this.loading = false;
          this.router.navigate(['/authenticate']);
       }
    )
  }

}
