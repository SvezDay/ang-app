import { Component, OnInit, AfterViewInit  }     from '@angular/core';
import { Router }                from '@angular/router';
import { AuthenticationService } from './_core/authentication.service';
import { UserService }           from './_core/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService, UserService]
})
export class AppComponent implements OnInit, AfterViewInit {
  big_footer: any;

   constructor(
      public auth: AuthenticationService,
      public users : UserService,
      public router: Router
   ){ }

   ngOnInit(){
     this.big_footer = false;
     console.log( 'this.auth.test()', this.auth.test() )
   };

    ngAfterViewInit(){
      console.log('after view init')
    };


   logout(){
      this.auth.logout();
      this.router.navigate(['/home']);
   };


}
