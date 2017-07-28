import { Component, OnInit } from '@angular/core';
import { Router }                      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { NoteService }                 from '../_core/note.service';

@Component({
   moduleId: module.id,
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  providers:[NoteService]
})
export class NoteListComponent implements OnInit {
   list = {};
   loading = false;
  constructor(
     private router: Router,
     private alertService: AlertService,
     private noteService: NoteService
 ) { }

  ngOnInit() {
     this.noteService.getAll()
         .subscribe(
            data =>{
               console.log(data);
               this.list = data;
            },
            error =>{
               this.alertService.error(error);
               this.loading = false;
            }
         )
  }

}
