import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';
import { AuthenticationService } from './_core/authentication.service';
import { UserService }           from './_core/user.service';

declare var componentHandler: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService, UserService]
})
export class AppComponent implements OnInit{
   dialog = document.querySelector('dialog');
   showModalButton = document.querySelector('.show-modal');

   constructor(
      public auth: AuthenticationService,
      public users : UserService,
      public router: Router

   ){
   }
   logout(){
      this.auth.logout();
      this.router.navigate(['/home']);
   }

   ngOnInit(){

   }
   test(){
      this.auth.test()
      .subscribe(
          data => {
             console.log(data);
          },
          error => {
             console.log(error);
          });
   }
   usering(){
      this.users.getAll()
      .subscribe(
          data => {
             console.log(data);
          },
          error => {
             console.log(error);
          });
   }

}
