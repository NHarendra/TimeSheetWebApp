import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimeSheetCreateComponent } from './home/time-sheet-create/time-sheet-create.component';
import { CreateEditRoleComponent } from './role/create-edit-role/create-edit-role.component';
import { RoleComponent } from './role/role.component';
import { CreateEditUserComponent } from './users/create-edit-user/create-edit-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'createEditUser', component: CreateEditUserComponent},
  { path: 'timeSheetCreate', component: TimeSheetCreateComponent},
  { path: 'timeSheetCreate/:id', component: TimeSheetCreateComponent},
  { path: 'roles', component: RoleComponent},
  { path: 'createEditRole', component: CreateEditRoleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
