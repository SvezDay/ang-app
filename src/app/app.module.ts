/* References:
http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial#fake-backend-ts
https://github.com/mseemann/angular2-mdl
*/


import { BrowserModule }         from '@angular/platform-browser';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {AnimationsModule}        from '@angular/animations';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { HttpModule, Http, RequestOptions
                               } from '@angular/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot
                               } from '@angular/router';

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MdButtonModule, MdCheckboxModule} from '@angular/material';
// import 'hammerjs';

import {NgbModule}               from '@ng-bootstrap/ng-bootstrap';
import { MdlModule }             from '@angular-mdl/core';
// import {FocusModule}             from 'angular2-focus';
import { ClickOutsideModule }    from 'ng-click-outside';


import { AuthHttp, AuthConfig }  from 'angular2-jwt';
import {Autosize}                from 'angular2-autosize/src/autosize.directive';

/* Feature Modules */
import { CoreModule }            from './_core/_core.module';
import { AuthGuard }             from './_core/auth.guard';
import { SubnavComponent }       from './_directives/subnav.component';
import { TreeViewComponent }     from './_directives/tree-view.component';
import { FileUploadComponent }   from './_directives/file-upload.component';
import { LabelsListComponent }   from './_modals/labels-list.component';
import { TruncatePipe }          from './_pipes/truncate.pipe';

/* App Root */
import { AppRoutingModule }      from './app-routing.module';
import { AppComponent }          from './app.component';

import { HomeComponent }         from './home/home.component';
import { ProfileComponent }      from './profile/profile.component';


import { RegisterComponent }     from './register/register.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { NoteComponent }         from './note/note.component';
import { NoteDetailComponent }   from './note-detail/note-detail.component';

import { NgbdAlertBasic }        from './alert-basic';

@NgModule({
  declarations: [

    Autosize,
    AppComponent,
    SubnavComponent,
    TreeViewComponent,
    LabelsListComponent,
    TruncatePipe,
    FileUploadComponent,

    HomeComponent,
    RegisterComponent,
    AuthenticateComponent,
    ProfileComponent,

    NoteComponent,
    NoteDetailComponent,

    NgbdAlertBasic,
  ],
  // exports: [ClickOutside],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    MdlModule,
    CoreModule.forRoot(),
    // FocusModule.forRoot(),
    NgbModule.forRoot(),
    ClickOutsideModule
  ],
  providers: [
   //    {
   //      provide: AuthHttp,
   //      useFactory: authHttpServiceFactory,
   //      deps: [Http, RequestOptions]
   //   },
   //   AuthService,
   AuthGuard
    //  {
    //    provide: "AuthGuard",
    //    useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    //    return true
    //  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
