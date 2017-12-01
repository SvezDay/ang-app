import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }            from './_core/auth.guard';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { RegisterComponent } from './register/register.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';

import { NoteComponent } from './note/note.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'authenticate', component: AuthenticateComponent },
   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
   { path: 'note', component: NoteComponent, canActivate: [AuthGuard] },
   // { path: 'todo', component: NoteComponent, canActivate: [AuthGuard] },

   { path: '**', redirectTo: '', pathMatch: 'full' } // reload another component, in this case, the appComponent - Need to be modified
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
