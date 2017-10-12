import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ngbd-alert-basic',
  template: `
  <p>
    <ngb-alert [dismissible]="false">
        <strong>Warning!</strong> Better check yourself, you're not looking too good.
    </ngb-alert>
  </p>`
})
export class NgbdAlertBasic {}
