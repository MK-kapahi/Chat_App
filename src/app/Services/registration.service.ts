import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";


const url = "http://192.180.2.128:5050/api/";

const tokenValue = localStorage.getItem('token') ;
const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': "Bearer "+ tokenValue

})
};

@Injectable()
export class RegistrationService {
    private authChange = new Subject<boolean>();
    private authChangeSub = new Subject<SocialUser>();
    public authChanged = this.authChangeSub.asObservable();
    public extAuthChanged = this.authChangeSub.asObservable();

    constructor(private http : HttpClient , private authService : SocialAuthService){
    }
    private user = new BehaviorSubject<string>("");
    currentuser = this.user.asObservable();


    registerUser(data:any)
    {
       return this.http.post(url+"User/Registration",data,httpOptions);
    }

    loginUser(data:any)
    {
        return this.http.post(url+"User/Login",data,httpOptions);
    }

    sendMail(url:string,email:string)
    {
        this.user.next(email)
        console.log(this.currentuser);
        return this.http.post(url+"Email",{url,email});
    }

    changePass(email:string ,pass:string)
    {
         return this.http.put(url+"/User/ForgetPassword",{email ,pass},httpOptions)
    }

    registerToken(value:string)
    {
        localStorage.setItem("token",value)
    }

    returnToken()
    {
        return localStorage.getItem("token");
    }

    changePassword(email:string,oldpass: string,newpasss :string)
    {
        return this.http.put(url+"/User/ResetPassword",{email,oldpass,newpasss},httpOptions)
    }

    googleLogin()
    {
         this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x:SocialUser)=> console.log("The social user Is "+x.idToken));
    }

    isLoggedIn():boolean{
        return !localStorage.getItem('token')
      }
}