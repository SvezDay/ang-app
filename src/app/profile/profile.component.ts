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
  alert_message: "";
  prop: any;
  propCopy: any;

  constructor(
    private location: Location,
    private auth: AuthenticationService,
    private api: ApiService,
    private router: Router
  ) {
 }

  ngOnInit() {
    this.api.query('get', '/user_profile')
    .subscribe(
      res => {
        this.prop = res.data.data.properties;
        // this.propCopy = res.data.data.properties;
        Object.assign(this.propCopy, res.data.data.properties)
      },
      error => {
        this.location.back();
      });
  };

  updateProp(key){
    if(this.prop[key] != this.propCopy[key]){
      console.log('check diff')
    }
  }
  clickOutside(e: Event) :void{
    console.log('this.propCopy.subscription_commit_length', this.propCopy.subscription_commit_length)
    console.log('this.prop.subscription_commit_length', this.prop.subscription_commit_length)
    console.log('eee', e)
  }


}
