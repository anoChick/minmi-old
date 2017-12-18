import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSemanticModule } from 'ng-semantic';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgSemanticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
