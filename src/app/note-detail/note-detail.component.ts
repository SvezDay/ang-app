import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../_core/api.service';
import * as $$ from '../_models/all.class';
import 'rxjs/add/operator/toPromise';

// import { ClickOutside } from '../_directives/click-outside.directive';

@Component({
   moduleId: module.id,
   selector: 'app-note-detail',
   templateUrl: './note-detail.component.html',
   styleUrls: ['../app.component.css','./note-detail.component.css'],
})
export class NoteDetailComponent{
  @Input() property: $$.Property;
  @Output() droper: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleter: EventEmitter<any> = new EventEmitter<any>();
  @Output() outsider: EventEmitter<any> = new EventEmitter<any>();

  copy: $$.Property;
  toggleLabelList: boolean;
  labels: string[];
  delai: number;

   closeResult: string;
   showLabels: boolean;

  constructor(
    private api: ApiService,
    private modalService: NgbModal
  ){ }

  ngOnInit(){
    this.showLabels = false;
    // Because an event is sent automatically at the creation, we must avoid it
    this.delai = new Date().getTime();
    this.copy = new $$.Property(this.property);
    this.toggleLabelList = false;
  }

  clickOutside(e: Event) :void{
    let now = new Date().getTime();
    // Because an event is sent automatically at the creation, we must avoid it
    if(this.delai + 100 < now && !this.showLabels){
      this.update();
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  selectingLabel(content){
    this.showLabels = true;
    this.api.query('get', '/note_get_label').subscribe(
      res => { this.labels = res.data.data; },
      err => { console.log(err); });

    this.modalService.open(content).result.then(
      (result) => { this.closeResult = `Closed with: ${result}`; },
      (reason) => {
         this.closeResult = "Dismissed "+ this.getDismissReason(reason); }
      ).then(()=>{
      // This is fore avoid the click outside emitting
      this.delai = new Date().getTime();
      this.showLabels = false;
    });

  }

  drop(dir){
    this.droper.emit(dir);
  }

  delete(){
    this.deleter.emit();
  }

  update(){
    if(!Object.is(this.property,this.copy.value)){
      this.api.query('post', '/note_update', this.copy)
      .toPromise()
      .then(
        res => {
            this.outsider.emit(res.data.data);
        }, err => {
          console.log(err)
        });
      }else{
        this.outsider.emit();
      }
  }

  tryingLabel(label){
    this.copy.label = label;
  }

}
