import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from 'src/changePassword/changePassword.component';
import { LoginComponent } from 'src/login/login.component';
import { ResetComponent } from 'src/reset/reset.component';
import { SignupComponent } from 'src/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './Home/home.component';
import { GuardService } from './Services/gaurd.service';

const routes: Routes = [
  {path:'', redirectTo: 'Login ', pathMatch:'full'},
  { path: 'login' , component : LoginComponent },
  { path: 'signup' , component : SignupComponent},
  {path :'home' ,component:HomeComponent ,canActivate:[GuardService]},
  {path :'reset' ,component: ResetComponent},
  {path :'change_Password' ,component: ChangePasswordComponent ,canActivate:[GuardService]},
  { path: '**',component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
