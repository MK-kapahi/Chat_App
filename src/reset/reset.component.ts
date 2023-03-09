import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/registration.service';

@Component({

    standalone : true,
    selector : 'app-reset',
    templateUrl :'./reset.component.html',
    styleUrls :['./reset.component.css'],
    imports :[FormsModule, ReactiveFormsModule,CommonModule,MatIconModule]
})

export class ResetComponent implements OnInit{
    
  showPassword: boolean = true;
    passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control'
  Token : string='';
    email:string='';
    constructor(private service : RegistrationService ,private activeRoute : ActivatedRoute,private route : Router){}
    ngOnInit(): void {
      this.service.currentuser.subscribe((response)=>{
        this.email=response;
        console.log(response);
       })

       this.activeRoute.queryParams.subscribe((val)=>{
        this.Token=val['token'];
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
        console.log(pass);
           this.service.ResetPassword(this.email,pass).subscribe((response)=>{
            console.log(response);
           });
            console.log("Please enter same password")
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

      public togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
      }
}