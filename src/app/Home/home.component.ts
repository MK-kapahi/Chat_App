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
       this.service.SignOut();
       this.route.navigateByUrl("/Login")
    }

    get()
    {
        this.service.userget().subscribe((value)=>{
            console.log(value);
        })
    }
}