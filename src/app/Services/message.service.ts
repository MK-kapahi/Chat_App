import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";

export class Message {
    constructor(
     public content : string,
     public mine : boolean
    ){}
}
const api='http://192.180.2.128:5050/chatHub';
@Injectable()
export class MessageService implements OnInit {
     

    public _hubConnection : signalR.HubConnection | any;
    constructor(private http: HttpClient){}
    ngOnInit(): void {

    }
    getMessage()
    {
       return this.http.get(api);
    }

    public startConnection()
    {
        this._hubConnection = new HubConnectionBuilder().withUrl(api,{
            skipNegotiation :true,
            transport :signalR.HttpTransportType.WebSockets
        }).build();
        this._hubConnection.start().then(()=>{
            console.log("Connection started ")
        }).catch((error: any)=>{
            console.log(" Error While starting connection "+error);
        });
    }

    sendMessage()
    {
        this._hubConnection?.invoke("sendMessage","hi").catch((error:any)=>{
               console.log('error');
        });
    }

    sendMessageListener()
    {
        this._hubConnection?.on("recieveMessage",(someText :string)=>{
            console.log(someText);
        })
    }

    
}
