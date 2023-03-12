import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { HubConnection } from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";


const api='';
@Injectable()
export class MessageService implements OnInit {
     

    public _hubConnection : HubConnection | undefined;
    constructor(private http: HttpClient){}
    ngOnInit(): void {
        this._hubConnection = new HubConnectionBuilder().withUrl(api).build();
        this._hubConnection.start().then(()=>{
            console.log("Connection started ")
        }).catch((error)=>{
            console.log(error);
        });

    }
    getMessage()
    {
       return this.http.get(api);
    }
}
