/* tslint:disable:member-ordering no-unused-variable */
import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';

import { CommonModule }      from '@angular/common';

import { AuthService }       from './auth.service';
// import { AuthGard } from './auth.gard';


@NgModule({
  imports:      [ CommonModule ],
  // declarations: [],
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
         AuthService
      //   {provide: UserServiceConfig, useValue: config }
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
