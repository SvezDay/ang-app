

import { Component, OnInit }          from '@angular/core';
import { Router, ActivatedRoute }     from '@angular/router';
import { ApiService }                 from '../_core/api.service';


@Component({
  moduleId: module.id,
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css'],
  providers: [ApiService]
})
export class NoteCreateComponent implements OnInit {
  note = {
    title_value: "Undefined",
    content_value:"",
    content_label: "Undefined"
  };

  toggleTitle = false;
  toggleLabelList = false;

  subNavEditor = false;
  alert_status = false;
  alert_message = "";

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }


  create(){
    return new Promise((resolve, reject)=>{
      this.apiService.query('post', 'create_note', this.note)
      .subscribe(
         sub =>{
           resolve(sub.data.data);
         },
         error =>{
            console.log(error);
            this.router.navigate(['/authenticate']);
         }
      );
    });
  };


  delete(){
    this.router.navigate(['/note_list']);
  };


  back(){
    if(this.note.title_value != 'Undefined' || !this.note.content_value.length ){
      this.create().then( data => {
        // then back
        this.router.navigate(['/note_list']);
      });
    };
  };

  blur(){
    if(this.note.title_value != 'Undefined' || !this.note.content_value.length ){
      this.create().then( data => {
        // then go to detail to entually updating
        // this.router.navigate(['/note_detail'], {queryParams:{id: data.note_id}});
      });
    };
  };

  // editer(node){
  //   this.selectedNode_id = node.id;
  //   this.selectedNode = node;
  //   this.newValue = node.value;
  //   if(node == this.course){
  //     console.log('node', node);
  //     console.log('this.course', this.course);
  //     console.log('this.courseDetail', this.courseDetail);
  //     this.editingCourse = true;
  //   }else{
  //     this.selectText();
  //     this.subNavEditor = true;
  //     this.editing = true;
  //   }
  // };


  getLabel(){

  };

  changeLabel(label){
    this.note.content_label = label;
  };




  ngOnInit() {
  }

}
