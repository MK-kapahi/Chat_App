import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from './Services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private signalRService : MessageService ){}
 
  title = 'chat_App';

}
