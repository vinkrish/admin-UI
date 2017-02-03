"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var core_2 = require('angular2-cookie/core');
var credentials_service_1 = require('../../login/credentials.service');
var HeaderComponent = (function () {
    function HeaderComponent(loginService, router, cookieService) {
        this.loginService = loginService;
        this.router = router;
        this.cookieService = cookieService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginSub = this.loginService.loggedInObservable.subscribe(function (val) {
            _this.hasLoggedIn = val;
            _this.instituitionName = _this.cookieService.get("schoolName");
        });
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.loginSub.unsubscribe();
    };
    HeaderComponent.prototype.logout = function () {
        this.loginService.logout();
        this.hasLoggedIn = this.loginService.isLoggedIn();
        this.router.navigate(['/login']);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ui-header',
            templateUrl: 'header.component.html',
            styleUrls: ['header.component.css']
        }), 
        __metadata('design:paramtypes', [credentials_service_1.LoginService, router_1.Router, core_2.CookieService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map