import { Component, Output } from '@angular/core'
import { Router } from '@angular/router';
import { RegistrationService } from '../Services/registration.service';

@Component({
    selector:'app-home',
    templateUrl :'./home.component.html',
    styleUrls :['./home.component.css']
})

export class HomeComponent 
{

    selectedUserdata :any=[]
    userArray :any=[];
    showUser : boolean = false;
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
        this.service.SignOut()
    }
    getUser(event:any)
    {
        
        const val = event.target.value;
        if(val.length != null)
        {
            this.service.usergetMatch(val).subscribe((response :any)=>{
                const obj= response['data'];
                this.userArray = obj;
                console.log(this.userArray)
            })
        }

        
           this.service.userGet().subscribe((response)=>{
            console.log(response);
           });

        this.showUser=true;
    }


    getUserMessage(event:any)
    {
        this.selectedUserdata=event;
        console.log(this.selectedUserdata['firstName'])
    }
}