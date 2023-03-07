import { FacebookLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { RegistrationService } from "src/app/Services/registration.service";
import { ForgotPassComponent } from "./forgotPass/forgotpass.component"; 

@Component({

    selector : 'app-login',
    templateUrl :'./login.component.html',
    styleUrls :['./login.component.css']
})

export class LoginComponent implements OnInit {

  user!: SocialUser;
  loggedIn:boolean | undefined;
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      console.log(this.user)
    });
  }
    modalRef: MdbModalRef<ForgotPassComponent> | null = null;

  constructor(private modalService: MdbModalService,private authService: SocialAuthService,private service : RegistrationService ,private route : Router) {}

  openModal() {
    this.modalRef = this.modalService.open(ForgotPassComponent)
  }
    loginForm = new FormGroup({
        email : new FormControl('',[Validators.required]),
        password : new FormControl ('',[Validators.required])
    })

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
}