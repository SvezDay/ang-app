import { Component, OnInit }          from '@angular/core';
import { Router }                     from '@angular/router';
import { AuthenticationService  }     from '../_core/authentication.service';
import { ApiService }                 from '../_core/api.service';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ApiService]
})
export class ProfileComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private api: ApiService,
    private router: Router
  ) {
 }

  ngOnInit() {
    this.api.query('get', '/user_profile')
    .subscribe(
      res => {
        console.log(res)
      },
      error => {
        error.status == 401 ? this.router.navigate(['/authenticate']) : null
      });
  };


}
