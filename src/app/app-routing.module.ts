import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { SignupComponent } from './signup/signup.component';
// import { CourseComponent } from './course/course/course.component';
// import { AddCourseComponent } from './course/add_course/add_course.component';

// import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
   { path: '', component: HomeComponent /*, canActivate: [AuthGuard] */ },
   { path: 'admin', component: AdminComponent /*, canActivate: [AuthGuard]*/ },
   { path: 'profile', component: ProfileComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'signup', component: SignupComponent  /*, canActivate: [AuthGuard]*/   },
   { path: 'course', loadChildren: 'app/course/course.module#CourseModule' },
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
