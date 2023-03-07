import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from 'src/signup/signup.component';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationService } from './Services/registration.service';
import { LoginComponent } from 'src/login/login.component';
import { HomeComponent } from './Home/home.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignupComponent,
    ReactiveFormsModule,
    HttpClientModule,
    LoginComponent
  ],
  providers: [RegistrationService,MdbModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
