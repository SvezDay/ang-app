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


/* App Root */
import { AppRoutingModule }      from './app-routing.module';
import { AppComponent }          from './app.component';
import { HomeComponent }         from './home/home.component';
import { ProfileComponent }      from './profile/profile.component';
import { AuthModalComponent }    from './share/modals.component';
import { GoogleSigninComponent, SignupComponent }
                                 from './signup/signup.component';

/* Feature Modules */
import { CoreModule }            from './core/core.module';
import { AdminModule }           from './admin/admin.module';
import { RegisterComponent } from './register/register.component';
import { ConnectionComponent } from './connection/connection.component';

// https://github.com/auth0/angular2-jwt
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
     headerPrefix: 'Bearer',
   // noJwtError: true,
   tokenName:'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
};



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AuthModalComponent,
    GoogleSigninComponent,
    SignupComponent,
    RegisterComponent,
    ConnectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    MdlModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    AdminModule,
   //  CourseModule
  ],
  providers: [
      {
        provide: AuthHttp,
        useFactory: authHttpServiceFactory,
        deps: [Http, RequestOptions]
     },
   //   AuthService,
   //   AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
