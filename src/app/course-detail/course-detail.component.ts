import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { CourseService }                 from '../_core/course.service';

@Component({
  moduleId:module.id,
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  providers:[CourseService]
})
export class CourseDetailComponent implements OnInit {
  course = {} as any;
  detail = {} as any;
  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  init(){
    this.courseService.getDetail(this.course)
      .subscribe(
        data=>{
          console.log(data);
          this.detail = data;
        },
        error=>{
          this.router.navigate(['/course_list']);
        }
      );
  };
  ngOnInit() {
    this.route.queryParams
      .subscribe(params=>{
          this.course.id = params.course_id;
          this.init();
        });
  };

}
