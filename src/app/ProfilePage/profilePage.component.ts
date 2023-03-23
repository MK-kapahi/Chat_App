import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    message : string =''; 
    userData : any =[];
    profilePic : string | Blob =''
    constructor(private service : RegistrationService, private route : Router , private fb:FormBuilder){

      this.service.usergetMatchUsingEmail().subscribe((response:any)=>{
        console.log(response);
        this.userData.push(response.data);
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
              console.log(result);
               if(result.isSuccess)
               {
                this.message= "Update Sucessful";
                let div = document.getElementsByClassName('toast')[0];
                div.classList.add('show');
                localStorage.setItem('name',result.name);
               } 

               else
               {
                this.message =result.message;
               }
            })
        } else{
            Object.keys(this.updateForm.controls).forEach(key=>this.updateForm.controls[key].markAsTouched({onlySelf:true}))
        }
        let formdata = new FormData();
        formdata.append('file', this.profilePic);

        this.service.uploadProfileImage(formdata).subscribe((response)=>{
          console.log(response);
          this.service.usergetMatchUsingEmail().subscribe((response:any)=>{
            console.log(response);
          })
        },(error)=>{
          console.log(error);
        })
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
      backToHome()
      {
        this.route.navigateByUrl('/home');
      }

      updateFile(event : any)
      {
        this.profilePic = event.target.files[0];
        let formdata = new FormData();
        formdata.append('file', this.profilePic);
      }
}