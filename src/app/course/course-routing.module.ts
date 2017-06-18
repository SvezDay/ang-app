import { NgModule }            from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { BoardCourseComponent }    from './board_course/board_course.component';
import { AddCourseComponent }    from './add_course/add_course.component';

const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full'},
  { path: 'board',    component: BoardCourseComponent },
  { path: 'add',    component: AddCourseComponent },
  // { path: ':id', component: CrisisDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}
