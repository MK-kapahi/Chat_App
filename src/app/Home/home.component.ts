import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {  Event, NavigationCancel, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Constant } from 'src/constant';
import { MessageService, } from '../Services/message.service';
import { RegistrationService } from '../Services/registration.service';

@Component({
    selector:'app-home',
    templateUrl :'./home.component.html',
    styleUrls :['./home.component.css']
})

export class HomeComponent implements OnInit 
{

    msgArray :any =[];
    chatId :string = '';
    safeUrl : SafeUrl | undefined 
    

    onlineUsers :Array<any> =[];
    selectedUserdata :any=[]
    userArray :any=[];
    noOfMessage : number = 0;
    showUser : boolean = false;
    currentUserName: any = localStorage.getItem('name')
    currentUserEmail : any =localStorage.getItem('email') ;
    token : any = localStorage.getItem('token')
    getUserforChat: boolean = false;
    clientName: any=[];
    searchValue: string ='';
    constructor( private service : RegistrationService , private chatService : MessageService ,private sanitize : DomSanitizer){
         
        
        this.chatService.refreshListenerTo(); 
        this.chatService.receiveMessageListener();
        this.chatService.Message.subscribe((response: any)=>{
            this.noOfMessage++;
            if(response)
            {
                let User = [];
                this.service.userGet().subscribe((res: any) => {
                    User = res['data'];
                    for(let Messageuser of response)
                    {
                    this.clientName  = User.find((array: any) => { return (array.email === Messageuser.senderEmail) })
                    if(Messageuser.senderEmail != this.currentUserEmail )
                    {
                        let div = document.getElementsByClassName('toast')[0];
                        div.classList.add('show');
                    }
                    }
                });
            }
        })

    }

    ngOnInit(): void {
    
        this.chatService.refreshListener()
        this.chatService.onlineUsers.subscribe((response :any)=>{
            this.onlineUsers = response;
        })

    }



    getUser()
    {
    
        console.log(this.searchValue);
        
        if(this.searchValue.length != null)
        {
            this.service.usergetMatch(this.searchValue).subscribe((response :any)=>{
                const userMatchObject = response['data'];
                this.userArray = userMatchObject;
                console.log(this.userArray)
            })
        }   

        else{

           this.service.userGet().subscribe((response:any)=>{
            this.userArray = response['data'];
           });

        }
        this.showUser=true;

        if(this.searchValue.length==0)
        {
        setTimeout(()=>{
            this.userArray.length=0;
        },4000)

    }
    }


    getUserMessage(event:any)
    {
        this.selectedUserdata= event;
        this.getUserforChat = true;

        console.log(this.selectedUserdata)
        this.chatService.addChat(this.selectedUserdata['email']).then((response: any)=>{
          this.chatId= response;

          this.chatService.getChat(response ,Constant.value.pageNo);
            this.chatService.chatSubject.subscribe((response=>{
            this.msgArray = response;
            console.log(this.msgArray);
            }))
        })
        this.userArray.length=0;
    }
}