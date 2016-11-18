import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    //styleUrls: [
    //    '../scss/application.scss'
    //],
    //styles: [require('../scss/application.scss')],
   // styleUrls: ['../scss/application.scss'],
    template: require('./app.component.html'),

})
export class AppComponent {
}
