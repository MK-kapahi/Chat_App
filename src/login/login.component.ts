import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule, SocialUser} from "@abacritt/angularx-social-login";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {  MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RegistrationService } from "src/app/Services/registration.service";
import { REGEX } from "src/constant";
import { ForgotPassComponent } from "./forgotPass/forgotpass.component"; 

@Component({
    selector : 'app-login',
    templateUrl :'./login.component.html',
    styleUrls :['./login.component.css'],
})

export class LoginComponent{

    Token:string='';
    showPassword: boolean = true;
    loginForm : FormGroup;
    constructor(private modalService: MdbModalService,private authService: SocialAuthService,private service : RegistrationService ,private route : Router ,private fb : FormBuilder) {
    this.authService.authState.subscribe((user: SocialUser) => {
      
      console.log(user);
      this.Token=user.idToken;
      console.log(this.Token)
      this.service.registerToken(this.Token);
      this.service.googleLogin(this.Token).subscribe((response)=>{
        console.log(response)
      });
      this.route.navigateByUrl("/home")

    });

    this.loginForm = this.fb.group({
        email :['',Validators.compose([Validators.required , Validators.pattern(REGEX.EMAIL)])],
        password : ['' ,Validators.compose([Validators.required, Validators.pattern(REGEX.PASSWORD)])]
    })
  }

  openModal() {
   this.modalService.open(ForgotPassComponent)
  }
    // loginForm = new FormGroup({
    //     email : new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
    //     password : new FormControl ('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
    // })

    public togglePasswordVisibility(): void {
      this.showPassword = !this.showPassword;
    }

    loginUser()
    {
      if(this.loginForm.valid)
       this.service.loginUser(this.loginForm.value).subscribe((data :any)=>{
  
        console.log(data)
        if(data.isSuccess)
        {
          console.log(data.data['token']);
          this.service.registerToken(data.data['token']);
          this.route.navigateByUrl('/home')
        }
      })

      else
      {
          Object.keys(this.loginForm.controls).forEach(key=>this.loginForm.controls[key].markAsTouched({onlySelf:true}))
      }
    }

    showModal()
    {
       this.modalService.open(ForgotPassComponent)
    }

    googleLogin()
    {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x:SocialUser)=> console.log("The social user Is "+x.idToken));
    }

    get fControls()
    {
        return this.loginForm.controls;
    }

    Signup()
    {
      this.route.navigateByUrl("/signup")
    }

    
}