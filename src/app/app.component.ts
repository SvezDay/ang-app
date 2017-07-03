import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';
import { AuthenticationService } from './_core/authentication.service';

declare var componentHandler: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit{
   dialog = document.querySelector('dialog');
   showModalButton = document.querySelector('.show-modal');

   constructor(
      public auth: AuthenticationService,
      public router: Router
   ){
   }
   logout(){
      this.auth.logout();
      this.router.navigate(['/home']);
   }

   ngOnInit(){
   
   }

}
