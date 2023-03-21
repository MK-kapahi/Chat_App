import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { RegistrationService } from '../Services/registration.service';

@Component({
    selector : 'app-updateProfile',
    templateUrl :'./profilePage.component.html',
    styleUrls :['./profilePage.component.css']
})

export class ProfilePageComponent
{
    validateDateOfbirth: boolean =false;
    updateForm:FormGroup;
    messageShow: boolean =false;
    message : string =''; 
    userData : any =[];
    currentUser :any= localStorage.getItem('email');
    constructor(private service : RegistrationService, private route : Router , private fb:FormBuilder){

      this.service.usergetMatchUsingEmail(this.currentUser).subscribe((response:any)=>{
        this.userData = response.data;
        console.log(this.userData);
        this.loadData();
      })


        this.updateForm = this.fb.group({
              email : [{ value :'' , disabled : true},Validators.required],
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

      loadData()
      {
        for(let user of this.userData)
        {
        this.updateForm.patchValue({
        
          email : user.email,
          firstName: user.firstName ,
            lastName: user.lastName,
            PhoneNo: user.phoneNo,
            dateOfBirth: user.dateOfBirth 
        })
      }
      }
}