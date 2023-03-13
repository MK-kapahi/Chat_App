import { Component, Input } from "@angular/core";
import { MessageService } from "../Services/message.service";

@Component({
    selector :'app-sendMessage',
    templateUrl :'./sendMessage.component.html',
    styleUrls :['./sendMessage.component.css']
})

export class SendMessageComponent {

    constructor(private service : MessageService){}
    @Input() data :any | undefined;


    sendMsg()
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