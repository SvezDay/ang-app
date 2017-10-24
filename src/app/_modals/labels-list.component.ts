import { Component, Input, Output, OnInit }     from '@angular/core';
import { EventEmitter }                         from '@angular/core';

import { Router, ActivatedRoute }               from '@angular/router';
import { ApiService }                           from '../_core/api.service';


class LabelsDataClass {
  initialLabel: string;
  list: string[];
}

@Component({
   moduleId: module.id,
   selector: 'labels-list',
   template: `
    <div class="modal-header">
      <h4 class="modal-title" >
        <span>Label list</span>
      </h4>
      <button type="button" class="close" aria-label="Close" (click)="close('close')" style="cursor: pointer;">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="labelsData?.initialLabel?.length > 0">
        <li *ngFor="let value of labelsData.list" style="display: flex; cursor: pointer" (click)="tryLabel(value)">
          <span style=" width: 50%">{{value}}</span>
        </li>
      </ul>
    </div>
    <div class="modal-footer" style="">
      <button type="button" class="mdl-button mdl-js-button mdl-button--raised" style="position:absolute; right: 5%;">Save</button>
      <button type="button" class="mdl-button mdl-js-button mdl-button--raised" style="position:absolute; left: 5%;">Back</button>
    </div>
  `
})

export class LabelsListComponent implements OnInit {

  @Input() labelsData: LabelsDataClass;
  @Output() notiSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() newLabel: EventEmitter<any> = new EventEmitter<any>();
  constructor(){}

  ngOnInit(){}

  close(mess){
    this.notiSelect.emit(mess)
  }
  tryLabel(label){
    this.newLabel.emit(label)
  }

  // onEmerge(ev){
  //   this.notify.emit(ev);
  // }

};
