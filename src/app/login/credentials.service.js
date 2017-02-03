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
var http_1 = require('@angular/http');
var core_2 = require('angular2-cookie/core');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/add/operator/toPromise');
var LoginService = (function () {
    function LoginService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.loggedIn = false;
        //private loginUrl = 'http://sample-env.m23riezw6z.us-west-2.elasticbeanstalk.com/guldu/webapi/login';
        this.loginUrl = 'http://localhost:8080/guldu/webapi/login';
        this.isLoggedInSubject = new BehaviorSubject_1.BehaviorSubject(this.checkIsLoggedIn());
    }
    Object.defineProperty(LoginService.prototype, "loggedInObservable", {
        get: function () {
            return this.isLoggedInSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    LoginService.prototype.checkIsLoggedIn = function () {
        var isLoggedIn = false;
        isLoggedIn = (this.cookieService.get("isLoggedIn") === "true");
        return isLoggedIn;
    };
    LoginService.prototype.extractData = function (res) {
        var body = res;
        if (res.status == 200) {
            var header = res.headers;
            this.auth_response = body.json();
            this.cookieService.put("schoolId", "" + this.auth_response.schoolId);
            this.cookieService.put("schoolName", this.auth_response.schoolName);
            this.cookieService.put("auth_token", this.auth_response.token);
            this.cookieService.put("isLoggedIn", "" + true);
            this.isLoggedInSubject.next(this.checkIsLoggedIn());
            return true;
        }
        return false;
    };
    LoginService.prototype.post = function (credentials) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http
            .post(this.loginUrl, JSON.stringify(credentials), { headers: headers })
            .toPromise()
            .then(function (res) {
            if (res.status === 200) {
                _this.auth_response = res.json();
                _this.cookieService.put("schoolId", "" + _this.auth_response.schoolId);
                _this.cookieService.put("schoolName", _this.auth_response.schoolName);
                _this.cookieService.put("auth_token", _this.auth_response.token);
                _this.cookieService.put("isLoggedIn", "" + true);
                _this.isLoggedInSubject.next(_this.checkIsLoggedIn());
                return true;
            }
            return false;
        })
            .catch(this.handleError);
    };
    LoginService.prototype.logout = function () {
        //localStorage.removeItem('auth_token');
        this.cookieService.put("isLoggedIn", "" + false);
        this.cookieService.put("auth_token", "");
        this.isLoggedInSubject.next(this.checkIsLoggedIn());
        this.loggedIn = false;
    };
    LoginService.prototype.isLoggedIn = function () {
        return this.checkIsLoggedIn();
    };
    LoginService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=credentials.service.js.map