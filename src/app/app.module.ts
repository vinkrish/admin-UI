import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import 'hammerjs';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { UserDropdownDirective } from './shared/header/user-dropdown.directive';
import { myComponents } from './external.module';
import { myServices } from './external.module';

@NgModule({
  declarations: [...myComponents, UserDropdownDirective],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [...myServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
