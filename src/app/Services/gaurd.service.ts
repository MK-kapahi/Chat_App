import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { RegistrationService } from './registration.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(private router: Router , private service: RegistrationService){}
  canActivate():boolean{
  if(!this.service.isLoggedIn()){
    return true;
  }else{
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
