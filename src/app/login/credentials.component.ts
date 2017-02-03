import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from './credentials';
import { LoginService } from './credentials.service';

@Component({
  selector: 'login-form',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})

export class LoginComponent implements OnInit {
  error: any;
  public user = new Credentials('', '');
  public errorMsg = '';

  constructor(
    private loginService: LoginService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.loginService
      .post(this.user)
      .then(result => {
        if (result) {
          this.router.navigate(['/dashboard']);
        }
      })
      .catch(error => this.error = error);
  }

}