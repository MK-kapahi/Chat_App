import { Component } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { RegistrationService } from 'src/app/Services/registration.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Constant, REGEX } from 'src/constant';

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
    validateDateOfbirth: boolean =false;
    btnclick: boolean =false ;
    registrationForm:FormGroup;
    constructor(private service : RegistrationService, private route : Router , private fb:FormBuilder){
        this.registrationForm = this.fb.group({
            firstName:['',Validators.required],
            lastName:['',Validators.required],
            email:['', Validators.compose([Validators.required,Validators.pattern(REGEX.EMAIL)])],
            PhoneNo:['',Validators.compose([Validators.required,Validators.pattern(REGEX.PHONE)])],
            dateOfBirth:['',Validators.compose([Validators.required])],
            password:['',Validators.compose([Validators.required,Validators.pattern(REGEX.PASSWORD)])]
        })
    }
   
    // new FormGroup({
    //     firstName : new FormControl(null,Validators.required),
    //     lastName : new FormControl(null,Validators.required),
    //     email : ['',Validators.compose([])],
    //     // PhoneNo : new FormControl(null,[Validators.required , Validators.pattern(Constant.validation.Phoneno)]),
    //     dateOfBirth : new FormControl(null,[Validators.required]),
    //     password : new FormControl(null,[Validators.pattern(Constant.validation.password)])
    // })

    resgisterUser()
    {
        if(this.registrationForm.valid)
    {
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
        })
    } else{
        Object.keys(this.registrationForm.controls).forEach(key=>this.registrationForm.controls[key].markAsTouched({onlySelf:true}))
    }
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

      validateDOB(e: Event){
 
        const year = new Date((e.target as HTMLInputElement).value).getFullYear();
        const today = new Date().getFullYear();
      
        if( (today-year) < 12 || (today -year)>100){
          this.validateDateOfbirth= true
          
        }else{
          this.validateDateOfbirth = false
        }
      
      }
}