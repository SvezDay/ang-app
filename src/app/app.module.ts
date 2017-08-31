/* References:
http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial#fake-backend-ts
https://github.com/mseemann/angular2-mdl
*/


import { BrowserModule }         from '@angular/platform-browser';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MdButtonModule, MdCheckboxModule} from '@angular/material';
// import 'hammerjs';

import {NgbModule}               from '@ng-bootstrap/ng-bootstrap';
import { MdlModule }             from '@angular-mdl/core';

import {
   HttpModule, Http, RequestOptions
}                                from '@angular/http';
import { AuthHttp, AuthConfig }  from 'angular2-jwt';

/* Feature Modules */
import { CoreModule }            from './_core/core.module';

/* App Root */
import { AppRoutingModule }      from './app-routing.module';
import { AppComponent }          from './app.component';
import { AlertComponent }           from './_directives/alert.component';
import { HomeComponent }         from './home/home.component';
import { ProfileComponent }      from './profile/profile.component';
// import { GoogleSigninComponent, SignupComponent }
//                                  from './signup/signup.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';


// // https://github.com/auth0/angular2-jwt
// export function authHttpServiceFactory(http: Http, options: RequestOptions) {
//   return new AuthHttp(new AuthConfig({
//      headerPrefix: 'Bearer',
//    // noJwtError: true,
//    tokenName:'id_token',
//     tokenGetter: (() => localStorage.getItem('id_token')),
//     globalHeaders: [{'Content-Type':'application/json'}],
//   }), http, options);
// };



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    ProfileComponent,
   //  GoogleSigninComponent,
    RegisterComponent,
    AuthenticateComponent,
    NoteComponent,
    NoteListComponent,
    NoteDetailComponent,
    CourseListComponent,
    CourseCreateComponent,
    CourseDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    MdlModule,
    AppRoutingModule,
    CoreModule.forRoot(),
   //  CourseModule
  ],
  providers: [
   //    {
   //      provide: AuthHttp,
   //      useFactory: authHttpServiceFactory,
   //      deps: [Http, RequestOptions]
   //   },
   //   AuthService,
   //   AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
