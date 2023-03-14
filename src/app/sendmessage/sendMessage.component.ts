import { Component, Input } from "@angular/core";
import { MessageService } from "../Services/message.service";
import { MessageSend }   from "src/Modal/Modaldata"
import { elementAt } from "rxjs";

@Component({
    selector :'app-sendMessage',
    templateUrl :'./sendMessage.component.html',
    styleUrls :['./sendMessage.component.css']
})

export class SendMessageComponent {


    userCheck: boolean = false;
    constructor(private service : MessageService){}
    @Input() data :any | undefined ;
    @Input() onlineUser : string ='';

    msgArray :Array<string> = [];
    msgForm = new MessageSend('','');
    sendMsg()
    {
        
        this.msgForm.RecieverEmail = this.data['email'];
        console.log(this.msgForm);
         
        this.service.sendMessage(this.onlineUser , this.data['email'],this.msgForm.msg)

        const element = document.createElement('li');
        element.innerHTML=this.msgForm.msg;
        element.style.background='white';
        element.style.padding='15px  30px';
        element.style.margin ='15px';
        element.style.textAlign ='right';
        document.getElementById('message-list')?.appendChild(element);

         //console.log(this.data['email'])
          //  var data ={
          //   Type: 'warning',
          //   Information : 'text Information message'
          //  }

          // this.service.getMessage().subscribe((data)=>{
          //   console.log(data);
          // })
    }
}
