import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from './Services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy , OnInit{ 
 
  title = 'chat_App';

  constructor(private chatService : MessageService){
  }
  ngOnInit(): void {
    this.chatService.startConnection();
  }
  ngOnDestroy(): void {
    this.chatService._hubConnection?.off("recieveMessage")
  }

 

}
