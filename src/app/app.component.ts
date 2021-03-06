import { Component, OnInit, AfterViewInit  }     from '@angular/core';
import { Router }                from '@angular/router';
import { AuthenticationService } from './_core/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit, AfterViewInit {
  big_footer: any;

   constructor(
      public auth: AuthenticationService,
      public router: Router
   ){ }

   ngOnInit(){
     this.big_footer = false;
   };

    ngAfterViewInit(){
      console.log('after view init')
    };


   logout(){
      this.auth.logout();
      this.router.navigate(['/home']);
   };


}
