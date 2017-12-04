import { Component, OnInit } from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { ApiService } from '../_core/api.service';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  moduleId: module.id,
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['../app.component.css','./todo.component.css'],
  providers:[ApiService]
})
export class TodoComponent implements OnInit {
  alert_message: any;
  todo_list = [];
  today_list = [];
  valid_list = [];
  selected: any; //task
  new: string = "";
  task: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.query('get', '/todo_list').subscribe(
    res => {
      this.todo_list = res.data.data.todo;
      this.today_list = res.data.data.today;
      this.valid_list = res.data.data.valid;
      console.log(res.data.data.todo)
    }, err => {
      console.log(err)
    })
  }

  createTask() : any {
    this.api.query('post', '/todo_create_task', {value:this.new})
    .subscribe(res=>{
      this.todo_list.unshift(res.data.data[0])
    }, err=>{console.log(err)})
  }
  delete(item:any):void{
    this.api.query('delete', `/todo_delete_task/${item.identity}`)
    .subscribe(res=>{
      if(res.response.status == 200){
        console.log(item)
        if(item.properties.status == 'close'){
          this.valid_list = this.valid_list.filter(x => {
            return x.identity != item.identity;
          });
        }else{
          this.todo_list = this.todo_list.filter(x => {
            return x.identity != item.identity;
          });
        }
      }
    }, err=>{console.log(err)})
  }
  toggle(item?:any ):void{
    item ? this.selected = item : this.selected = {}
  }
  getIndex(id, list){
    let index;
    list.some( (obj, idx) => {
      if (obj.identity == id) {
        index = idx;
        return true;
      }
    });
    return index;
  }
  addForToday(item:any):void{
    this.api.query('post', '/todo_task_for_today', {id:item.identity})
    .subscribe(res=>{
      let idx = this.getIndex(item.identity, this.todo_list);
      this.todo_list.splice(idx, 1);
      this.today_list.unshift(item);
      this.toggle();
    }, err=>{console.log(err)})
  }
  addForLater(item:any):void{
    this.api.query('post', '/todo_task_for_later', {id:item.identity})
    .subscribe(res=>{
      let idx = this.getIndex(item.identity, this.today_list);
      this.today_list.splice(idx, 1);
      this.todo_list.unshift(item);
    }, err=>{console.log(err)})
  }
  editMode(item:any):any{
    this.task = item;
  }
  modify(str:string):any{
    // Check if changed
    if(str == this.task.properties.value){
      this.task = {};
      this.toggle();
    }else{
      this.task.properties.value = str;
      this.api.query('post', '/todo_update_task', this.task)
      .subscribe(res=>{
        let idx = this.getIndex(this.task.identity, this.todo_list);
        this.todo_list[idx].properties.value = this.task.properties.value;
        this.task = {};
        this.toggle();

      }, err=>{ console.log(err) })
    }
  }
  close(item:any):void{
    this.api.query('post', '/todo_close_task', {id:item.identity})
    .subscribe(res=>{
      item.properties.status = 'close';
      let idx = this.getIndex(item.identity, this.today_list);
      this.today_list.splice(idx, 1);
      this.valid_list.unshift(item);
    }, err=>{console.log(err)})
  }
  reopen(item:any):void{
    this.api.query('post', '/todo_reopen_task', {id:item.identity})
    .subscribe(res=>{
      let idx = this.getIndex(item.identity, this.today_list);
      this.valid_list.splice(idx, 1);
      this.today_list.unshift(item);
    }, err=>{console.log(err)})
  }
}
