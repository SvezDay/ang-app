import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../core/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   profile: any;

  // constructor(public auth: AuthService) { }

  ngOnInit() {
    // if (this.auth.userProfile) {
    //   this.profile = this.auth.userProfile;
    // } else {
    //   this.auth.getProfile((err, profile) => {
    //      console.log(profile);
    //     this.profile = profile;
    //   });
    // }
  }

}
