import { Component } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { RegistrationService } from 'src/app/Services/registration.service';
import { Router } from '@angular/router';

@Component({
    selector : 'app-signup',
    standalone : true,
    templateUrl : './signup.component.html',
    styleUrls :[ './signup.component.css'],
    imports :[ ReactiveFormsModule, CommonModule,FormsModule]
})

export class SignupComponent
{

    
    constructor(private service : RegistrationService, private route : Router ){}
    registrationForm = new FormGroup({
        firstName : new FormControl('',Validators.required),
        lastName : new FormControl('',Validators.required),
        email : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        mobileNo : new FormControl('',[Validators.required , Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        dateOfBirth : new FormControl('',[Validators.required]),
        password : new FormControl('',[Validators.minLength(8)])
    })

    resgisterUser()
    {
        console.log(this.registrationForm.value);
        this.service.registerUser(this.registrationForm.value).subscribe((result:any)=>{
           alert(result.message)
           if(result.message)
           {
            this.route.navigateByUrl('/Home')
           }
        })
    }

    get controls()
    {
        return this.registrationForm.controls;
    }

    Go_To_login()
    {
        this.route.navigateByUrl('/Login')
    }

    canexit()
    {
         
        if(this.registrationForm.value)
        {
            return confirm(" Do you want to save the changes ")
        }

        else
        {
            return false;
        }
    }
}