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
  this.apiService.query('post', '/create_empty_note')
  .subscribe(
    res => {
      this.router.navigate(['/note_detail'],
        {queryParams:{note_id:res.data.data.note_id}}
      );
    },
    err => {
      console.log(err);
    });
 };


 detail(note_id){
    this.router.navigate(['/note_detail'], {queryParams:{note_id: note_id}});
 };


  ngOnInit() {
     this.apiService.query('get', '/get_all_note')
     .subscribe(
        res =>{
           this.list = res.data.list;
        },
        error =>{
          // console.log(error);
          // console.log(error.status);
          error.status == 401 ? this.router.navigate(['/authenticate']) : null

           // this.alertService.error(error);
           // this.loading = false;
          //  this.router.navigate(['/authenticate']);
        }
     )};
 };
