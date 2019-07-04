import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataModule } from './modules/data/data.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { OverviewModule } from './modules/overview/overview.module';
import { AdminModule } from './modules/admin/admin.module';
import { DetailModule } from './modules/detail/detail.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverviewModule,
    NavigationModule,
    DataModule,
    AngularFireModule.initializeApp(environment.firebase),
    AdminModule,
    DetailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }