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
            this.refreshListenerTo();
        }).catch((error: any)=>{
            console.log(" Error While starting connection "+error);
        });
    }

    sendMessage(email:string , msg :string , type :number , url : string , filename : string | Blob)
    {
        return this._hubConnection?.invoke("sendMessage",email,msg,type,url,filename).catch((error:Error)=>{
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
        console.log(" heyy i am invoked")
            return this._hubConnection.invoke('getUsers').then((response :any)=>{
                this.onlineUsers.next(response.data);
            })
                .catch((error:any)=>{
                    console.log('error');
             });
         this._hubConnection.on('refresh' ,()=>{

             console.log(" heyy i am invoked")
             return this._hubConnection.invoke('getUsers').then((response :any)=>{
                 this.onlineUsers.next(response.data);
             })
                 .catch((error:any)=>{
                     console.log('error');
              }); 
         })
    }

refreshListenerTo()
    {
         this._hubConnection.on('refresh' ,()=>{
             console.log(" heyy i am invoked")
             return this._hubConnection.invoke('getUsers').then((response :any)=>{
                 this.onlineUsers.next(response.data);
             })
                 .catch((error:any)=>{
                     console.log('error');
              }); 
         })
    }
}


