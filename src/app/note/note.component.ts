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
  // TreeView
  perso_account: any;
  mainlist = [];
  path = [];
  // Main
  container = {container_id: Number, main: {}, title: {}};
  labels = [];
  ref: any;           // ?
  updateData = {};    // ?

  constructor(
    private router: Router,
    private api: ApiService,
    private cs: ContainerService
  ) { }

  ngOnInit() {
    this.cs.containers().subscribe(res => {
      res.response.status == 204 ? this.mainlist = [] : this.mainlist = res.data.data
      this.getLabel();
    }, err => {
      console.log(err);
    })
  }

  onNotify(ev){
    this.container.title = {id: ev.title_id, value: ev.value};
    this.container.container_id = ev.container_id;
    this.api.query('get', `/get_note_detail/${ev.container_id}`)
    .subscribe(
      res =>{
        console.log(res)
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


  getLabel(){
    this.api.query('get', '/note_get_label').subscribe( res => {
        this.labels = res.data.data;
      }, err => {
        err.status == 401 ? this.router.navigate(['/authenticate']) : null
        console.log(err);
      });
  }


  selectProperty(item, ev){
    console.log('property event',ev)
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
      // this.originalData = Object.assign({},item);
      this.updateData = Object.assign({},item);
    }, 500);
  }

  update(){

  }



}
