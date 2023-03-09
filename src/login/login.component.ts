import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule, SocialUser} from "@abacritt/angularx-social-login";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RegistrationService } from "src/app/Services/registration.service";
import { ForgotPassComponent } from "./forgotPass/forgotpass.component"; 

@Component({
    selector : 'app-login',
    templateUrl :'./login.component.html',
    styleUrls :['./login.component.css'],
})

export class LoginComponent{


    modalRef: MdbModalRef<ForgotPassComponent> | null = null;
    Token:string='';
    showPassword: boolean = true;
  constructor(private modalService: MdbModalService,private authService: SocialAuthService,private service : RegistrationService ,private route : Router) {
    this.authService.authState.subscribe((user: SocialUser) => {
      
      console.log(user);
      this.Token=user.idToken;
      this.service.registerToken(this.Token);
      this.service.googleLogin(this.Token).subscribe((response)=>{
        console.log(response)
      });
      this.route.navigateByUrl("/Home")

    });
  }

  openModal() {
    this.modalRef = this.modalService.open(ForgotPassComponent)
  }
    loginForm = new FormGroup({
        email : new FormControl('',[Validators.required]),
        password : new FormControl ('',[Validators.required])
    })

    public togglePasswordVisibility(): void {
      this.showPassword = !this.showPassword;
    }

    loginUser()
    {
      if(this.loginForm.invalid)
      {
        return;
      }
       

       this.service.loginUser(this.loginForm.value).subscribe((data :any)=>{
  
        console.log(data);
        if(data.message =='Success')
        {
          alert("Login Successful ");
          this.service.registerToken(data.data);
          console.log(data.data)
          this.route.navigateByUrl('/Home')
        }

        else{
          alert(data.message)
        }
      })
    }

    showModal()
    {
        this.modalRef = this.modalService.open(ForgotPassComponent)
    }

    googleLogin()
    {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x:SocialUser)=> console.log("The social user Is "+x.idToken));
    }
}