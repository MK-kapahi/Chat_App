import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { RegistrationService } from '../Services/registration.service';

@Component({
    selector : 'app-updateProfile',
    templateUrl :'./updateProfile.component.html',
    styleUrls :['./updateProfile.component.css']
})

export class updateProfileComponent
{
    validateDateOfbirth: boolean =false;
    updateForm:FormGroup;
    messageShow: boolean =false;
    message : string =''; 
    currentUser :any= localStorage.getItem('email');
    constructor(private service : RegistrationService, private route : Router , private fb:FormBuilder){

      this.service.usergetMatch(this.currentUser).subscribe((response)=>{
        console.log(response);
      })
        this.updateForm = this.fb.group({
            firstName:['',Validators.required],
            lastName:['',Validators.required],
            PhoneNo:['',Validators.compose([Validators.required,Validators.pattern("^[6-9]\\d{9}$")])],
            dateOfBirth:['',Validators.compose([Validators.required])],
        })
    }


    validateDOB(e: Event){
 
        const year = new Date((e.target as HTMLInputElement).value).getFullYear();
        const today = new Date().getFullYear();
      
        if( (today-year) < 12 || (today -year)>100){
          this.validateDateOfbirth= true
          
        }else{
          this.validateDateOfbirth = false
        }
      
      }

      UpdateUserValue()
      {
        if(this.updateForm.valid)
        {
            this.service.updateUser(this.updateForm.value).subscribe((result:any)=>{
                this.messageShow=true;
               console.log(result)
               if(result.isSuccess)
               {
                this.message= "Update Sucessful";
                alert(this.message);
               }
            })
        } else{
            Object.keys(this.updateForm.controls).forEach(key=>this.updateForm.controls[key].markAsTouched({onlySelf:true}))
        }
      }

      GoBack()
      {
        this.route.navigateByUrl('/home');
      }
}