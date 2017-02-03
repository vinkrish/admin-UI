import { Injectable } from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { LoginService } from './credentials.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
	
  constructor(
    private loginService: LoginService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.loginService.isLoggedIn()) {
    	return true;
    }
    // Store the attempted URL for redirecting
    //this.loginService.redirectUrl = state.url;

    // Navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }
}