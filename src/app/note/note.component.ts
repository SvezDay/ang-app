import { Component, OnInit }           from '@angular/core';
import { Router }                      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { NoteService }                 from '../_core/note.service';

@Component({
   moduleId: module.id,
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers:[NoteService]
})
export class NoteComponent implements OnInit {
   content = "";
   loading = false;

  constructor(
     private router: Router,
     private noteService: NoteService,
     private alertService: AlertService,
  ) { }

  create(){
     let info = {
        content: this.content,
        user_id: localStorage.getItem('user_id')
     };
     this.noteService.create(info)
         .subscribe(
            data =>{
               this.alertService.success('Registration successful', true);
               // Then the navigation gone to the note get by id
               this.router.navigate(['/note']);
            },
            error =>{
               this.alertService.error(error);
               this.loading = false;
            }
         )
 }

  ngOnInit() {
  }

}
