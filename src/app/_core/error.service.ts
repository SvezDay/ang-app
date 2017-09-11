import {Injectable}         from '@angular/core';
import {Router}             from '@angular/router';
import {Location}           from '@angular/common';


@Injectable()
export class ErrorService {

  constructor(
    private router: Router,
    private location: Location
  ){};

  handler(error){
    if(error.status ==  401){   // Unauthorized aka old token
      this.router.navigate(['/authenticate']);
    }else {
      this.location.back();
    };
  };

};
