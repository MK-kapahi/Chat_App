import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Subject } from "rxjs";


const api='http://192.180.2.128:5050/chatHub';


const authToken :any  = localStorage.getItem("token");
@Injectable()
export class MessageService{

    public _hubConnection : signalR.HubConnection | any;
    constructor(private http: HttpClient){}
   
    messageArray:any = []
    Message = new Subject;
    chatSubject = new Subject
    recieveMessage = new Subject;
    onlineUsers = new Subject;
    getMessage()
    {
       return this.http.get(api);
    }

    public startConnection()
    {
        
        this._hubConnection = new signalR.HubConnectionBuilder().withUrl(api,
        { 
            skipNegotiation: true,
             transport: signalR.HttpTransportType.WebSockets,
            accessTokenFactory :()=> authToken

        }).withAutomaticReconnect().build();

        this._hubConnection.start().then(()=>{
            console.log("Connection started ");
            this.refreshListener();
        }).catch((error: any)=>{
            console.log(" Error While starting connection "+error);
        });
    }

    sendMessage(email:string , msg :string , type :number , url : string)
    {
        return this._hubConnection?.invoke("sendMessage",email,msg,type,url).catch((error:Error)=>{
               console.log('error');
        });
    }

    addChat(email:string)
    {
        return this._hubConnection.invoke("addChat",email).catch((error:Error)=>{
            console.log('error');
     });
    }

    receiveMessageListener()
    {
       
        return this._hubConnection.on('receiveMessage', (response : any) => {
            this.messageArray = [response]
            this.Message.next(this.messageArray);
            console.log(response);
    })  
    }

    saveData(email:string)
    {
        return this._hubConnection.invoke('saveData',email).then((value:string)=>{
            console.log(value)
        }).catch((error:Error)=>{
            console.log('error');
     });
}


    getChat(id:string, pageNumber: Number)
    {
         this._hubConnection.invoke('previousMessages',id,pageNumber).then((response : any )=>{
            this.chatSubject.next(response.data);
         }).catch((error:any)=>{
            console.log('error');
     }); 
    }

    refreshListener()
    {
        console.log(" Iam inside refresh")
        this._hubConnection.on('refresh' ,()=>{
        
            console.log(" heyy i am invoked")
            return this._hubConnection.invoke('getUsers').then((response :any)=>{
                console.log(response);
                this.onlineUsers.next(response.data);
            })
                .catch((error:any)=>{
                    console.log('error');
             }); 
        })
    }
}


