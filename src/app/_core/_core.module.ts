/* tslint:disable:member-ordering no-unused-variable */
import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }              from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { CommonModule }             from '@angular/common';

import { AuthenticationService }    from './authentication.service';
import { AuthGuard }                 from './auth.guard';
import { AlertComponent }           from '../_directives/alert.component';
import { AlertService }             from './alert.service';

@NgModule({
  imports: [
     CommonModule,
     FormsModule,
  ],
  declarations: [],
  // exports:      [],
  providers:    [ ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthenticationService,
        AlertService,
      ]
    };
  }
}

// import { NgModule } from '@angular/core';
// import { Http, RequestOptions } from '@angular/http';
// import { AuthHttp, AuthConfig } from 'angular2-jwt';
//
// export function authHttpServiceFactory(http: Http, options: RequestOptions) {
//   return new AuthHttp(new AuthConfig({
//     tokenName: 'token',
// 		tokenGetter: (() => sessionStorage.getItem('token')),
// 		globalHeaders: [{'Content-Type':'application/json'}],
// 	}), http, options);
// }
//
// @NgModule({
//   providers: [
//     {
//       provide: AuthHttp,
//       useFactory: authHttpServiceFactory,
//       deps: [Http, RequestOptions]
//     }
//   ]
// })
// export class AuthModule {}
