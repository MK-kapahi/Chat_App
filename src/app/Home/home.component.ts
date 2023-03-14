import { Component} from '@angular/core'
import {  Router } from '@angular/router';
import { MessageService } from '../Services/message.service';
import { RegistrationService } from '../Services/registration.service';

@Component({
    selector:'app-home',
    templateUrl :'./home.component.html',
    styleUrls :['./home.component.css']
})

export class HomeComponent  
{

    selectedUserdata :any=[]
    userArray :any=[];
    showUser : boolean = false;
    currentUserName: string ='';
    currentUserEmail : string ='';
    constructor(private route: Router , private service : RegistrationService , private chatService : MessageService){
        const curr =  this.route.getCurrentNavigation();
        const state = curr?.extras.state as {
         'name' : string,
         'email' :string
        }
 
        this.currentUserName= state.name;
        this.currentUserEmail = state.email;

        console.log(this.currentUserName);
        console.log(this.currentUserName);
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
        this.selectedUserdata=event;

        this.chatService.addChat(this.currentUserEmail ,this.selectedUserdata['email']).then((response: any)=>{
            console.log(response)
        })
        this.chatService.receiveMessageListener();
       // console.log(this.selectedUserdata['email']);
        
    }
}