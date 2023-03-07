import { Component, OnInit } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/Services/registration.service';

@Component({

    standalone : true,
    selector : 'app-reset',
    templateUrl :'./reset.component.html',
    styleUrls :['./reset.component.css'],
    imports :[FormsModule]
})

export class ResetComponent implements OnInit{
    
    email:string='';
    constructor(private service : RegistrationService){}
    ngOnInit(): void {
       this.service.currentuser.subscribe((response)=>{
        this.email=response;
        console.log(response,"fgghfhgm")
       })
    }
    ResetPass(data: NgForm)
    {
        console.log(this.email)
        const pass= data.value['password']
        if(data.value['password'] == data.value['confirmPassword'])
        {
           this.service.changePass(this.email,pass).subscribe((response)=>{
            console.log(response);
           });
        }
        else
        {
            console.log("Please enter same password")
        }
        console.log(data)
    }
}