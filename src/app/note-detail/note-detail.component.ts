import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../_core/api.service';
import * as $$ from '../_models/all.class';
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
    // this.copy = new $$.Property();
    // this.copy = this.property;
    this.toggleLabelList = false;
  }

  clickOutside(e: Event) :void{
    let now = new Date().getTime();
    console.log('function outside function')
    // Because an event is sent automatically at the creation, we must avoid it
    if(this.delai + 100 < now && !this.showLabels){
      this.update();
      // if updated
        // this.outsider.emit(this.propUpdated);
      // else
        this.outsider.emit();
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
    console.log('UPDATE FUNCTION')
    // console.log('copy', this.copy)
    // console.log('property', this.property)
    if(this.property != this.copy){
      this.api.query('post', '/note_update', this.copy).subscribe(
        res => {
          this.outsider.emit(res.data.data);
          // if(this.cpSelProp.label == 'Title'){
            // this.container.title = {value: d.value, id:d.id, label:'Title'};
            // this.cs.containers().subscribe(res => {
            //   res.response.status == 204 ? this.mainlist = [] : this.mainlist = res.data.data
            // }, err => {
            //   console.log(err);
            // })
          // }else{
          //   this.updateContainerMain(d)
          // }
          // this.unselecting();
        }, err => {
          console.log(err)
          // this.unselecting();
        });
      }else{
        // this.unselecting();
        this.outsider.emit();
      }
  }

  tryingLabel(label){
    this.copy.label = label;
  }

}




// <div class="mdl-cell mdl-cell--12-col" style="margin:0;" click-outside (clickOutside)="singleClick($event)">
//
// <div class="mdl-card__supporting-text"  style="text-align:right; padding:0; width:100%;">
//
//  <div class="mdl-card__actions" *ngIf="selProp?.id == item.id" style="text-align:right; padding:0;">
//    <span class="my-chip-fab" (click)="selecting(item)" *ngIf="!toggleLabelList">
//      <span>{{item.label}}</span>
//      <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" (mousedown)="selectingLabel()"
//        style="">
//        <i class="material-icons">arrow_drop_down</i>
//      </button>
//    </span>
//    <span class="my-chip-fab" (click)="selecting(item)" *ngIf="!toggleLabelList">
//      <span>Up</span>
//      <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" (mousedown)="drop('up')"
//        style="">
//        <i class="material-icons">keyboard_arrow_up</i>
//      </button>
//    </span>
//    <span class="my-chip-fab" (click)="selecting(item)" *ngIf="!toggleLabelList">
//      <span>down</span>
//      <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" (mousedown)="drop('down')"
//        style="">
//        <i class="material-icons">keyboard_arrow_down</i>
//      </button>
//    </span>
//    <button id="deli" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect"
//    (mousedown)="deleteProperty(item)"
//
//        style="margin:5px;">
//        <i class="material-icons">delete</i>
//    </button>
//
//  </div>
// </div>
//  <div class="mdl-card__supporting-text" style="width:100%;padding:0;">
//      <textarea id="textarea_{{item.id}}" autosize focus='true' type="text"
//      class="mdl-textfield__input my-textarea blinking-cursor noborder my-card-property-text-textarea"
//      [ngClass]="labelsData?.tryLabel ? 'label-' + labelsData?.tryLabel : 'label-'+ item.label"
//      style="padding-top:0;"
//      [(ngModel)]="cpSelProp.value" name="newValue"></textarea>
//      <!-- style="border-top:1px solid rgba(0,0,0,.1);" -->
//      <!-- (blur)="updateText()" -->
//  </div>
//
// </div>
