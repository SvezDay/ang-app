import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import * as $ from 'jquery';

import { ApiService } from '../_core/api.service';
import { ContainerService } from '../_core/container.service';

import * as $$ from '../_models/all.class';


@Component({
  moduleId: module.id,
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['../app.component.css','./note.component.css'],
  providers: [ApiService, ContainerService]
})
export class NoteComponent implements OnInit{
  // TreeView
  mainlist = [];
  updateMainList: any;
  // path = [];

  // Template boolean
  // labelListBool: boolean;

  // Main
  container: $$.Container;
  // labelsData: c_.LabelsData;
  // labels: string[];
  selProp: $$.Property;
  // cpSelProp: $$.Property;
  // updateData = {};    // ?


  //Modal labels
  // modal: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private cs: ContainerService,
    private modalService: NgbModal
  ) {
    this.container = new $$.Container();
    // this.labelsData = new LabelsData();
    // this.labelListBool = true;
  }

  ngOnInit() {
    this.cs.containers().subscribe(res => {
      res.response.status == 204 ? this.mainlist = [] : this.mainlist = res.data.data
      // this.getLabel();
    }, err => {
      console.log(err);
    })
  }

  onNotify(ev){
    this.selProp == null ? console.log('TRUE'): console.log('FALSE')
    this.container.title = {
      id: ev.title_id, value: ev.value, label: ev.label || 'Title'
    };
    this.container.container_id = ev.container_id;
    this.api.query('get', `/get_note_detail/${ev.container_id}`)
    .subscribe(
      res =>{
        let data = res.data.data;
        this.container.main =  data.main;
      }, error => {
        if(error.status == 401){
          this.router.navigate(['/authenticate']);
        }else{
           console.log(error);
        };
     });
  }

  // getLabel(){
  //   this.api.query('get', '/note_get_label').subscribe( res => {
  //       this.labelsData.list = res.data.data;
  //       this.labels = res.data.data;
  //     }, err => {
  //       err.status == 401 ? this.router.navigate(['/authenticate']) : null
  //       console.log(err);
  //     });
  // }

  selecting(item){
    if(this.selProp){
      return;
    }
    console.log('SELECTING FUNCTION')
    setTimeout(()=>{
      this.selProp = Object.assign({},item);
      // this.cpSelProp = Object.assign({},item);
      let c = window.document.getElementById(`card_${item.id}`);
      c.classList.toggle("mdl-shadow--2dp");
      c.classList.toggle("my-selectedProperty");
      // this.updateData = Object.assign({},item);
    }, 500);
  }

  unselecting(){
    delete this.selProp;
    // delete this.cpSelProp;
  }

  updateText(){
      console.log('UPDATE FUNCTION')
    // setTimeout(()=>{
    //
    //   if(this.labelsData.initialLabel){
    //     console.log("RETUR OFF the update func")
    //     return
    //   }
    //
    //   let c = window.document.getElementById(`card_${this.selProp.id}`);
    //   c.classList.toggle("mdl-shadow--2dp");
    //   c.classList.toggle("my-selectedProperty");
    //
    //   if(this.selProp.value != this.cpSelProp.value){
    //     this.cpSelProp.container_id = this.container.container_id;
    //     this.api.query('post', '/note_update_value', this.cpSelProp).subscribe(
    //       res => {
    //         let d = res.data.data;
    //         if(this.cpSelProp.label == 'Title'){
    //           this.container.title = {value: d.value, id:d.id, label:'Title'};
    //           this.cs.containers().subscribe(res => {
    //             res.response.status == 204 ? this.mainlist = [] : this.mainlist = res.data.data
    //           }, err => {
    //             console.log(err);
    //           })
    //         }else{
    //           this.updateContainerMain(d)
    //         }
    //         this.unselecting();
    //       }, err => {
    //         console.log(err)
    //         this.unselecting();
    //       });
    //     }else{
    //       this.unselecting();
    //     }
    // }, 1000)

  }

  addProperty(){
    this.api.query('post', '/note_add_property',
      {container_id: this.container.container_id}).subscribe( res => {
      this.container.main.unshift(res.data.data);
    }, error => {
      console.log(error);
    });
  }


  drop(direction){
    console.log('DROP FUNCTION ', direction)
    // let params = {
    //    container_id: this.container.container_id,
    //    property_id:this.selProp.id,
    //    direction:direction
    // };
    // console.log(params)
    // this.api.query('post', '/note_drop_property', params)
    // .subscribe(
    //    res => {
    //      // then modify the position on the details list
    //       console.log('data', res);
    //       // window.location.reload();
    //       let c = window.document.getElementById(`card_${this.selProp.id}`);
    //       c.classList.toggle("mdl-shadow--2dp");
    //       c.classList.toggle("my-selectedProperty");
    //       delete this.selProp;
    //       delete this.cpSelProp;
    //    },
    //    error => {
    //       console.log('error', error);
    //    }
    // );
  }

  addContainer(){
    this.api.query('post', '/create_empty_note').subscribe( res => {
      let d = res.data.data;
      this.container.container_id = d.container_id;
      this.container.title = {id:d.title_id, label: 'Title', value:'Undefined'};
      this.container.main = [{id:d.first_property_id, label: 'Undefined', value:''}];
      this.updateMainList({
        container_id:d.container_id,
        title_id: d.title_id,
        value: 'Undefined'
      });
    }, err => { console.log(err) });
  }

  // updateMainList(obj){
  //   this.mainlist.unshift(obj)
  // }

  // updateContainerMain(obj){
  //   this.container.main.map((itm, idx) => {
  //     if(itm.id == this.cpSelProp.id){
  //       this.container.main[idx] = obj;
  //     }
  //   })
  // }

  deleteProperty(item){
    console.log('DELETE PROPERTY FUNCTION');
    // let w = window.document.getElementById('textarea_559');
    // let t = $(`#textarea_${item.id}`);

    // console.log('item', item)
    // console.log("w", w)
    // console.log("t", t)
    // console.log('this native elem', this.elRef.nativeElement)
    // this.api.query('delete',
    //   `/delete_property/${this.container.container_id}/${this.selProp.id}`)
    // .subscribe( res => {
    //   this.unselecting();
    //   this.container.main = this.container.main.filter(x => {
    //     return x.id != this.selProp.id});
    // }, err => {  console.log(err)  });

  }

  deleteContainer(){
    this.api.query('delete', `/delete_container/${this.container.container_id}`)
    .subscribe( res => {
      // update the list
      console.log('deleted !')
      console.log('res', res)

      this.cs.containers().subscribe(res => {
        res.response.status == 204 ? this.mainlist = [] : this.mainlist = res.data.data
        this.container = new $$.Container();
      }, err => {
        console.log(err);
      })
    }, err => {
      console.log(err)
    })
  }

  // selectingLabel(){
  //   console.log('SELECTING LABEL')
  //   this.labelsData.initialLabel = this.selProp.label;
  // }

  // tryingLabel(lab){
  //   // this.labelsData.tryLabel = lab;
  //   this.cpSelProp.label = lab;
  // }

  // unSelectingLabel(){
  //   // this.labelsData.tryLabel = null;
  //   // this.labelsData.initialLabel = null
  // }

  // updateLabel(){
  //   console.log('UPDATE LABEL FUNCTION')
    // let lab = this.labelsData.tryLabel;
    // let lab = this.cpSelProp.label;
    // if(lab == 'Title' || lab == this.selProp.label){
    //   this.unSelectingLabel();
    //   return;
    // }
    // console.log('UPDATE LABEL FUNCTION Validate')
    // this.api.query('post', '/note_update_label', ).subscribe( res => {
    //   console.log('res of update label', res)
    // }, err => { console.log(err) })
    // this.unselecting();
    // if(this.selProp.value != this.cpSelProp.value){
    //   this.cpSelProp.container_id = this.container.container_id;
    //   this.api.query('post', '/note_update_value', this.cpSelProp).subscribe(
    //     res => {
    //       let d = res.data.data;
    //       if(this.cpSelProp.label == 'Title'){
    //         this.container.title = {value: d.value, id:d.id, label:'Title'};
    //         this.cs.containers().subscribe(res => {
    //           res.response.status == 204 ? this.mainlist = [] : this.mainlist = res.data.data
    //         }, err => {
    //           console.log(err);
    //         })
    //       }else{
    //         this.updateContainerMain(d)
    //       }
    //       this.unselecting();
    //     }, err => {
    //       console.log(err)
    //       this.unselecting();
    //     });
    //   }else{
    //     this.unselecting();
    //   }
  // }


}
