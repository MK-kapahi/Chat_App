import { Component, Input } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { MessageService } from "../Services/message.service";
import { RegistrationService } from "../Services/registration.service";
import { ChangeDetectionStrategy } from "@angular/core";
import { Constant } from "src/constant";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sendMessage',
    templateUrl: './sendMessage.component.html',
    styleUrls: ['./sendMessage.component.css']
})

export class SendMessageComponent {


    distance: number = 0;
    throttle: number = 20;
    imageUpload: string | Blob = '';
    fileUpload: string | Blob = '';
    @Input() safeUrl: SafeUrl | undefined
    @Input() msgArray: Array<any> = []
    @Input() chatId: string = '';
    responseArray: Array<object> = []
    userCheck: boolean = false;
    message: string = '';
    clientName: any ;
    pageNo: number = Constant.value.pageNo
    fileName : string | Blob =''
    public sanitize: DomSanitizer | undefined
    constructor(private service: MessageService, private registerService: RegistrationService) {
        this.recieveMsg();
    }

    type: number = 1
    @Input() dataOfMessage: any | undefined;
    @Input() currentUser: string = ''
    sendMsg(type: number) {

            this.service.sendMessage(this.dataOfMessage['email'], this.message, type, "abc" ,"  ");
            this.service.getChat(this.chatId , 1);
            this.service.chatSubject.subscribe((messageResponse : any)=>{
                this.msgArray = messageResponse
            })
            // this.service.receiveMessageListener();
            // this.service.Message.subscribe((response: any) => {
            // this.msgArray.push(...response);
            // })
            // console.log("bjhnbjhnjkhnk"+this.msgArray);
                 this.message='';

    }

    recieveMsg() {
        this.service.receiveMessageListener();
        this.service.Message.subscribe((response: any) => {

            for( let user of response)
            {
            if(user.receiverEmail === this.dataOfMessage['email']){
            console.log(response);
            this.msgArray.push(response);
            }
        }
        })

    }


    uploadImage(imgpath: any) {
        let filePathofResponse = '';
        this.imageUpload = imgpath.target.files[0];
        console.log(this.imageUpload);

        let formdata = new FormData();

        formdata.append('file', this.imageUpload);

        this.registerService.Upload(2, this.currentUser, formdata).subscribe((response: any) => {
            filePathofResponse = Constant.Url.IP + response.data['filePath']
            this.service.sendMessage(this.dataOfMessage['email'], this.message, 2, filePathofResponse ," ");
            this.service.getChat(this.chatId, 1);
            this.service.chatSubject.subscribe((response: any) => {
                this.msgArray = response;
                this.recieveMsg()
            })
        })
        this.message = '';
    }


    uploadFile(filePath: any) {
        this.fileUpload = filePath.target.files[0];
        this.fileName = filePath.target.files[0].name;
        let filePathofResponse = ''
        let formdata = new FormData();
        formdata.append('file', this.fileUpload);

        this.registerService.Upload(3, this.currentUser, formdata).subscribe((response: any) => {
            console.log(response);
            filePathofResponse = Constant.Url.IP+ response.data['filePath'];
            this.service.sendMessage(this.dataOfMessage['email'], this.message, 3, filePathofResponse ,this.fileName);
            this.service.getChat(this.chatId, 1);
            this.service.chatSubject.subscribe(() => {
                this.recieveMsg();
            })
        })
        this.message = '';
    }


    onScroll() {
        if (this.pageNo > 1) {
            this.service.getChat(this.chatId, --this.pageNo)
            console.log('heyyyy')
            this.service.chatSubject.subscribe((responseArray: any) => {
                this.msgArray.push(...responseArray);
            })
        }
    }

    onScrollUp() {
        if (!(this.msgArray.length < 20)) {
            this.service.getChat(this.chatId, ++this.pageNo)
            this.service.chatSubject.subscribe((responseArray: any) => {
                this.msgArray.push(...responseArray);
            })
        }
    }
}