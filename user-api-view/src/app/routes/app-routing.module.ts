import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guard/auth.guard';
import { LoginGuard } from '../_guard/login.guard';

import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { RegisterComponent } from '../components/register/register.component';
import { UsersComponent } from '../components/users/users.component';
import { UserComponent } from '../components/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users-api/login' },
  { path: 'users-api/login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'users-api/register', component: RegisterComponent },
  { path: 'users-api/logout', component: LogoutComponent },
  { path: 'users-api/list', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'users-api/:id', canActivate: [AuthGuard], component: UserComponent },

  // { path: 'projects-api/list', canActivate: [AuthGuard], component: LoginComponent },
  // { path: 'projects-api/create', canActivate: [AuthGuard], component: RegisterComponent },
  // { path: 'projects-api/assign_manager/:id', canActivate: [AuthGuard], component: LogoutComponent },
  // { path: 'projects-api/assign_developer', canActivate: [AuthGuard], component: UsersComponent },
  // { path: 'projects-api/delete/:id', canActivate: [AuthGuard], component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }