import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RegistrationService{

    url = "http://192.180.2.128:5050/api/User/Registration";

    constructor(private http : HttpClient){}

    registerUser(data:any)
    {
       return this.http.post(this.url,data);
    }

    loginUser(data:any)
    {
        return this.http.post("http://192.180.2.128:5050/api/User/Login",data);
    }
}