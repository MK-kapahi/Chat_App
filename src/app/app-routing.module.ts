import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from 'src/changePassword/changePassword.component';
import { LoginComponent } from 'src/login/login.component';
import { ResetComponent } from 'src/reset/reset.component';
import { SignupComponent } from 'src/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './Home/home.component';
import { GuardService } from './Services/gaurd.service';
import { InterceptorService } from './Services/interceptor.service';
import { ProfilePageComponent } from './ProfilePage/profilePage.component';

const routes: Routes = [
  {path:'',  pathMatch:'full' , redirectTo: 'login'},
  { path: 'login' , component : LoginComponent ,canActivate:[GuardService]},
  { path: 'signup' , component : SignupComponent ,canActivate:[GuardService] },
  {path :'home' ,component:HomeComponent ,canActivate:[GuardService]},
  {path :'reset' ,component: ResetComponent},
  {path :'change_Password' ,component: ChangePasswordComponent,canActivate:[GuardService]},
  {path :'profile' ,component: ProfilePageComponent ,canActivate:[GuardService]},
  { path: '**',component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers :[{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}]
})
export class AppRoutingModule { }
