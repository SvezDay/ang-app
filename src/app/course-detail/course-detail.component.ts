import { Component, OnInit, ViewContainerRef
                                     } from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

// import { ToastsManager }               from 'ng2-toastr/ng2-toastr';
// import { trigger, state, style, animate, transition
//                                      } from '@angular/animations';

import { AlertService }                from '../_core/alert.service';
import { ApiService }               from '../_core/api.service';
import { ErrorService }                from '../_core/error.service';

@Component({
  moduleId:module.id,
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  providers:[ApiService, ErrorService, AlertService]
  // animations: [
  // trigger('heroState', [
  //   state('inactive', style({
  //     backgroundColor: '#eee',
  //     transform: 'scale(1)'
  //   })),
  //   state('active',   style({
  //     backgroundColor: '#cfd8dc',
  //     transform: 'scale(1.1)'
  //   })),
  //   transition('inactive => active', animate('100ms ease-in')),
  //   transition('active => inactive', animate('100ms ease-out'))
  // ])
// ]
  // animations: [
  //   trigger('alert', [
  //     state('inactive', style({
  //       backgroundColor: '#eee',
  //       transform: 'scale(1)'
  //     })),
  //     state('active',   style({
  //       backgroundColor: '#cfd8dc',
  //       transform: 'scale(1.1)'
  //     })),
  //     transition('inactive => active', animate('100ms ease-in')),
  //     transition('active => inactive', animate('100ms ease-out'))
  //   ])
  // ]
})
export class CourseDetailComponent implements OnInit {
  course = {} as any;
  courseDetail = {} as any;
  selectedNode = {} as any;
  selectedNode_id: any;
  editing = false;
  editingCourse = false;
  newValue = '';
  text: any;
  div: any;

  selected_node_chip_id: any;
  selected_node_chip_property: any;
  selected_node_id: any;

  subNavEditor = false;
  alert_status = false;
  alert_message = "";


  constructor(
    private alertService: AlertService,
    private apiService: ApiService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
    // private toastr: ToastsManager,
    // private vcr: ViewContainerRef
  ) {
    // this.toastr.setRootViewContainerRef(vcr);
    // this.alert.status = false;
  }


  getSelectionText(){

  };

  // showSuccess() {
  //       this.toastr.success('You are awesome!', 'Success!');
  //     }


  selectText(){
    if(window.getSelection){
      let x = window.getSelection().toString();
      console.log(x)
    }
    this.alert_message = 'Text selected';
    this.alert_status = true;
    setTimeout(()=>{
      this.alert_status = false;
    }, 2000);
    // this.alertService.success('The text was selected');
    // $(thisDiv).on("mouseup", function () {
    // let textarea = window.document.getElementById(id);
    // textarea.on("mouseup", ()=>{
    //     var selectedText = getSelectionText();
    //     console.log(selectedText);
    //     // var selectedTextRegExp = new RegExp(selectedText,"g");
    //     // var text = $(this).text().replace(selectedTextRegExp, "<span class='red'>" + selectedText + "</span>");
    //     // $(this).html(text);
    // });
  };





  chip_edit(node){
    this.selected_node_chip_id = node.id;
    this.selected_node_chip_property = node.property;
    console.log('check chip edit');
    console.log(node)
  };


  chip_close(){
    this.selected_node_chip_id = null;
    this.selected_node_chip_property = null;
  };


  chip_new(name){
    console.log(name);
  };


  init(){
    // this.div.innerHTML = "Hello";
    // this.div.innerHTML += " World";


    this.apiService.query('get', `/get_course_detail/${this.course.id}`)
      .subscribe(
        sub=>{
          console.log('result: ', sub);
          this.courseDetail = sub.data.properties;
          this.course = sub.data.course;
          console.log(sub.data.properties[0])
          // for (let node of result.properties) {
          //   console.log(node)
          //   this.div.innerHTML += `
          //   <p style="color:black;"><span class="my-chip"> ${node.property}   </span> ${node.value} </p>
          //   `;
          // }
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
    this.apiService.query('delete', `/delete_course/${this.course.id}`)
    .subscribe(
      ()=>{
        this.router.navigate(['/course_list']);
      });
  };


  editer(node){
    this.selectedNode_id = node.id;
    this.selectedNode = node;
    this.newValue = node.value;
    if(node == this.course){
      console.log('node', node);
      console.log('this.course', this.course);
      console.log('this.courseDetail', this.courseDetail);
      this.editingCourse = true;
    }else{
      this.selectText();
      this.subNavEditor = true;
      this.editing = true;
    }
  };


  save(){
    console.log("save function check")
    console.log(this.selectedNode)
    if(this.selectedNode.property.indexOf('Course') != -1 && this.newValue.length == 0){
      alert('Cannot save empty title');
    }else if(this.newValue != this.selectedNode.value){
      let label='';
      for(let l in this.selectedNode.property){
        label+= `:${this.selectedNode.property[l]}`;
      };
      this.apiService.query('post', '/update_course',
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


  editProperty(node){

  };


  ngOnInit() {
    this.div = window.document.getElementById('my-course-detail');
    this.route.queryParams
      .subscribe(params=>{
          this.course = params;
          this.init();
        });

  };

}
;
