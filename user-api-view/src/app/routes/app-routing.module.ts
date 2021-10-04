import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guard/auth.guard';
import { LoginGuard } from '../_guard/login.guard';

import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { RegisterComponent } from '../components/register/register.component';
import { UsersComponent } from '../components/users/users.component';
import { UserComponent } from '../components/user/user.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { CreateProjectComponent } from '../components/createProject/createProject.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users-api/login' },
  { path: 'users-api/login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'users-api/register', component: RegisterComponent },
  { path: 'users-api/logout', component: LogoutComponent },
  { path: 'users-api/list', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'users-api/:id', canActivate: [AuthGuard], component: UserComponent },

  { path: 'projects-api/list', canActivate: [AuthGuard], component: ProjectsComponent },
  { path: 'projects-api/create', canActivate: [AuthGuard], component: CreateProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }