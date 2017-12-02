import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['../app.component.css','./todo.component.css']
})
export class TodoComponent implements OnInit {
  alert_message: any;
  constructor() { }

  ngOnInit() {
  }

  createTask(){}
  addForToday(){}

}
