import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClientExampleComponent } from './views/http-client-example/http-client-example.component';

@NgModule({
  declarations: [
    HttpClientExampleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class HttpClientExampleModule { }
