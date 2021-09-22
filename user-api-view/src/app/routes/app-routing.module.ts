import { NgModule } from '@angular/core';

import { AuthGuard } from '../_guard/auth.guard';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { RegisterComponent } from '../components/register/register.component';
import { UsersComponent } from '../components/users/users.component';
import { UserComponent } from '../components/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users-api/login' },
  { path: 'users-api/login', component: LoginComponent },
  { path: 'users-api/logout', component: LogoutComponent },
  { path: 'users-api/create', component: RegisterComponent },
  { path: 'users-api/list', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'users-api/:id', canActivate: [AuthGuard], component: UserComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }