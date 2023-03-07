import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from 'src/changePassword/changePassword.component';
import { LoginComponent } from 'src/login/login.component';
import { ResetComponent } from 'src/reset/reset.component';
import { SignupComponent } from 'src/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './Home/home.component';
import { DeactivateService } from './Services/deactivate.service';

const routes: Routes = [
  {path:'', redirectTo: 'SignUp', pathMatch:'full'},
  { path: 'Login' , component : LoginComponent },
  { path: 'SignUp' , canDeactivate:[DeactivateService], component : SignupComponent },
  {path :'Home' ,component:HomeComponent },
  {path :'Reset' ,component: ResetComponent },
  {path :'change_Password' ,component: ChangePasswordComponent},
  { path: '**',component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
