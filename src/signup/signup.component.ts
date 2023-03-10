import { Component } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { RegistrationService } from 'src/app/Services/registration.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector : 'app-signup',
    standalone : true,
    templateUrl : './signup.component.html',
    styleUrls :[ './signup.component.css'],
    imports :[ ReactiveFormsModule, CommonModule,FormsModule,MatIconModule]
})

export class SignupComponent
{
  
    showPassword: boolean = true;
    message:string='';
    messageShow:boolean =false;  
    constructor(private service : RegistrationService, private route : Router ){}
    registrationForm = new FormGroup({
        firstName : new FormControl(null,Validators.required),
        lastName : new FormControl(null,Validators.required),
        email : new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        PhoneNo : new FormControl(null,[Validators.required , Validators.pattern("^[6-9]\\d{9}$")]),
        dateOfBirth : new FormControl(null,[Validators.required]),
        password : new FormControl(null,[Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
    })

    resgisterUser()
    {
        console.log(this.registrationForm.value);
        this.service.registerUser(this.registrationForm.value).subscribe((result:any)=>{
            this.messageShow=true;
           console.log(result)
           if(result.isSuccess)
           {
            this.message= "Sign Up successful";
            alert(this.message);
            this.service.registerToken(result.data['token']);
            this.route.navigateByUrl('/home')
           }

           else
           {
            this.message= result.message;
           }
        })
    }

    get controls()
    {
        return this.registrationForm.controls;
    }

    Go_To_login()
    {
        this.route.navigateByUrl('/login')
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

    public togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
      }
}