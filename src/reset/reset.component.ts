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
    constructor(private service : RegistrationService ,private activeRoute : ActivatedRoute,private route : Router){}
    ngOnInit(): void {
       this.activeRoute.queryParams.subscribe((val)=>{
        this.Token=val['token'];
        this.service.registerToken(val['token']);
       })
    }

    resetPasswordForm = new FormGroup({
        password: new FormControl('',[Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
        confirmPassword : new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
    })
    ResetPass(data: FormGroup)
    {
        const pass= data.value['password']
           this.service.ResetPassword(pass).subscribe((response)=>{
            console.log(response);
           });
     this.service.SignOut();
     this.route.navigateByUrl('login');
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