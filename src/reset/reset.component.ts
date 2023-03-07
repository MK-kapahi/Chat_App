import { Component } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms';

@Component({

    standalone : true,
    selector : 'app-reset',
    templateUrl :'./reset.component.html',
    styleUrls :['./reset.component.css'],
    imports :[FormsModule]
})

export class ResetComponent{
    
    ResetPass(data: NgForm)
    {
        console.log(data.value)
    }
}