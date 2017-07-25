import {
   Component, OnInit, ElementRef, AfterViewInit
}                             from '@angular/core';
// import { AuthService }        from '../core/auth.service';

declare const gapi: any;
@Component({
  selector: 'google-signin',
  template:
  // '<button class="g-signin2" id="googleBtn">Google Sign-In</button>'
  '<div class="g-signin2" data-onsuccess="onSignIn"></div>'
  // '<div id="my-signin2"></div>'
})
// export 
class GoogleSigninComponent implements AfterViewInit {

  private clientId:string = '1035538165681-3k64kc83gcn12hibjcmp4rtqtl75isn6.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}

@Component({
   moduleId: module.id,
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  // providers: [AuthService]
})
export class SignupComponent implements OnInit{
   public cred = {email: "", password: ""};
   // constructor(public auth: AuthService){
   //    // auth.handleAuthentication();
   // }
   // public login(){
   //    this.auth.login(this.cred);
   // }

   ngOnInit(){
   }
}
// <h1>Hello</h1>
// <div id="modal1" class="modal">
//  <div class="modal-content">
//  <div class="g-signin2" data-onsuccess="onSignIn"></div>
//    <h4>Modal Header</h4>
//    <p>A bunch of text</p>
//  </div>
//  <div class="modal-footer">
//    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
//  </div>
// </div>
// <script type="text/javascript">
//
// $('.modal').modal({
//    dismissible: true,
//    opacity: .5,
//    inDuration: 300,
//    outDuration: 200,
//    startingTop: '4%',
//    endingTop: '10%',
//    ready: function(modal, trigger) {
//      alert("Ready");
//      console.log(modal, trigger);
//    },
//    complete: function() {
//       alert('Closed');
//    }
// });
// </script>
