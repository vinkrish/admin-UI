import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { LoginService } from '../../login/credentials.service';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  private hasLoggedIn: boolean;
  private loginSub;
  private instituitionName: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService) {
  }

  ngOnInit() {
    this.loginSub = this.loginService.loggedInObservable.subscribe(val => {
      this.hasLoggedIn = val;
      this.instituitionName = this.cookieService.get("schoolName");
    });
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  admin() {
    this.router.navigate(['/admin']);
  }

  logout() {
    this.loginService.logout();
    this.hasLoggedIn = this.loginService.isLoggedIn();
    this.router.navigate(['/login']);
  }

}