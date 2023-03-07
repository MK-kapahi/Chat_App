import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ForgotPassComponent } from "./forgotPass/forgotpass.component";

@Component({
    standalone : true,
    selector : 'app-login',
    templateUrl :'./login.component.html',
    styleUrls :['./login.component.css'],
    imports :[ ReactiveFormsModule ,CommonModule,ForgotPassComponent]
})

export class LoginComponent {

    modalRef: MdbModalRef<ForgotPassComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  openModal() {
    this.modalRef = this.modalService.open(ForgotPassComponent)
  }
    loginForm = new FormGroup({
        email : new FormControl('',[Validators.required]),
        pass : new FormControl ('',[Validators.required])
    })

    loginUser()
    {
        console.log(this.loginForm);
    }

    showModal()
    {
        this.modalRef = this.modalService.open(ForgotPassComponent)
    }
}