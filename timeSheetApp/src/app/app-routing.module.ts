import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimeSheetCreateComponent } from './home/time-sheet-create/time-sheet-create.component';
import { CreateEditUserComponent } from './users/create-edit-user/create-edit-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'userCreateEdit', component: CreateEditUserComponent},
  { path: 'userCreateEdit/:id', component: CreateEditUserComponent},
  { path: 'timeSheetCreateEdit', component: TimeSheetCreateComponent},
  { path: 'timeSheetCreateEdit/:id', component: TimeSheetCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
