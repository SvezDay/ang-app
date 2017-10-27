import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }            from './_core/auth.guard';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { RegisterComponent } from './register/register.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';

import { NoteListComponent } from './note-list/note-list.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteComponent } from './note/note.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameRecallComponent } from './game-recall/game-recall.component';
import { GameUpdateComponent } from './game-update/game-update.component';


const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'authenticate', component: AuthenticateComponent },
   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

   { path: 'note', component: NoteComponent, canActivate: [AuthGuard] },

   { path: 'note_list', component: NoteListComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'note_create', component: NoteCreateComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'course_list', component: CourseListComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'course_create', component: CourseCreateComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'course_detail', component: CourseDetailComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'game_list', component: GameListComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'game_recall', component: GameRecallComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'game_update', component: GameUpdateComponent /*, canActivate: [AuthGuard]*/ },

   { path: '**', redirectTo: '', pathMatch: 'full' } // reload another component, in this case, the appComponent - Need to be modified
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
