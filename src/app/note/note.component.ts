import { Component, OnInit, ViewContainerRef }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ApiService }                 from '../_core/api.service';
import { ContainerService }           from '../_core/container.service';


@Component({
  moduleId: module.id,
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['../app.component.css','./note.component.css'],
  providers: [ApiService, ContainerService]
})
export class NoteComponent implements OnInit {
  // Side Arborescence
  perso_account: any;
  mainlist = [];
  level: number;
  path = [];
  // sublist = [];


  constructor(
    private router: Router,
    private api: ApiService,
    private cs: ContainerService
  ) { }

  ngOnInit() {
    // this.contservice.containers(this.path, 'forward', null)
    // .subscribe(res => {
    //   console.log('res', res);
    //   res.response.status == 401 ? this.router.navigate(['/authenticate']) :  null
    //   // this.mainlist = res.data.data;
    //   this.mainlist = this.test;
    //   console.log(this.mainlist)
    // }, err =>{
    //   console.log(err);
    // });
    this.cs.containers().subscribe(res => {
      console.log('res', res)
      // res.response.status == 204 ?  this.sublist = [] : null
      this.mainlist = res.data.data;
      this.level = 1;
    }, err => {
      console.log(err);
    })
  }

  select(item, index){
    console.log('check h', item)
    // console.log('item', item);
    // console.log('index', index)
    // this.contservice.containers(this.path, 'forward', item)
    // .subscribe(res => {
    //   console.log('res', res);
    //   res.response.status == 401 ? this.router.navigate(['/authenticate']) :  null
    //   // res.response.status == 204 ?
    //   this.sublist = res.data.data;
    // }, err =>{
    //   console.log(err);
    // });

  }

  // sort(){
  //   if(cont && direction == 'forward'){
  //     this.path.push(cont);
  //     this.container_to_host = cont;
  //   }else if(direction == 'back'){
  //     this.path.pop();
  //     if(this.path.length == 0){
  //       this.container_to_host = {};
  //     }else{
  //       this.container_to_host = this.path[this.path.length - 1];
  //     }
  //   };
  //
  //
  //   if(this.container_to_host && this.container_to_host.container_id){
  //     params.container_id = this.container_to_host.container_id;
  //   };
  //
  //
  // }

  containers(direction, cont?){
    // cont ? null : cont = null;
    // this.contservice.containers(direction, cont)
    // .subscribe(res => {
    //   console.log('res', res);
    // }, err =>{
    //
    // });
  };

}
