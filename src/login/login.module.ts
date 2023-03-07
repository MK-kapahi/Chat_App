
import { SocialLoginModule } from "@abacritt/angularx-social-login";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";

@NgModule({
    declarations :[LoginComponent],
    imports:[ 
        ReactiveFormsModule,
        BrowserModule,
        SocialLoginModule,
        FormsModule,
       RouterModule
        ],
})

export class LoginModule{

}