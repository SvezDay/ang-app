import { Component, OnInit } from '@angular/core';
import { Router }                      from '@angular/router';

import { ApiService }                 from '../_core/api.service';

@Component({
   moduleId: module.id,
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  providers:[ApiService]
})
export class NoteListComponent implements OnInit {
   list = [];
   loading = false;


  constructor(
     private router: Router,
     private apiService: ApiService
 ) { }


 add(){
   this.router.navigate(['/note_create']);
 };


 detail(note_id){
    this.router.navigate(['/note_detail'], {queryParams:{note_id: note_id}});
 };


  ngOnInit() {
     this.apiService.query('get', '/get_all_note')
     .subscribe(
        response =>{
           this.list = response.data;
        },
        error =>{
          console.log(error);

           // this.alertService.error(error);
           // this.loading = false;
          //  this.router.navigate(['/authenticate']);
        }
     )};
 };
