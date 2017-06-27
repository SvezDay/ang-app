import { Component, OnInit
}                          from '@angular/core';
import { AuthService }     from './core/auth.service';

declare var componentHandler: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit{
   constructor(public auth: AuthService){
      // auth.handleAuthentication();
   }
   ngOnInit(){
      console.log(this.auth.isAuthenticated());
   }

}
