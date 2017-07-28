import { Component, OnInit }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { NoteService }                 from '../_core/note.service';

@Component({
   moduleId: module.id,
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
  providers:[NoteService]
})
export class NoteDetailComponent implements OnInit {
   sub:any;
   note_id:Number;
   loading = false;
  constructor(
     private route: ActivatedRoute,
     private router: Router,
     private alertService: AlertService,
     private noteService: NoteService
 ) { }

  ngOnInit() {
     this.route
     .queryParams
     .subscribe(params=>{
        this.note_id = params.note_id;
     });
     this.noteService.getDetail(this.note_id)
     .subscribe(
        data =>{
           console.log(data);
        },
        error =>{
           this.alertService.error(error);
           this.loading = false;
        }
     );
  }

}
