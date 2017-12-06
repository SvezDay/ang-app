import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../_core/api.service';
import { ContainerService } from '../_core/container.service';
import _ from 'lodash';
import * as $$ from '../_models/all.class';
import 'rxjs/add/operator/toPromise';


@Component({
  moduleId: module.id,
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['../app.component.css','./note.component.css'],
  providers: [ApiService, ContainerService]
})
export class NoteComponent implements OnInit{
  mainList = [];
  container: $$.Container;
  propSelected: $$.Property;

  constructor(
    private router: Router,
    private location: Location,
    private api: ApiService,
    private cs: ContainerService,
    private modalService: NgbModal
  ) {
    this.container = new $$.Container();
  }


  ngOnInit():void{
    this.cs.containers().subscribe(res => {
      console.log(res.data.data)
      res.response.status == 204 ? this.mainList = [] : this.mainList = res.data.data
    }, err => {
      console.log(err);
      this.location.back();
    })
  }

  onOutside(updated?: $$.Property):void{
    if(updated){
      if( this.propSelected.label == 'Title'){
        let bool = false;
        this.mainList.map((x, i) => {
          x.id == this.propSelected.id ?
            (this.mainList[i] = updated, bool = true) : null
        });
        bool ? null : this.updateMainList()
        this.container.title = updated;
      }
      this.container.main.map(x => {
        if(x.id == this.propSelected.id){
          x.id = updated.id;
          x.value = updated.value;
        }
      })
    }
    delete this.propSelected;

  }

  updateMainList():void{
    this.cs.containers().subscribe(res => {
      res.response.status == 204 ? this.mainList = [] : this.mainList = res.data.data
    }, err => {
      console.log(err);
    })
  }

  onNotify(ev):void{
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

  selecting(item:$$.Property):void{
    if(this.propSelected && this.propSelected.id == item.id){
      return;
    }else{
      this.propSelected = Object.assign({},item);
      this.propSelected.container_id = this.container.container_id;
    }
  }

  addProperty(){
    this.api.query('post', '/note_add_property',
      {container_id: this.container.container_id}).subscribe( res => {
      this.container.main.unshift(res.data.data);
    }, error => {
      console.log(error);
    });
  }

  onDrop(dir){
    let params = {
       container_id: this.container.container_id,
       property_id:this.propSelected.id,
       direction:dir
    };
    this.api.query('post', '/note_drop_property', params)
    .subscribe(
       res => {
         // then modify the position on the details list
         if(res.response.status == 200){
           // let newArr = [];
           let main = this.container.main;
           // let selID = this.propSelected.id;
           // let store = {};
           // if(dir == 'up' && main[0].id == selID){
           //   return 'Error limit';
           // }else if(dir == 'down' && main[main.length -1].id == selID){
           //   return 'Error limit';
           // }else if(dir == 'up'){
           //   this.container.main.reverse()
           // }
           // console.log('selID', selID)
           // this.container.main.map( x => {
           //   console.log("x: ",x)
           //   console.log('store', store)
           //   if(x.id == selID){
           //     console.log('check 1')
           //     store = x;
           //   // }else if (!_.isEmpty(store)) {
           //   }else if (store != false) {
           //   console.log('check 2')
           //     newArr.push(x);
           //     newArr.push(store);
           //     store = {}
           //   }else{
           //     console.log('check 3')
           //     newArr.push(x)
           //   }
           // })
           let index = 0;
           // let i = 0;
           for (var i = 0; i < this.container.main.length; i++) {
             if(this.container.main[i].id == this.propSelected.id){

               index = i}
           }
           // this.container.main.map(x => {
           //   i++;
           //   if(this.container.main.[x].id == this.propSelected.id){
           //     index = i
           //   }
           // })
           if(dir == 'down'){
             this.container.main.splice(index+2, 0, this.container.main[index])
             this.container.main.splice(index, 1)
           }else{
             this.container.main.splice(index, 1)
             this.container.main.splice(index-1, 0, this.container.main[index])
           }
           // dir == 'up' ? newArr.reverse() : null
           // this.container.main = newArr;

         }
       },
       error => { console.log('error', error); }
    );
  }

  addContainer(){
    this.api.query('post', '/create_empty_note').subscribe( res => {
      let d = res.data.data;
      this.container.container_id = d.container_id;
      this.container.title = {id:d.title_id, label:'Title', value:'Undefined'};
      this.container.main = [{id:d.first_property_id, label:'Undefined', value:''}];
      this.mainList.unshift({
        container_id:d.container_id,
        title_id: d.title_id,
        value: 'Undefined'
      });
    }, err => { console.log(err) });
  }

  onDelete(){
    this.api.query('delete',
      `/delete_property/${this.container.container_id}/${this.propSelected.id}`)
    .subscribe( res => {
      this.container.main = this.container.main.filter(x => {
        return x.id != this.propSelected.id });
      delete this.propSelected;
    }, err => {  console.log(err)  });

  }

  deleteContainer(){
    this.api.query('delete', `/delete_container/${this.container.container_id}`)
    .subscribe( res => {
      this.cs.containers().subscribe(res => {
        res.response.status == 204 ? this.mainList = [] : this.mainList = res.data.data
        this.container = new $$.Container();
      }, err => {
        console.log(err);
      })
    }, err => {
      console.log(err)
    })
  }


}
