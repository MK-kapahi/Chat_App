import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
    standalone:true,
    selector :'app-reset',
    templateUrl:"./changePassword.component.html",
    styleUrls :['./changePassword.component.css'],
    imports :[FormsModule,CommonModule]
})

export class ChangePasswordComponent{
    
    ChangePassword(data:NgForm)
    {
        
    }
}