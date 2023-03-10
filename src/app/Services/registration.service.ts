import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router, } from "@angular/router";


const url = "http://192.180.2.128:5050/api/";

const tokenValue = localStorage.getItem('token') ;
const headers=new HttpHeaders({
    'Authorization':'bearer '+tokenValue
});

@Injectable()
export class RegistrationService {


    constructor(private http : HttpClient,private route: Router){
    }

    registerUser(data:any)
    {
       return this.http.post(url+"User/Registration",data);
    }

    loginUser(data:any)
    {
        return this.http.post(url+"Login",data);
    }

    sendMail(urldirect:string,email:string)
    {
        return this.http.post(url+"Password/ForgetPassword",{urldirect,email});
    }

    ResetPassword(password:string)
    {
        return this.http.post(url+"Password/ResetPassword",{password},{headers:headers})
    }

    registerToken(value:string)
    {
        localStorage.setItem("token",value)
    }

    returnToken()
    {
        return localStorage.getItem("token");
    }

    changePassword(OldPassword: string,NewPassword :string)
    {
        return this.http.post(url+"Password/ChangePassword",{OldPassword,NewPassword},{headers :headers})
    }

    googleLogin(Token:string)
    {
        console.log("Google Token"+Token);
       return this.http.post(url+"Login/GoogleAuth",{Token})
    }

    isLoggedIn():boolean{
        return !localStorage.getItem('token')
      }

      logout()
      {
        return this.http.post(url+'Login/logOut',{headers:headers})
      }
      SignOut()
      {
        localStorage.clear();
      }

      userget()
      {
       return this.http.get(url+"User",{headers:headers})
      }
}