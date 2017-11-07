import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService  } from '../_core/authentication.service';
import { ApiService } from '../_core/api.service';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../app.component.css','./profile.component.css'],
  providers:[ApiService]
})
export class ProfileComponent implements OnInit {
  private alert_message: "";
  private prop: any;
  private propCopy: any;

  constructor(
    private location: Location,
    private auth: AuthenticationService,
    private api: ApiService,
    private router: Router
  ) {
 }

  ngOnInit():void {
    this.api.query('get', '/user_profile')
    .subscribe( res => {
        this.prop = res.data.data.properties;
        this.propCopy = JSON.parse(JSON.stringify(res.data.data.properties));
      }, error => {
        this.location.back();
      });
  };

  private updateProp(ev:Event, key:string):void{
    if(this.prop[key] != this.propCopy[key]){
      this.api.query('put', '/user_update_properties',
                      {key:key, value:this.propCopy[key]})
      .subscribe( res => {
        this.prop[key] = this.propCopy[key];
      }, err => {
        this.location.back();
      })
    }
  }


}
