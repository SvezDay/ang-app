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
    // Because an event is sent automatically at the creation, we must avoid it
    if(this.delai + 100 < new Date().getTime()){
      // if the title has updated
      // this.outsider.emit(this.property, this.propUpdated);
      // else
      if(!this.showLabels){
        console.log('outsiding =================')
        this.outsider.emit(this.property);
      }
    }
  }

  selectingLabel(content){
    this.showLabels = true;
    this.api.query('get', '/note_get_label').subscribe(
      res => { this.labels = res.data.data; },
      err => { console.log(err); });

    // let dialogButton = document.querySelector('.dialog-button');
    // let dialog = document.querySelector('#dialog');
    // if (! dialog.showModal) {
    //   dialogPolyfill.registerDialog(dialog);
    // }
    // dialogButton.addEventListener('click', function() {
    //    dialog.showModal();
    // });
    // dialog.querySelector('button:not([disabled])')
    // .addEventListener('click', function() {
    //   dialog.close();
    // });

    this.modalService.open(content).result.then((result) => {
      // This is fore avoid the click outside emitting
      console.log('============resutl : ', result)
      this.delai = new Date().getTime();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log('============reason : ', reason)
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

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

  drop(dir){
    this.droper.emit(dir);
  }

  delete(){
    this.deleter.emit();
  }

  update(){
    console.log('UPDATE FUNCTION')
    // setTimeout(()=>{
    //
    //   if(this.labelsData.initialLabel){
    //     console.log("RETUR OFF the update func")
    //     return
    //   }
    //
    //   let c = window.document.getElementById(`card_${this.propSelected.id}`);
    //   c.classList.toggle("mdl-shadow--2dp");
    //   c.classList.toggle("my-selectedProperty");
    //
    //   if(this.propSelected.value != this.cpSelProp.value){
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
