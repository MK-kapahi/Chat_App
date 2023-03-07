import { Component } from "@angular/core";
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormsModule, NgForm} from "@angular/forms";
import { Router } from "@angular/router";
import { RegistrationService } from "src/app/Services/registration.service";
import { CommonModule } from "@angular/common";

@Component({
    standalone :true,
    selector:"app-forgetModal",
    templateUrl :"./forgotpass.component.html",
    styleUrls :["./forgotpass.component.css"],
    imports :[FormsModule,CommonModule]
})

export class ForgotPassComponent{
[x: string]: any;
    constructor(public modalRef: MdbModalRef<ForgotPassComponent>, private route :Router , private service:RegistrationService) {}

    onSubmit(data:NgForm)
    {
        let email = data.value.email;
        console.log(email)
        this.service.sendMail('192.180.2.133:4200/Reset',data.value.email).subscribe((result)=>{
            console.log(result)
        })
        this.modalRef.close()
    }
}