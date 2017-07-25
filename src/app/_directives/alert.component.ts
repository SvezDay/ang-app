import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../_core/alert.service';

@Component({
    moduleId: module.id,
    selector: 'alert',
    template: `
    <div class="mdl-grid">
       <div
          *ngIf="message" [ngClass]="{ 'alert': message,
          'mdl-cell mdl-cell--12-col graybox': message.type === 'success',
          'mdl-cell mdl-cell--12-col': message.type === 'error'
       }">
          {{message.text._body}}
       </div>
   </div>
    `
})

export class AlertComponent implements OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) {
        // subscribe to alert messages

        this.subscription = alertService.getMessage().subscribe(message => {
           console.log(message);
           this.message = message;
        });
    }

    ngOnDestroy(): void {
        // unsubscribe on destroy to prevent memory leaks
        this.subscription.unsubscribe();
    }
}
