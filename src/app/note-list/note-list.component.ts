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

 detail(note_id){
    this.router.navigate(['/note_detail'], {queryParams:{note_id: note_id}});
 };
 add(){
   this.router.navigate(['/note']);
 };

  ngOnInit() {
     this.noteService.query('get', '/get_all_note')
     .subscribe(
        data =>{
           console.log(data.list);
           this.list = data.list;
        },
        error =>{
           // this.alertService.error(error);
           // this.loading = false;
           this.router.navigate(['/authenticate']);
        }
     )};
 };
