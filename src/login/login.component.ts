import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule, SocialUser} from "@abacritt/angularx-social-login";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {  MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MessageService } from "src/app/Services/message.service";
import { RegistrationService } from "src/app/Services/registration.service";
import { REGEX } from "src/constant";
import { ForgotPassComponent } from "./forgotPass/forgotpass.component"; 

@Component({
    selector : 'app-login',
    templateUrl :'./login.component.html',
    styleUrls :['./login.component.css'],
})

export class LoginComponent {

    showPassword: boolean = true;
    name:string = '';
    loginForm : FormGroup;
    message :string ='';
    messageShow :boolean = false;
    constructor(  private signalRService : MessageService ,private modalService: MdbModalService,private authService: SocialAuthService,private service : RegistrationService ,private route : Router ,private fb : FormBuilder) {
    this.authService.authState.subscribe((user: SocialUser) => {
      
      this.service.registerToken(user.idToken);
      this.service.googleLogin(user.idToken).subscribe();
      this.route.navigateByUrl("/home" )

    });

    this.loginForm = this.fb.group({
        email :['',Validators.compose([Validators.required , Validators.pattern(REGEX.EMAIL)])],
        password : ['' ,Validators.compose([Validators.required, Validators.pattern(REGEX.PASSWORD)])]
    })
    }

  openModal() {
   this.modalService.open(ForgotPassComponent)
  }

    public togglePasswordVisibility(): void {
      this.showPassword = !this.showPassword;
    }

    loginUser()
    {
      if(this.loginForm.valid)
      {

        this.messageShow=true;
       this.service.loginUser(this.loginForm.value).subscribe((response :any)=>{
  
        this.message =response.message
        if(response.isSuccess)
        {
          this.service.registerToken(response.data['token']);
          this.route.navigate(['/home'] );

          localStorage.setItem('email',response.data['email'])
          localStorage.setItem('name',response.data['name'])
          // this.signalRService.saveData(response.data['email']).then((response:string)=>{
          //   console.log(response);
          // })
        }
      })
    }
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