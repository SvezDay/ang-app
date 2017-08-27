import { Component, OnInit }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { NoteService }                 from '../_core/note.service';

@Component({
   moduleId: module.id,
   selector: 'app-note-detail',
   templateUrl: './note-detail.component.html',
   styleUrls: ['./note-detail.component.css'],
   providers:[NoteService]
})
export class NoteDetailComponent implements OnInit {
   loading = false;
   noteDetail = [];
   editing = false;
   labels = ['Undefined', 'title', 'Resume', 'Code'];
   newLabel: string;
   newValue: string;
   newProperty = false;

   note_id:Number;
   selectedProperty: any;

   // sub:any;
   // dialog = document.querySelector('dialog');
   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService,
      private noteService: NoteService
   ) { }

   initing(){
      this.noteService.getDetail(this.note_id)
      .subscribe(
         data =>{
            this.noteDetail = data.detail;
            console.log(data);
         },
         error =>{
            //   this.alertService.error(error);
            //   this.loading = false;
            this.router.navigate(['/authenticate']);
         }
      );
   }

   // show() {
   //  this.dialog.showModal();
   //  /* Or dialog.show(); to show the dialog without a backdrop. */
   // };
   labelChanging(label){
      if(label!=this.selectedProperty.labels){
         this.newLabel = label;
      }else{
         this.newLabel = '';
      }
   }
   editer(node){
      //  this.router.navigate(['/note_edit'], {queryParams: {
      //    note_id: this.note_id,
      //    detail: JSON.stringify(this.detail)
      // }});

      this.selectedProperty = node || {labels:'Undefined', value:''};
      this.newValue = node.value || '';
      if(!node.value) this.newProperty = true;
      this.editing = true;

   }
   save(){
      console.log('check on the save function');
      console.log('this.newLabel', this.newLabel);
      console.log('this.newValue', this.newValue);
      let params = {};
      let saving = false;

      if(this.newLabel){
         params["label"] = this.newLabel;
         saving = true;
      }
      if(this.newValue != this.selectedProperty.value){
         saving = true;
         params["value"] = this.newValue;
      }
      if(saving){
         params["excluded_id"] = this.selectedProperty.node_id;
         params["note_id"] = this.note_id;
         console.log('params', params);
         if(this.newProperty){
            this.noteService.add(params)
            .subscribe(
               data => {
                  console.log('data', data);
                  // this.alertService.success('Saved !');
                  this.editing = false;
                  this.newProperty = false;
                  //   this.router.navigate(['/note_detail'], {queryParams:{note_id: this.note_id}});
                  this.initing();
               },
               error => {
                  console.log('error', error);
                  this.editing = false;
                  this.alertService.error(error);
               }
            );

         }else{
            this.noteService.update(params)
            .subscribe(
               data => {
                  console.log('data', data);
                  // this.alertService.success('Saved !');
                  this.editing = false;
                  this.newProperty = false;
                  //   this.router.navigate(['/note_detail'], {queryParams:{note_id: this.note_id}});
                  this.initing();
               },
               error => {
                  console.log('error', error);
                  this.editing = false;
                  this.alertService.error(error);
               }
            );
         }
      }else{
         this.editing = false;
      }
   }
   add(){
      this.selectedProperty = {
         value: "",
         labels: 'Undefined'
      };
      this.editing = true;
      this.newProperty = true;
   }
   delete(){
      this.noteService.delete(this.note_id, this.selectedProperty.node_id)
      .subscribe(
         data => {
            console.log('data', data);
            this.editing = false;
            this.initing();
         },
         error => {
            console.log('error', error);
            this.editing = false;
            this.alertService.error(error);
         }
      );

   }
   drop(direction){
      let params = {
         note_id: this.note_id,
         property_id:this.selectedProperty.node_id,
         drop:direction
      };
      this.noteService.drop(params)
      .subscribe(
         data => {
            console.log('data', data);
            this.editing = false;
            // this.initing();
         },
         error => {
            console.log('error', error);
            this.editing = false;
            this.alertService.error(error);
         }
      );

   }

   ngOnInit() {
      this.route
      .queryParams
      .subscribe(params=>{
         this.note_id = params.note_id;
      });
      this.initing();
   }

}
