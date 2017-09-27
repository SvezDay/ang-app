import { Component, OnInit }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { ApiService }                 from '../_core/api.service';

@Component({
   moduleId: module.id,
   selector: 'app-note-detail',
   templateUrl: './note-detail.component.html',
   styleUrls: ['./note-detail.component.css'],
   providers:[ApiService]
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
   init_command: any;
   selectedProperty: any;

   // sub:any;
   // dialog = document.querySelector('dialog');
   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private apiService: ApiService
   ) { }

   initing(){
     this.init_command ?  console.log(this.init_command) : console.log('no command')
      this.apiService.query('get', `/get_note_detail/${this.note_id}`)
      .subscribe(
         res =>{
            this.noteDetail = res.data.detail;
         },
         error => {
            // console.log(error);
            if(error.status == 401){
              this.router.navigate(['/authenticate']);
            }else{
              this.router.navigate(['/note_list']);
            };
         });
    };

   labelChanging(label){
      if(label!=this.selectedProperty.labels){
         this.newLabel = label;
      }else{
         this.newLabel = '';
      }
   };
   editer(node){
      this.selectedProperty = node || {labels:'Undefined', value:''};
      this.newValue = node.value || '';
      if(!node.value) this.newProperty = true;
      this.editing = true;
   };
   save(){
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
            this.apiService.query('post', '/add_property', params)
            .subscribe(
               response => {
                  console.log('data', response);
                  // this.alertService.success('Saved !');
                  this.editing = false;
                  this.newProperty = false;
                  //   this.router.navigate(['/note_detail'], {queryParams:{note_id: this.note_id}});
                  this.initing();
               },
               error => {
                  console.log('error', error);
                  this.editing = false;
               }
            );

         }else{
            this.apiService.query('post', '/update_property', params)
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
      this.apiService.query('delete', `/delete_property/${this.note_id}/${this.selectedProperty.node_id}`)
      .subscribe(
         data => {
            console.log('data', data);
            this.editing = false;
            this.initing();
         },
         error => {
            console.log('error', error);
            this.editing = false;
         }
      );

   }
   drop(direction){
      let params = {
         note_id: this.note_id,
         property_id:this.selectedProperty.node_id,
         drop:direction
      };
      this.apiService.query('post', '/drop_property', params)
      .subscribe(
         data => {
            console.log('data', data);
            this.editing = false;
            // this.initing();
         },
         error => {
            console.log('error', error);
            this.editing = false;
         }
      );

   }

   ngOnInit() {
      this.route
      .queryParams
      .subscribe(params=>{
         this.note_id = params.note_id;
         params.command ? this.init_command = params.command : null
      });
      this.initing();
   }

}
