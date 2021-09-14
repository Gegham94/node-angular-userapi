import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { UsersComponent } from '../components/users/users.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users-api/login' },
  { path: 'users-api/login', component: LoginComponent },
  { path: 'users-api/create', component: RegisterComponent },
  { path: 'users-api/list', component: UsersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }