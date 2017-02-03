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
var credentials_1 = require('./credentials');
var credentials_service_1 = require('./credentials.service');
var LoginComponent = (function () {
    function LoginComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.user = new credentials_1.Credentials('', '');
        this.errorMsg = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.loginService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loginService
            .post(this.user)
            .then(function (result) {
            if (result) {
                _this.router.navigate(['/dashboard']);
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login-form',
            templateUrl: 'credentials.component.html',
            styleUrls: ['credentials.component.css']
        }), 
        __metadata('design:paramtypes', [credentials_service_1.LoginService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=credentials.component.js.map