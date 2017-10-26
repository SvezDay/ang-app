import { Component, OnInit, ViewContainerRef, Input, Output }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ApiService }                 from '../_core/api.service';

import * as $$ from '../_models/all.class';
// import { ClickOutside } from '../_directives/click-outside.directive';

@Component({
   moduleId: module.id,
   selector: 'app-note-detail',
   template: `
     <div class="mdl-cell mdl-cell--12-col" style="margin:0;" (clickOutside)="update()">
       <div class="mdl-card__supporting-text"  style="text-align:right; padding:0; width:100%;">
        <div class="mdl-card__actions" style="text-align:right; padding:0;">
          <span class="my-chip-fab" (click)="selectingLabel()">
            <span>{{property.label}}</span>
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect"
              style=""><i class="material-icons">arrow_drop_down</i></button>
          </span>
          <span class="my-chip-fab" (click)="drop('up')">
            <span>Up</span>
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect"
              style=""><i class="material-icons">keyboard_arrow_up</i></button>
          </span>
          <span class="my-chip-fab"  (click)="drop('down')">
            <span>down</span>
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect"
              style=""><i class="material-icons">keyboard_arrow_down</i></button>
          </span>
          <button id="deli" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect"
            (click)="delete()"
            style="margin:5px;"><i class="material-icons">delete</i></button>
        </div>
       </div>
       <div class="mdl-card__supporting-text" style="width:100%;padding:0;">
          <textarea id="textarea_{{property.id}}" autosize focus='true' type="text"
              class="mdl-textfield__input my-textarea blinking-cursor noborder my-card-property-text-textarea"
              style="padding-top:0;"
              [ngClass]="copy?.label ? 'label-' + copy?.label : 'label-'+ original?.label"
              [(ngModel)]="copy.value" name="newValue"></textarea>
       </div>
     </div>
   `,
   styleUrls: ['../app.component.css','./note-detail.component.css'],
})
export class NoteDetailComponent{
  @Input() property: $$.Property;

  original: $$.Property;
  copy: $$.Property;
  toggleLabelList: boolean;
  labels: string[];

  constructor(){
    this.original = new $$.Property();
    this.copy = new $$.Property();
    this.toggleLabelList = false;
  }
  ngOnInit(){
    this.original = this.copy = this.property;
    console.log(this.property)
    console.log(this.original)
  }

  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
  }

  selectingLabel(){ }
  drop(dir){}
  delete(){}
  getLabels(){}
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
