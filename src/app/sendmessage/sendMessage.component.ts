import { Component, Input } from "@angular/core";
import { MessageService } from "../Services/message.service";
import { RegistrationService } from "../Services/registration.service";

@Component({
    selector :'app-sendMessage',
    templateUrl :'./sendMessage.component.html',
    styleUrls :['./sendMessage.component.css']
})

export class SendMessageComponent {

    toastermsg : boolean = false;
    @Input() msgArray :any =[]
    @Input() chatId:string='';
    responseArray :any = []
    userCheck: boolean = false;
    message : string ='';
    name : string =''
    constructor(private service : MessageService , private registerService : RegistrationService){
    
      this.recieveMsg();
    }
    @Input() data :any | undefined ;
    @Input() currentUser ?:string
    sendMsg()
    {
        if(this.message != null)
        {
            this.service.sendMessage(this.data['email'],this.message);
            this.service.getChat(this.chatId);
            this.service.chatSubject.subscribe((response=>{
                this.msgArray = response;
                }))

                this.message='';
            
        }
    this.recieveMsg()
}

playAudio(){
    let audio = new Audio();
    audio.src = "../assets/VyaparApp__GDPREM_installer.exe";
    audio.load();
    audio.play();
  }
recieveMsg()
{
   this.service.receiveMessageListener();
   this.service.Message.subscribe((response :any)=>{
    if(response.userEmail == this.data['email'])
    {
        this.service.getChat(this.chatId)
        this.service.chatSubject.subscribe((response=>{
        this.msgArray = response;
        this.playAudio()
    }));
}

    else
    {
        let arr = []
      let div= document.getElementsByClassName('toast')[0];
      div.classList.add('show');
      this.registerService.userGet().subscribe((res:any)=>{
        arr = res['data'];
       let arr2 = arr.find( ( array: any)  =>  {  return (array.email===response.userEmail)})

       this.name = arr2['firstName'];
       });
       this.playAudio();
    }

   })
}
}
