import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/Services/registration.service';

@Component({

    standalone : true,
    selector : 'app-reset',
    templateUrl :'./reset.component.html',
    styleUrls :['./reset.component.css'],
    imports :[FormsModule, ReactiveFormsModule,CommonModule]
})

export class ResetComponent implements OnInit{
    
    passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control'
    email:string='';
    constructor(private service : RegistrationService){}
    ngOnInit(): void {
       this.service.currentuser.subscribe((response)=>{
        this.email=response;
        console.log(response,"fgghfhgm")
       })
    }

    resetPasswordForm = new FormGroup({
        password: new FormControl('',[Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
        confirmPassword : new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
    })
    ResetPass(data: FormGroup)
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

    get fControls()
    {
        return this.resetPasswordForm.controls
    }

    checkPasswords(pw: string, cpw: string) {
        this.isConfirmPasswordDirty = true;
        if (pw == cpw) {
          this.passwordsMatching = true;
          this.confirmPasswordClass = 'form-control is-valid';
        } else {
          this.passwordsMatching = false;
          this.confirmPasswordClass = 'form-control is-invalid';
        }
      }
}