import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { APP_BASE_HREF } from '@angular/common';
import { routes } from './app.routes';
import { LoginModule } from './components/login/login.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
//import { SharedModule } from './components/shared/shared.module';
import { AppComponent } from './components/app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot(routes),
        LoginModule,
        DashboardModule,
       // SharedModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

