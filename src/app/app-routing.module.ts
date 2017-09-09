import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
// import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameRecallComponent } from './game-recall/game-recall.component';
import { GameUpdateComponent } from './game-update/game-update.component';
// import { CourseComponent } from './course/course/course.component';
// import { AddCourseComponent } from './course/add_course/add_course.component';

// import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
   { path: '', component: HomeComponent /*, canActivate: [AuthGuard] */ },
   { path: 'profile', component: ProfileComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'register', component: RegisterComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'authenticate', component: AuthenticateComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'note', component: NoteComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'note_list', component: NoteListComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'note_detail', component: NoteDetailComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'course_list', component: CourseListComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'course_create', component: CourseCreateComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'course_detail', component: CourseDetailComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'game_list', component: GameListComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'game_recall', component: GameRecallComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'game_update', component: GameUpdateComponent /*, canActivate: [AuthGuard]*/ },
  //  { path: 'course', loadChildren: 'app/course/course.module#CourseModule' },s
   // {
   //   path: 'sign-in',
   //  component: AdminComponent,
   // //  canActivate: [AuthGuard]
   // },
   // {
   //   path: 'course',
   // //  canActivate: [AuthGuard]
   // },
   // {
   //   path: 'add_course',
   //  component: AddCourseComponent
   // //  canActivate: [AuthGuard]
   // },
   { path: '**', redirectTo: '', pathMatch: 'full' } // reload another component, in this case, the appComponent - Need to be modified
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
