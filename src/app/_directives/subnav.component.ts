import { Component, OnInit }          from '@angular/core';
import { Router, ActivatedRoute }     from '@angular/router';
import { SubnavService }                 from '../_core/subnav.service';

// <a class="my-subnav-a" (click)="back()">
// <i class="material-icons my-subnav-i">arrow_back</i>
// <span class="my-subnav-span">Back</span>
// </a>
// <a style="display:grid; color:white; cursor:pointer; min-width:8%; margin: 0 5px;" (click)="addon()">
// <i class="material-icons" style="text-align:center;">add</i>
// <span style="text-align:center;">Add item</span>
// </a>
// <a style="display:grid; color:white; cursor:pointer; min-width:8%; margin: 0 5px;" (click)="delete()">
// <i class="material-icons" style="text-align:center;">delete</i>
// <span style="text-align:center;">delete</span>
// </a>

@Component({
  moduleId: module.id,
  selector: 'subnav',
  // templateUrl: './subnav.component.html',
  template:`
  <mdl-layout-header class="mdl-shadow--2dp my-subnav-layout" *ngIf="!alert_message">
      <mdl-layout-header-row class="my-subnav-layout-row">

      </mdl-layout-header-row>
   </mdl-layout-header>

   <mdl-layout-header class="mdl-shadow--2dp" style="background-color: green" *ngIf="alert_message">
     <mdl-layout-header-row style="justify-content: center;" >
       {{alert_message}}
     </mdl-layout-header-row>
    </mdl-layout-header>
  `,
  styleUrls: ['./subnav.component.css'],
  providers: [SubnavService]
})
export class SubnavComponent implements OnInit {
  alert_message: String;
  action_list: any;

  constructor(
    private subnavService: SubnavService,
    private router: Router
  ) { }



  ngOnInit(){

  }
}
