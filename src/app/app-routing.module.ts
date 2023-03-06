import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/login/login.component';
import { SignupComponent } from 'src/signup/signup.component';

const routes: Routes = [
  { path: 'Login' , component : LoginComponent },
  { path: 'SignUp' , component : SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
