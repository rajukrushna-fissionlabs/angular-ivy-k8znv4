import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HighlightDirective } from './highlight.directive';
import {NgIdleModule} from '@ng-idle/core';

@NgModule({
  imports: [BrowserModule, FormsModule, NgIdleModule.forRoot()],
  declarations: [AppComponent, HelloComponent, HighlightDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
