import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <ui-header></ui-header>
  <div class = "container">
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent { }