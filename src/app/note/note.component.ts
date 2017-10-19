import { Component, OnInit, ViewContainerRef }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ApiService }                 from '../_core/api.service';
import { ContainerService }           from '../_core/container.service';


class Property {
  id: number;
  label: string;
  value: string;
  container_id?: number;
}
class Container extends Property{
  container_id?: number;
  title?: Property;
  main?: Property[];
}

@Component({
  moduleId: module.id,
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['../app.component.css','./note.component.css'],
  providers: [ApiService, ContainerService]
})
export class NoteComponent implements OnInit{
  // TreeView
  perso_account: any;
  mainlist = [];
  path = [];

  // Main
  container: Container;
  labels = [];
  selProp: Property;
  cpSelProp: Property;
  updateData = {};    // ?

  constructor(
    private router: Router,
    private api: ApiService,
    private cs: ContainerService
  ) {
    this.container = new Container();
  }

  ngOnInit() {
    this.cs.containers().subscribe(res => {
      res.response.status == 204 ? this.mainlist = [] : this.mainlist = res.data.data
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
        console.log('CHECKING', res)
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

  selecting(item){
    console.log('SELECTING FUNCTION')
    setTimeout(()=>{
      this.selProp = Object.assign({},item);
      this.cpSelProp = Object.assign({},item);
      let c = window.document.getElementById(`card_${item.id}`);
      c.classList.toggle("mdl-shadow--2dp");
      c.classList.toggle("my-selectedProperty");
      this.updateData = Object.assign({},item);
    }, 500);
  }

  updateText(){
    console.log('UPDATE FUNCTION')
    let c = window.document.getElementById(`card_${this.selProp.id}`);
    c.classList.toggle("mdl-shadow--2dp");
    c.classList.toggle("my-selectedProperty");

    if(this.selProp.value != this.cpSelProp.value){
      this.cpSelProp.container_id = this.container.container_id;
      this.api.query('post', '/note_update_value', this.cpSelProp).subscribe(
        res => {
          this.container.main.map(x => {
            if(x.id == this.cpSelProp.id){
              x.value = this.cpSelProp.value;
            }
          })
          delete this.selProp;
          delete this.cpSelProp;
        }, err => {
          console.log(err)
          delete this.selProp;
          delete this.cpSelProp;
        });
    }else{
      delete this.selProp;
      delete this.cpSelProp;
    }

  }

  updateLabel(){

  }

  addProperty(){
    this.api.query('post', '/note_add_property',
      {container_id: this.container.container_id}).subscribe( res => {
      //  Then Add in this.details with result of db creation
      this.container.main.unshift(res.data.data);
    }, error => {
      console.log(error);
    });
  }

  deleteProperty(item){
    console.log('DELETE PROPERTY FUNCTION')

  }

  drop(direction, item){
    console.log('DROP FUNCTION')
    let params = {
       container_id: this.container.container_id,
       property_id:item.id,
       direction:direction
    };
    this.api.query('post', '/note_drop_property', params)
    .subscribe(
       res => {
         // then modify the position on the details list
          console.log('data', res);
          // window.location.reload();
       },
       error => {
          console.log('error', error);
       }
    );
  }


}
