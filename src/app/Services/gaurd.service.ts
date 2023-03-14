import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Route, Router } from '@angular/router';
import { RegistrationService } from './registration.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(private router: Router , private service: RegistrationService){}

  canActivate(route: ActivatedRouteSnapshot):boolean{
    const { routeConfig } = route;
    const { path } = routeConfig as Route;
  if (path?.includes('home') && this.service.isLoggedIn()) {

    return false;
  }
  if ((path?.includes('signup') || path?.includes('login')) && !this.service.isLoggedIn()) {

    this.router.navigate(['home']);
    return true;
  }
  if ((path?.includes('signup') || path?.includes('login')) && this.service.isLoggedIn()) {

    return true;

  }

  if( !this.service.isLoggedIn())
  {
    return true;
  }
  this.router.navigateByUrl('/login')
  return false;
}
  
}
