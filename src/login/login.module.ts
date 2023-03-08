
import { SocialLoginModule } from "@abacritt/angularx-social-login";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations :[LoginComponent],
    imports:[ 
        ReactiveFormsModule,
        BrowserModule,
        SocialLoginModule,
        FormsModule,
       RouterModule,
       MatFormFieldModule,
       MatInputModule,
       MatButtonModule,
       MatIconModule
        ],
})

export class LoginModule{

}