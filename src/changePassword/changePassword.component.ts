import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { RegistrationService } from "src/app/Services/registration.service";

@Component({
    standalone:true,
    selector :'app-reset',
    templateUrl:"./changePassword.component.html",
    styleUrls :['./changePassword.component.css'],
    imports :[FormsModule,CommonModule,ReactiveFormsModule,MatIconModule]
})

export class ChangePasswordComponent implements OnInit{


  email:string='';  
  message:string ='';
  messageShow=false;
  constructor(private service : RegistrationService,private route : Router){
  }
  ngOnInit(): void {
    
  }
  showPassword: boolean = true;
    passwordsMatching = false;
    isConfirmPasswordDirty = false;
    confirmPasswordClass = 'form-control'
    changePasswordform = new FormGroup({
        oldPassword:new FormControl(null,Validators.required),
        newPassword: new FormControl(null,[Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
        confirmPassword : new FormControl(null,[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
      
    })
    ChangePassword(data:FormGroup)
    {

      if(data.value['newPassword'] !=data.value['confirmPassword'] )
      {
         this.message='Enter same Password';
      }
       this.service.changePassword(data.value['oldPassword'],data.value['newPassword']).subscribe((value :any)=>{
        console.log(value)
        this.messageShow =true;
        if(value.statusCode =="200")
         {
         this. message = "PasswordChanged";
         alert(this.message);

         this.route.navigateByUrl('/login')
         }

        else
        {
          this.message="Please Check the information filled";
        }
       });

    }

    get fControls()
    {
        return this.changePasswordform.controls
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

      GoBack()
      {
        this.route.navigateByUrl('/home');
      }
}

