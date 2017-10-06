import { Component, OnInit, ViewContainerRef }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { ApiService }                 from '../_core/api.service';

@Component({
   moduleId: module.id,
   selector: 'app-note-detail',
   templateUrl: './note-detail.component.html',
   styleUrls: ['../app.component.css','./note-detail.component.css'],
   providers:[ApiService]
})
export class NoteDetailComponent implements OnInit {
  // Init params
   note_id:Number;
   details = [];
   container: any;
   title: any;
   label_list: any;
// loading = false;

  // toggling params
  ref = 0;

  // Selecting data params
  originalData: any;
  updateData: any;


  //  editing = false;
  //  labels = ['Undefined', 'title', 'Resume', 'Code'];
  //  newLabel: string;
  //  newValue: string;
  //  newProperty = false;
   //
  //  init_command: any;
  //  selectedProperty: any;

   // Message params
   alert_message = "";

   // sub:any;
   // dialog = document.querySelector('dialog');
   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private api: ApiService,
      private vcr: ViewContainerRef
   ) { }

   ngOnInit() {
     this.route
     .queryParams
     .subscribe(params=>{
       this.note_id = params.note_id;
       //  params.command ? this.init_command = params.command : null
     });
     this.initing();
   };

   initing(){
    //  this.init_command ?  console.log(this.init_command) : console.log('no command')
     this.api.query('get', `/get_note_detail/${this.note_id}`)
     .subscribe(
       res =>{
         let d = res.data.data;
         this.details = d.detail;
         this.container = d.container;
         this.title = d.title;
         this.get_label();
       },
       error => {
         if(error.status == 401){
           this.router.navigate(['/authenticate']);
         }else{
            console.log(error);
          //  this.router.navigate(['/note_list']);
         };
      });
   };

   get_label(){
     this.api.query('get', '/note_get_label')
     .subscribe(
       res => {
         this.label_list = res.data.data;
       },
       error => {
         if(error.status == 401){
            this.router.navigate(['/authenticate']);
         }else{
           console.log(error);
         };
       });
   };

   dataSelect(item){
     this.ref = item.id;
     let c = window.document.getElementById(`card_${item.id}`).style;
     c.width = "110%";
     c.left = "-6%";
     this.originalData = Object.assign({},item);
     this.updateData = Object.assign({},item);
   };

  //  labelChanging(label){
  //     if(label!=this.selectedProperty.labels){
  //        this.newLabel = label;
  //     }else{
  //        this.newLabel = '';
  //     }
  //  };

   update(){

     this.ref = 0;
     let c = window.document.getElementById(`card_${this.updateData.id}`).style;
     c.width = "initial";
     c.left = "0";
     let t = window.document.getElementsByClassName("my-card-property-extend");
     t[0] ? t[0].classList.remove('my-card-property-extend') : null

     if(this.originalData.labels != this.updateData.labels){
        this.updateData.container_id = this.note_id;
        this.api.query('post', '/note_update_label', this.updateData)
        .subscribe( res => {
          //override the data wihtin the init params
          this.details.map( item => {
            if(item.id == this.updateData.id){
              item.labels = this.updateData.labels;
            };
          });
          console.log(res);
        }, error => {
          console.log(error);
        });
    }else if(this.originalData.value != this.updateData.value){
        this.updateData.container_id = this.note_id;
         this.api.query('post', '/note_update_value', this.updateData)
         .subscribe( res => {
           // Override the data wihtin the init params
           // Check if the update concerne the title or not
           if(this.title.id == this.updateData.id){
             this.title.value = this.updateData.value;
           }else{
             this.details.map( item => {
               if(item.id == this.updateData.id){
                 item.value = this.updateData.value;
               };
             });
           };
           console.log(res);
         }, error => {
           console.log(error);
         });
     };
   };

   add(){
    //  Add in db
      this.api.query('post', '/note_add_property', {container_id: this.note_id})
      .subscribe( res => {
        //  Then Add in this.details with result of db creation
        this.details.unshift(res.data.data);
      }, error => {
        console.log(error);
      });

   };

   delete_container(){
      this.api.query('delete', `/delete_container/${this.container.id}`)
      .subscribe(
         () => {
            this.router.navigate(['/note_list']);
         },
         error => {
            console.log('error', error);
         }
      );
   };

   delete_property(){
     // this.current property
   };

   drop(dir, id){
      let params = {
         container_id: this.note_id,
         property_id:id,
         direction:dir
      };
      this.api.query('post', '/note_drop_property', params)
      .subscribe(
         res => {
           // then modify the position on the details list
            console.log('data', res);
            this.initing();
         },
         error => {
            console.log('error', error);
         }
      );
   };

}
