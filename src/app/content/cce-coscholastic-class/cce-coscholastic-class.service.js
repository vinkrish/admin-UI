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
require('rxjs/add/operator/toPromise');
var CceCoschClassService = (function () {
    function CceCoschClassService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.cccUrl = 'http://localhost:8080/guldu/webapi/ccecoscholasticclass';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    CceCoschClassService.prototype.getCceCoschClasses = function (id) {
        var url = this.cccUrl + "/coscholastic/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CceCoschClassService.prototype.getCceCoschClass = function (id) {
        return this.getCceCoschClasses(id)
            .then(function (cceCoschClasses) { return cceCoschClasses.find(function (cceCoschClass) { return cceCoschClass.id === id; }); });
    };
    CceCoschClassService.prototype.save = function (cceCoschClass) {
        return this.post(cceCoschClass);
    };
    CceCoschClassService.prototype.delete = function (cceCoschClass) {
        var url = this.cccUrl + "/" + cceCoschClass.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    CceCoschClassService.prototype.post = function (cceCoschClass) {
        return this.http
            .post(this.cccUrl, JSON.stringify(cceCoschClass), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CceCoschClassService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    CceCoschClassService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], CceCoschClassService);
    return CceCoschClassService;
}());
exports.CceCoschClassService = CceCoschClassService;
//# sourceMappingURL=cce-coscholastic-class.service.js.map