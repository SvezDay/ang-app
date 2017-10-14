import { Component, OnInit } from '@angular/core';
import { Router }                      from '@angular/router';

import { ApiService }                 from '../_core/api.service';
import { ContainerService }           from '../_core/container.service';

@Component({
   moduleId: module.id,
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['../app.component.css','./note-list.component.css'],
  providers:[ApiService, ContainerService]
})
export class NoteListComponent implements OnInit {
   list = [];
   loading = false;

   perso_account = false;
   path = [];
   mainlist = [];
   sublist = [];


  constructor(
     private router: Router,
     private api: ApiService,
     private contservice: ContainerService
 ) { }

 ngOnInit() {
   this.api.query('get', '/get_all_note')
   .subscribe(
     res =>{
       this.list = res.data.list;
     },
     error =>{
       error.status == 401 ? this.router.navigate(['/authenticate']) : null
       console.log(error.status);
       console.log(error);
     })
 };

 get_container(direction, cont?){
   cont ? null : cont = null;
   this.contservice.get_containers(direction, cont)
   .subscribe(res => {

   }, err =>{

   });
 };

 add(){
  this.api.query('post', '/create_empty_note')
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


 };
