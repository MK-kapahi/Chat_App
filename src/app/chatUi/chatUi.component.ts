import { Component } from '@angular/core'
import { RegistrationService } from '../Services/registration.service';

@Component({
    selector :'app-chatUi',
    templateUrl :'./chatUi.component.html',
    styleUrls :['./chatUi.component.css']
})

export class ChatUiComponent
{
    constructor( private service :RegistrationService){}
}