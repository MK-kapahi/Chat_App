import { Component } from "@angular/core";
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormsModule, NgForm} from "@angular/forms";

@Component({
    standalone :true,
    selector:"app-forgetModal",
    templateUrl :"./forgotpass.component.html",
    styleUrls :["./forgotpass.component.css"],
    imports :[FormsModule]
})

export class ForgotPassComponent{
    constructor(public modalRef: MdbModalRef<ForgotPassComponent>) {}

    onSubmit(data:NgForm)
    {
        alert(data.value)
    }
}