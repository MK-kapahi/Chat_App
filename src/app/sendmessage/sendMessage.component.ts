import { Component } from "@angular/core";
import { MessageService } from "../Services/message.service";

@Component({
    selector :'app-sendMessage',
    templateUrl :'./sendMessage.component.html',
    styleUrls :['./sendMessage.Component.css']
})

export class SendMessageComponent {

    constructor(private service : MessageService){}
    sendData()
    {
           var data ={
            Type: 'warning',
            Information : 'text Information message'
           }

          this.service.getMessage().subscribe((data)=>{
            console.log(data);
          })
    }
}