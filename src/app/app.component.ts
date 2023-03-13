import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from './Services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy{
  constructor( private signalRService : MessageService ){}
  ngOnInit(): void {
    this.signalRService.startConnection();
    
    setTimeout(()=>{
      this.signalRService.sendMessageListener();
      this.signalRService.sendMessage();
    },5000)
  }
  title = 'chat_App';
  
  ngOnDestroy(): void {
    this.signalRService._hubConnection?.off("recieveMessage")
  }
}
