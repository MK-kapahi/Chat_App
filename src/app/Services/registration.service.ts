import { Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, } from "@angular/router";
import { Constant } from "src/constant";
import { URL } from "src/constant";


// const url = "http://192.180.2.128:5050/api/";

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
       return this.http.post(`${URL}`+Constant.Auth.signIn,data);
    }

    loginUser(data:any)
    {
        return this.http.post(`${URL}`+Constant.Auth.login,data);
    }

    sendMail(urldirect:string,email:string)
    {
        return this.http.post(`${URL}`+Constant.Url.sendMail,{urldirect,email});
    }

    ResetPassword(password:string)
    {
        return this.http.post(`${URL}`+Constant.Url.resetPassword,{password})
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
        return this.http.post(`${URL}`+Constant.Url.changePassword,{OldPassword,NewPassword})
    }

    googleLogin(Token:string)
    {
        console.log("Google Token"+Token);
       return this.http.post(`${URL}`+Constant.Url.googleLogin,{Token})
    }

    isLoggedIn():boolean{
        return !localStorage.getItem('token')
      }

      logout()
      {
        return this.http.post(`${URL}`+Constant.Url.logout,{headers:headers})
      }
      SignOut()
      {
        localStorage.clear();
      }

      usergetMatch(searchText:string)
      {
       return this.http.get(`${URL}`+"User?searchString="+searchText,{headers:headers})
      }

      userGet()
      {
       return this.http.get(`${URL}`+Constant.Url.user)
      }
}