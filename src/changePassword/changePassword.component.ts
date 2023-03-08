import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    standalone:true,
    selector :'app-reset',
    templateUrl:"./changePassword.component.html",
    styleUrls :['./changePassword.component.css'],
    imports :[FormsModule,CommonModule,ReactiveFormsModule]
})

export class ChangePasswordComponent{
    

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
}