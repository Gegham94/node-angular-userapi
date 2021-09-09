import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users/login' },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/create', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }