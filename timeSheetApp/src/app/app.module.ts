import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { CreateEditUserComponent } from './users/create-edit-user/create-edit-user.component';
import { TimeSheetCreateComponent } from './home/time-sheet-create/time-sheet-create.component';
import { RoleComponent } from './role/role.component';
import { CreateEditRoleComponent } from './role/create-edit-role/create-edit-role.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    HomeComponent,
    CreateEditUserComponent,
    TimeSheetCreateComponent,
    RoleComponent,
    CreateEditRoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
