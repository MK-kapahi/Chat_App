import { Component, OnDestroy, OnInit} from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {  Router } from '@angular/router';
import { MessageService, } from '../Services/message.service';
import { RegistrationService } from '../Services/registration.service';

@Component({
    selector:'app-home',
    templateUrl :'./home.component.html',
    styleUrls :['./home.component.css']
})

export class HomeComponent  implements OnInit ,OnDestroy
{

    msgArray :any =[];
    chatId :string = '';
    safeUrl : SafeUrl | undefined 
    ngOnInit(): void {
    }
    

    onlineUsers :Array<any> =[]
    selectedUserdata :any=[]
    userArray :any=[];
    showUser : boolean = false;
    currentUserName: any = localStorage.getItem('name')
    currentUserEmail : any =localStorage.getItem('email') ;
    token : any = localStorage.getItem('token')
    constructor(private route: Router , private service : RegistrationService , private chatService : MessageService ,private sanitize : DomSanitizer){
       

        this.chatService.startConnection(this.token);
        this.chatService.onlineUsers.subscribe((response :any)=>{
            this.onlineUsers = response;
            console.log(this.onlineUsers);
        })
    }

    getUser(event:any)
    {
        
        const val = event.target.value;
        if(val.length != null)
        {
            this.service.usergetMatch(val).subscribe((response :any)=>{
                const userMatchObject = response['data'];
                this.userArray = userMatchObject;
                console.log(this.userArray)
            })
        }        
           this.service.userGet().subscribe((response)=>{
            console.log(response);
           });

        this.showUser=true;
    }


    getUserMessage(event:any)
    {
        this.selectedUserdata= event

        console.log(this.selectedUserdata)
        this.chatService.addChat(this.selectedUserdata['email']).then((response: any)=>{
          this.chatId= response;

          this.chatService.getChat(response ,1);
            this.chatService.chatSubject.subscribe((response=>{
            this.msgArray = response;
            }))
        })
        this.userArray.length=0;
    }

    ngOnDestroy(): void {
        this.chatService._hubConnection?.off("recieveMessage")
      }
}