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
  courseDetail = {} as any;
  selectedNode = {} as any;
  editing = false;
  editingCourse = false;
  newValue = '';
  // newCourseName = '';


  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  init(){
    this.courseService.getDetail(this.course.id)
      .subscribe(
        result=>{
          console.log('result: ', result);
          this.courseDetail = result.properties;
          this.course = result.course;
        },
        error=>{
          console.log(error);
          // this.router.navigate(['/course_list']);
        }
      );
  };
  delete(){
    this.courseService.delete(this.course)
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
  // editerCourse(){
  //   this.courseNameEditer = true;
  //   this.newCourseName = this.course.name;
  // };
  save(){
    if(this.newValue != this.selectedNode.value){
      let label='';
      for(let l in this.selectedNode.property){
        label+= `:${this.selectedNode.property[l]}`;
      };
      this.courseService.update({id:this.selectedNode.id, value:this.newValue, label:label})
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
  // newCourseValue(){
  //   this.course.name = this.newCourseName;
  // };
  // saveCourseName(){
  //   if(this.course.name != this.newCourseName){
  //     this.courseService.updateCourseValue({id:this.course.id, value:this.newCourseName})
  //     .subscribe(
  //       ()=>{
  //         this.course.name = this.newCourseName;
  //         this.courseNameEditer = false;
  //       },
  //       error=>{
  //         console.log(error);
  //         this.courseNameEditer = false;
  //       }
  //     )
  //   };
  //   this.courseNameEditer = false;
  // };

  ngOnInit() {
    this.route.queryParams
      .subscribe(params=>{
          this.course = params;
          this.init();
        });
  };

}
