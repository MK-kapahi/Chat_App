import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { RegistrationService } from '../Services/registration.service';

@Component({
    selector:'app-home',
    templateUrl :'./home.component.html',
    styleUrls :['./home.component.css']
})

export class HomeComponent 
{
    constructor(private route: Router , private service : RegistrationService){}
    ChangePass()
    {
        this.route.navigateByUrl('/change_Password');
    }

    logout()
    {
        this.service.logout().subscribe((response)=>{
            console.log(response);
        })
        this.route.navigateByUrl("/login");
        //this.service.SignOut()
    }

    get()
    {
        this.service.userget().subscribe((value)=>{
            console.log(value);
        })
    }
}