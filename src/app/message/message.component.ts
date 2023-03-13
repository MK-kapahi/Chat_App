import {Component, OnInit } from '@angular/core'
import { MessageService } from '../Services/message.service';

@Component({
    selector :'app-message',
    templateUrl :'./message.component.html',
    styleUrls :['./message.component.css']
})

export class MessageComponent implements OnInit
{
 
  showMessage :boolean = false;
  signaldata : any[] =[];
  xyz : string ='';
    constructor(private service : MessageService){}
  ngOnInit(): void {
    this.service._hubConnection?.on( this.xyz,(message: any)=>{
      this.signaldata.push(message);
      this.showMessage=true;
    })
  }
    
  showmessage()
  {
    this.showMessage = false;
  }
    
}