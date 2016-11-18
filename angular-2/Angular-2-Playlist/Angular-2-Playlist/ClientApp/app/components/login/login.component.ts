import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'login',
    template: require('./login.component.html'),
   // styles: require('./login.style.scss'),
   // styleUrls: ['./login.style.scss'],
    //styles: [require('./login.style.scss')],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'login-page app'
    }
})
export class LoginComponent {
}


