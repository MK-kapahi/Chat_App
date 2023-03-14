import { HttpClient } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable, OnInit } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";

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

    
        // private hubConnection : signalR.HubConnection | any;
        //     public startConnection = (token:string) => {
        //       this.hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7256/chart", 
        //{skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets, accessTokenFactory: () => token}).
        //withAutomaticReconnect().build();
        //       this.hubConnection.start().then(() => console.log("connection started")).catch((err:any) => {
        //         console.log("Error while starting connection", err)
        //         // setTimeout(() => {
        //         //   this.startConnection(token);
        //         // }, 2000)
        //       });
        //     }
        
        this._hubConnection = new signalR.HubConnectionBuilder().withUrl(api,
        {  skipNegotiation :true,
            transport :signalR.HttpTransportType.WebSockets }).withAutomaticReconnect().build();
        this._hubConnection.start().then(()=>{
            console.log("Connection started ")
        }).catch((error: any)=>{
            console.log(" Error While starting connection "+error);
        });
    }

    sendMessage(userEmail:string ,email:string , msg :string)
    {
        return this._hubConnection?.invoke("sendMessage", userEmail,email,msg ).catch((error:any)=>{
               console.log('error');
        });
    }

    sendMessageListener()
    {
        this._hubConnection?.on("recieveMessage",(someText :string)=>{
            console.log(someText);
        })
    }

    addChat(currentemail :string ,email:string)
    {
        return this._hubConnection.invoke("addChat",currentemail,email).catch((error:any)=>{
            console.log('error');
     });
    }

    receiveMessageListener()
    {
        this._hubConnection?.on("recieveMessage",(someText :string)=>{
            console.log(someText);
        })
    }

    saveData(email:string)
    {
        return this._hubConnection.invoke('saveData',email).then((value:string)=>{
            console.log(value)
        }).catch((error:any)=>{
            console.log('error');
     });
}

}
