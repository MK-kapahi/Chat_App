import { Component } from "@angular/core";
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    standalone :true,
    selector:"app-forgetModal",
    templateUrl :"./forgotpass.component.html",
    styleUrls :["./forgotpass.component.css"]
})

export class ForgotPassComponent{
    constructor(public modalRef: MdbModalRef<ForgotPassComponent>) {}
}