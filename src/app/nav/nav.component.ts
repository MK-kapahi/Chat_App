import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { RegistrationService } from "../Services/registration.service";

@Component({
    selector :'app-navbar',
    templateUrl :'./nav.component.html',
    styleUrls : ['nav.component.css']
})

export class NavComponent
{
    @Input() currentUser :string ='';
    constructor(private service : RegistrationService ,private route : Router){}
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
        this.service.SignOut()
    }

    Update()
    {
        this.route.navigateByUrl("/profile");
    }
}
