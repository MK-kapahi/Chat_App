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
    
    ngOnDestroy(): void {
      this.chatService._hubConnection?.off("recieveMessage")
    }

    onlineUsers :Array<any> =[]
    selectedUserdata :any=[]
    userArray :any=[];
    showUser : boolean = false;
    currentUserName: string ='';
    currentUserEmail : string ='';
    constructor(private route: Router , private service : RegistrationService , private chatService : MessageService ,private sanitize : DomSanitizer){
        const curr =  this.route.getCurrentNavigation();
        const state = curr?.extras.state as {
         'name' : string,
         'email' :string,
         'token' :string,
        }
 
       state.token;
        this.currentUserName= state.name;
        this.currentUserEmail = state.email;

        this.chatService.startConnection(state.token);
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
                const obj= response['data'];
                this.userArray = obj;
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

          this.chatService.getChat(response);
            this.chatService.chatSubject.subscribe((response=>{
            this.msgArray = response;
            console.log(this.msgArray)
            let arr2 = this.msgArray.find( ( array: any)  =>  {  return (array.receiverEmail===this.selectedUserdata['email'])})
           this.safeUrl=  this.sanitize.bypassSecurityTrustResourceUrl(arr2.fileUrl);
            }))
        })
        this.userArray.length=0;
    }
}