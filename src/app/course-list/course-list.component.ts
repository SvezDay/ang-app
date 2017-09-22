import { Component, OnInit }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { ApiService }                  from '../_core/api.service';
import { ErrorService }                from '../_core/error.service';

@Component({
  moduleId: module.id,
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers:[ApiService, ErrorService]
})
export class CourseListComponent implements OnInit {
  list = [];


  constructor(
    private apiService: ApiService,
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
    this.apiService.query('get', '/get_all_course')
    .subscribe( sub =>{
      this.list = sub.data.data;
      console.log('response', sub)
    }, error => {
      console.log('error', error);
      this.errorService.handler(error);
      // this.alertService.error(error);
      // this.loading = false;
      // this.router.navigate(['/authenticate']);
    });
  };


};
