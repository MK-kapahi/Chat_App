import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule, SocialUser} from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RegistrationService } from "src/app/Services/registration.service";
import { ForgotPassComponent } from "./forgotPass/forgotpass.component"; 
import { CommonModule } from "@angular/common";

@Component({
    selector : 'app-login',
    templateUrl :'./login.component.html',
    styleUrls :['./login.component.css'],
})

export class LoginComponent implements OnInit {

  ngOnInit() {
    this.authService.authState.subscribe((user: SocialUser) => {
      
      console.log(user);

      this.route.navigateByUrl("/Home")
    });
  }
    modalRef: MdbModalRef<ForgotPassComponent> | null = null;

    showPassword: boolean = false;
  constructor(private modalService: MdbModalService,private authService: SocialAuthService,private service : RegistrationService ,private route : Router) {}

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
          this.service.registerToken(data.message);
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

    signInWithFB(): void {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
  
    signOut(): void {
      this.authService.signOut();
    }
}