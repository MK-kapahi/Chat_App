import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/login/login.component';
import { SignupComponent } from 'src/signup/signup.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path:'', redirectTo: 'SignUp', pathMatch:'full'},
  { path: 'Login' , component : LoginComponent },
  { path: 'SignUp' , component : SignupComponent },
  { path: '**',component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
