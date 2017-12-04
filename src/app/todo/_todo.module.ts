import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }           from '@angular/forms';

import { MdlModule }             from '@angular-mdl/core';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TodoComponent } from './todo.component';
import { AuthGuard }            from '../_core/auth.guard';

const todoRoutes: Routes = [
  {path: 'todo',
    children: [
      {path:'', component:TodoComponent, canActivate:[AuthGuard]}
    ]
  }
]
const TodoRouting = RouterModule.forChild(todoRoutes);

@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    FormsModule,
    // MDBBootstrapModule,
    TodoRouting,
  ],
  declarations: [TodoComponent]
})
export class TodoModule { }
