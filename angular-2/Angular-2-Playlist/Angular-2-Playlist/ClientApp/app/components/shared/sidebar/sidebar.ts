import { Component } from '@angular/core';

@Component({
	selector: 'sidebar-cmp',
    template: require('./sidebar.html')
})

export class SidebarComponent {
	showMenu: string = '';
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
}
