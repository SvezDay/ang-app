import { Component, OnInit }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { NoteService }                 from '../_core/note.service';

@Component({
   moduleId:   module.id,
  selector:    'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls:   ['./note-edit.component.css'],
  providers:   [NoteService]
})
export class NoteEditComponent implements OnInit {

   sub:any;
   note_id:Number;
   loading = false;
   detail = [];
   newContent = "";
   toggle = false;
 constructor(
     private route: ActivatedRoute,
     private router: Router,
     private alertService: AlertService,
     private noteService: NoteService
 ) { }
 delete(){

 }
 save(){
   //  this.noteService.create({this.newContent})
}
 // customContent(array){
 //   let content = "<h1>Hello</h1>";
 //    for(let item of array){
 //      switch (item){
 //         case 'Undefined': {
 //
 //            break;
 //         }
 //
 //      }
 //   }
 // }
 backgroundToggle(){
    if(this.toggle) return "#A9A9A9";
    else return "";
}
toggling(){
   this.toggle ? this.toggle = false : this.toggle = true;
}
saveChange(node_id, oldVal, newVal){
   if( oldVal != newVal){
      console.log(node_id);
      console.log(oldVal);
      console.log(newVal);

   }

   // this.noteService.update(node_id, $event)
   //    .subscribe(
   //       data => {
   //          console.log(data);
   //          this.alertService.success('Saved !');
   //       },
   //       error => {
   //          this.alertService.error(error);
   //       }
   //    );
}

 ngOnInit() {
     this.route
     .queryParams
     .subscribe(params=>{
       this.note_id = params.note_id;
       this.detail = JSON.parse(params.detail);
      //  this.customContent(params.detail);
        console.log(this.detail);
     });

 }

}
