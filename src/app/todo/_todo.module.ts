import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TodoComponent } from './todo.component';

const todoRoutes: Routes = [
  {path: 'todo',
    children: [
      {path:'', component:TodoComponent}
    ]
  }
]
const TodoRouting = RouterModule.forChild(todoRoutes);

@NgModule({
  imports: [
    CommonModule,
    // MDBBootstrapModule,
    TodoRouting,
  ],
  declarations: [TodoComponent]
})
export class TodoModule { }
