import { Component, Input } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { MessageService } from "../Services/message.service";
import { RegistrationService } from "../Services/registration.service";

@Component({
    selector :'app-sendMessage',
    templateUrl :'./sendMessage.component.html',
    styleUrls :['./sendMessage.component.css']
})

export class SendMessageComponent {


    imageUpload : string | Blob ='';
    fileUpload : string | Blob ='';
    @Input() safeUrl : SafeUrl | undefined 
    @Input() msgArray :Array<any> =[]
    @Input() chatId:string='';
    responseArray : Array<object> = []
    userCheck: boolean = false;
    message : string ='';
    name : string ='';
    public sanitize : DomSanitizer | undefined
    constructor(private service : MessageService , private registerService : RegistrationService){
    
      this.recieveMsg();
    }

    type :number =0
    @Input() data :any | undefined ;
    @Input() currentUser :string=''
    sendMsg(type: number)
    {
        if(this.message != null)
        {
            if(typeof(this.message) === 'string')
            {
            this.service.sendMessage(this.data['email'],this.message,1,"abc");
            this.service.getChat(this.chatId);
            this.service.chatSubject.subscribe((response : any) =>{
                this.msgArray = response;
                })

                this.message='';
            }
            
        }
         

    this.recieveMsg()
}

recieveMsg()
{
   this.service.receiveMessageListener();
   this.service.Message.subscribe((response :any)=>{
    if(response.userEmail == this.data['email'])
    {
        console.log(response);
        if(response.type===1)
        {
        this.service.getChat(this.chatId)
        this.service.chatSubject.subscribe((response :any)=>{
        this.msgArray = response;
        
        });

        if(response.type===2)
        {
        this.service.getChat(this.chatId)
        this.service.chatSubject.subscribe((response :any)=>{
        this.msgArray = response;
        
        });

        if(response.type===3)
        {
        this.service.getChat(this.chatId)
        this.service.chatSubject.subscribe((response :any)=>{
        this.msgArray = response;
        });
    }
    }
     }
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
    }

   })
}


uploadImage(imgpath : any)
{
    let data ='';
    this.imageUpload = imgpath.target.files[0];
    console.log(this.imageUpload);

    let formdata = new FormData();

    formdata.append('file',this.imageUpload);

   this.registerService.Upload(2,this.currentUser,formdata).subscribe((response:any)=>{
    data = "http://192.180.2.128:5050/"+response.data
    this.service.sendMessage(this.data['email'],this.message,2,data);
    this.service.getChat(this.chatId);
    this.service.chatSubject.subscribe((response : any) =>{
        this.msgArray = response;
        this.recieveMsg()
    })
})
    this.message='';
}


uploadFile(filePath : any)
{
    this.fileUpload = filePath.target.files[0];
    console.log(this.fileUpload);
    let data =''
    let formdata = new FormData();

    formdata.append('file',this.fileUpload);

    this.registerService.Upload(3,this.currentUser,formdata).subscribe((response:any)=>{
        console.log(response);
        data = "http://192.180.2.128:5050/"+response.data
        this.service.sendMessage(this.data['email'],this.message,3,data);
        this.service.getChat(this.chatId);
        this.service.chatSubject.subscribe((response : any) =>{
            this.recieveMsg();
        })
    })
        this.message='';
}

}