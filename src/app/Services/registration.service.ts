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
    private user = new BehaviorSubject<string>('');
    public currentuser = this.user.asObservable();


    registerUser(data:any)
    {
       return this.http.post(url+"User/Registration",data);
    }

    loginUser(data:any)
    {
        this.user.next(data.email);
        this.currentuser.subscribe();
        return this.http.post(url+"Login",data);
    }

    sendMail(urldirect:string,email:string)
    {
        this.user.next(email)
        this.currentuser.subscribe();
        return this.http.post(url+"Password/ForgetPassword",{urldirect,email});
    }

    ResetPassword(email:string,pass:string)
    {
        return this.http.post(url+"Password/ResetPassword",{email,pass },{headers:headers})
    }

    registerToken(value:string)
    {
        localStorage.setItem("token",value)
    }

    returnToken()
    {
        return localStorage.getItem("token");
    }

    changePassword(email:string,OldPassword: string,NewPassword :string)
    {
        this.user.next(email)
        this.currentuser.subscribe();
        return this.http.post(url+"Password/ChangePassword",{email,OldPassword,NewPassword},{headers :headers})
    }

    googleLogin(Token:string)
    {
       return this.http.post(url+"Login/GoogleAuth",{Token})
    }

    isLoggedIn():boolean{
        return !localStorage.getItem('token')
      }

      SignOut()
      {
        localStorage.clear();
        this.route.navigateByUrl('/Login');
      }
}