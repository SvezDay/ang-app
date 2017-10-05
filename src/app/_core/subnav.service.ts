import { Injectable }                 from '@angular/core';
import { Http, Headers, RequestOptions, Response }
                                      from '@angular/http';
import { Subject }                    from 'rxjs/Subject';

@Injectable()
export class SubnavService {

  private caseNumber = new Subject<string>();
  constructor(){}


  // Observable string streams
  caseNumber$ = this.caseNumber.asObservable();

    // Service message commands
  publishData(data: string) {
    this.caseNumber.next(data);
  };



};
