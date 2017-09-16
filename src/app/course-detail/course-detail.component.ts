import { Component, OnInit }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { CourseService }               from '../_core/course.service';
import { ErrorService }                from '../_core/error.service';

@Component({
  moduleId:module.id,
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  providers:[CourseService, ErrorService]
})
export class CourseDetailComponent implements OnInit {
  course = {} as any;
  courseDetail = {} as any;
  selectedNode = {} as any;
  editing = false;
  editingCourse = false;
  newValue = '';
  // newCourseName = '';


  constructor(
    private courseService: CourseService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  init(){
    this.courseService.query('get', `/get_course_detail/${this.course.id}`)
      .subscribe(
        result=>{
          console.log('result: ', result);
          this.courseDetail = result.properties;
          this.course = result.course;
        },
        error=>{
          this.errorService.handler(error);
          console.log('error =========================', error);
          console.log('error =========================');
          console.log(error.status)

          // this.router.navigate(['/course_list']);
        }
      );
  };
  delete(){
    this.courseService.query('delete', `/delete_course/${this.course.id}`)
    .subscribe(
      ()=>{
        this.router.navigate(['/course_list']);
      });
  };
  editer(node){
    this.selectedNode = node;
    this.newValue = node.value;
    if(node == this.course){
      console.log('node', node);
      console.log('this.course', this.course);
      console.log('this.courseDetail', this.courseDetail);
      this.editingCourse = true;
    }else{
      this.editing = true;
    }
  };

  save(){
    if(this.selectedNode.labels.indexOf('Course') != -1 && this.newValue.length == 0){
      alert('Cannot save empty title');
    }else if(this.newValue != this.selectedNode.value){
      let label='';
      for(let l in this.selectedNode.property){
        label+= `:${this.selectedNode.property[l]}`;
      };
      this.courseService.query('post', '/update_course',
        {id:this.selectedNode.id, value:this.newValue, label:label}
      )
      .subscribe(
        ()=>{
          this.init();
        },
      error => {
        console.log(error);
        this.init();
      });
    };
    this.editing = this.editingCourse =  false;
  };

  ngOnInit() {
    this.route.queryParams
      .subscribe(params=>{
          this.course = params;
          this.init();
        });
  };

}
