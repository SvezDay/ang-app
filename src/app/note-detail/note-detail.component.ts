import { Component, OnInit, ViewContainerRef }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  // toggling params
  ref = 0;

  // Selecting data params
  originalData: any;
  updateData: any;

   // Message params
   alert_message = "";


   // Modal change path
   closeResult: string;
   default_current_container = "My Home";
   current_container = "";
   path = [];
   containers = [];
   container_to_host: any;


   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private api: ApiService,
      private modalService: NgbModal
   ) { }

// Modal change path
  // open(content) {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  get_containers(content, direction, c?){
    // console.log('=====================')
    // console.log(c)
    let params = {container_id: null};

    if(!c && direction == 'forward'){

    }else if(c && direction == 'forward'){
      this.path.push(c);
      this.container_to_host = c;
    }else if(direction == 'back'){
      this.path.pop();
      if(this.path.length == 0){
        this.container_to_host = {};
      }else{
        this.container_to_host = this.path[this.path.length - 1];
      }
    };

    if(this.container_to_host && this.container_to_host.container_id){
      params.container_id = this.container_to_host.container_id;
    };

    this.api.query('post', '/container_get_sub_container', params)
    .subscribe(res => {
      console.log(res);
      // console.log('check the modal result')
      if(res.response.status == 204){
        this.containers = [];
      }else{
        this.containers = res.data.data;
        this.modalService.open(content).result.then( result => {
          console.log('result', result)
        });
      };

    }, err => {
      console.log(err)
    });
  };

  add_folder_container(){
    // this.container_selected  = container.container_id;
    // console.log(this.container_selected)
    // console.log(container)
  }

  change_container_path(){
    let params = {
      container_to_move: this.container.id,
      container_to_host: this.container_to_host.container_id
    };
    this.api.query('post', '/change_container_path',params)
    .subscribe( res => {
      console.log('response =================')
      console.log(res)
    }, err => {
      console.log(err);
    });
  }


   ngOnInit() {
     this.route
     .queryParams
     .subscribe(params=>{
       this.note_id = params.note_id;
      //  this.initing();
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
     });
   };

   initing(){
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
     setTimeout(()=>{
       this.ref = item.id;
       let c = window.document.getElementById(`card_${item.id}`);
       console.log(c)
       let s = c.style;
       s.width = "110%";
       s.left = "-6%";
       s.marginTop = "1%";
       s.marginBottom = "1%";
       c.classList.add("mdl-shadow--2dp");
       // c.addClass("mdl-shadow--2dp");
       this.originalData = Object.assign({},item);
       this.updateData = Object.assign({},item);
     }, 500);
   };

  //  labelChanging(label){
  //     if(label!=this.selectedProperty.labels){
  //        this.newLabel = label;
  //     }else{
  //        this.newLabel = '';
  //     }
  //  };

   update(){
     setTimeout(()=>{
       this.ref = 0;
       let c = window.document.getElementById(`card_${this.updateData.id}`);
       let s = c.style;
       s.width = "initial";
       s.left = "0";
       s.marginTop = "0";
       s.marginBottom = "0";
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
     }, 500);

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

   delete_property(property){
     let q: String;
     if( property.labels != 'Title'){
       q =  `/delete_property/${this.container.id}/${property.id}`;
     }else{
       q = `/delete_container/${this.container.id}`;
     };
     this.api.query('delete',q).subscribe( res => {
       if (property.labels == 'Title'){
         this.router.navigate(['/note_list']);
       }else{
         this.details = this.details.filter(x => { return x.id != property.id});
       };
     }, err => {
       err.status == 401 ? this.router.navigate(['/authenticate']) : null
       console.log(err);
     });
   };

   drop(dir, id){
      let params = {
         container_id: this.container.id,
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
