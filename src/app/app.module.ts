import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { DataModule } from './modules/data/data.module';
import { DetailModule } from './modules/detail/detail.module';
import { HttpClientExampleModule } from './modules/http-client-example/http-client-example.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { OverviewModule } from './modules/overview/overview.module';
import { counterReducer } from './modules/store-example/counter.reducer';
import { StoreExampleModule } from './modules/store-example/store-example.module';

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
    StoreModule.forRoot({ count: counterReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    AdminModule,
    DetailModule,
    HttpClientExampleModule,
    StoreExampleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
