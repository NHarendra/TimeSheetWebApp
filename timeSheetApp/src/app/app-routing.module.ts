import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditUserComponent } from './user/create-edit-user/create-edit-user.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: 'users', component: UserComponent},
  { path: 'createEditUser', component: CreateEditUserComponent},
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
