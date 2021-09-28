import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AuthGuard } from './_guard/auth.guard';

import { RegisterService } from './services/register.service';
import { LoginService} from './services/login.service';
import { UsersService} from './services/users.service';

import { AppRoutingModule } from './routes/app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/userProfile/userProfile.component';
import { UserEditPopupComponent } from './components/userEditPopup/userEditPopup.component';
import { UserDeletePopupComponent } from './components/userDeletePopup/userDeletePopup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    LogoutComponent,
    UserComponent,
    UserProfileComponent,
    UserProfileComponent,
    UserEditPopupComponent,
    UserDeletePopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule ,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMatFileInputModule,
  ],
  providers: [
    AuthGuard,
    RegisterService,
    LoginService,
    UsersService,
    UserComponent,
    UserProfileComponent,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
