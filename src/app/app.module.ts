import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from 'src/signup/signup.component';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationService } from './Services/registration.service';
import { HomeComponent } from './Home/home.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ErrorComponent } from './error/error.component';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from '@abacritt/angularx-social-login';
import { LoginModule } from 'src/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from './Services/message.service';
import { SendMessageComponent } from './sendmessage/sendMessage.component';
import { NavComponent } from './nav/nav.component';
import { SafePipeModule } from 'safe-pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatIconModule } from '@angular/material/icon';
import { ProfilePageComponent } from './ProfilePage/profilePage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    SendMessageComponent,
    NavComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignupComponent,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    LoginModule,
    BrowserAnimationsModule,
    FormsModule,
    SafePipeModule,
    InfiniteScrollModule,
    MatIconModule
  ],
  providers: [RegistrationService,MdbModalService,MessageService,{

    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '49284581162-7fv1u6k80f5qipkpn0v34pf4g7ams6dd.apps.googleusercontent.com'
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent],
  schemas :[ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
