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
  toggleContent = true;
  toggleLabelList = false;

  alert_status = false;
  alert_message = "";

  label_list = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }


  toggler(container){
    if(container == 'title'){
      this.toggleTitle = true;
      this.toggleContent = false;
      this.toggleLabelList = false;
    }else if(container == 'content'){
      this.toggleTitle = false;
      this.toggleContent = true;
      this.toggleLabelList = false;
    }else if(container == 'label'){
      this.toggleTitle = false;
      this.toggleContent = false;
      this.toggleLabelList = true;
    };
  };


  create(){
      return this.apiService.query('post', '/create_note', this.note);
  };


  delete(){
    console.log('delete')
    this.router.navigate(['/note_list']);
  };


  back(){
        console.log('back')
    this.alert_message = "Saving ...";
    this.alert_status = true;
    console.log('back')
    // save then nav to note list
    if(this.note.title_value != 'Undefined' || !this.note.content_value.length ){
      this.create().subscribe(res=>{
        setTimeout(()=>{
          this.router.navigate(['/note_list']);
        },1000);
      });
    }else{
      this.router.navigate(['/note_list']);
    };
  };


  addon(){
    console.log('addon')
    // save then nav to note detail
    this.create().subscribe(res=>{
      setTimeout(()=>{
        this.router.navigate(['/note_detail'], {queryParams:{id: res.data.data.note_id, command:'add'}});
      },1000);
    });
  };


  blur(){
    console.log('blur')
    this.alert_message = "Saving ...";
    this.alert_status = true;

    this.toggleTitle = false;
    this.toggleContent = false;
    this.toggleLabelList = false;
    // save then nav to note detail
    if(this.note.title_value != 'Undefined' || this.note.content_value.length ){
      this.create().subscribe(res=>{
        setTimeout(()=>{
          this.router.navigate(['/note_detail'], {queryParams:{id: res.data.data.note_id}});
        },1000);
      });
    };
  };


  changeLabel(label){
    console.log('changeLabel')
    this.note.content_label = label;
    this.toggleLabelList = false;
  };


  ngOnInit() {
    this.apiService.query('get', '/note_get_label')
    .subscribe(
      res => {
        console.log("checking the sub result", res);
        this.label_list = res.data.data
        console.log(this.label_list)
      },
      error => {
        console.log('Error on ngOnInit of note create', error);
      });
  };

};
