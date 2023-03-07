import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class RegistrationService {

    url = "http://192.180.2.128:5050/api/";
    direcToUrl = "http://localhost/Reset";
    constructor(private http : HttpClient){}
    private user = new BehaviorSubject<string>("");
    currentuser = this.user.asObservable();


    registerUser(data:any)
    {
       return this.http.post(this.url+"User/Registration",data);
    }

    loginUser(data:any)
    {
        return this.http.post(this.url+"User/Login",data);
    }

    sendMail(url:string,email:string)
    {
        this.user.next(email)
        console.log(this.currentuser);
        return this.http.post(this.url+"Email",{url,email});
    }

    changePass(email:string ,pass:string)
    {
         return this.http.put(this.url+"/User/ForgetPassword",{email ,pass})
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
        return this.http.put(this.url+"/User/ResetPassword",{email,oldpass,newpasss})
    }
}