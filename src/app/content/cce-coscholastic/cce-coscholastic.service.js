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
var CceCoscholasticService = (function () {
    function CceCoscholasticService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.cceCoscholasticUrl = 'http://localhost:8080/guldu/webapi/ccecoscholastic';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    CceCoscholasticService.prototype.getCceCoscholastics = function () {
        var url = this.cceCoscholasticUrl + "/school/" + +this.cookieService.get("schoolId");
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CceCoscholasticService.prototype.getCceCoscholastic = function (id) {
        return this.getCceCoscholastics()
            .then(function (cceCoschs) { return cceCoschs.find(function (cceCosch) { return cceCosch.id === id; }); });
    };
    CceCoscholasticService.prototype.save = function (cceCosch) {
        if (cceCosch.id) {
            return this.put(cceCosch);
        }
        return this.post(cceCosch);
    };
    CceCoscholasticService.prototype.delete = function (cceCosch) {
        var url = this.cceCoscholasticUrl + "/" + cceCosch.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    CceCoscholasticService.prototype.post = function (cceCosch) {
        cceCosch.id = 0;
        cceCosch.schoolId = +this.cookieService.get("schoolId");
        return this.http
            .post(this.cceCoscholasticUrl, JSON.stringify(cceCosch), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CceCoscholasticService.prototype.put = function (cceCosch) {
        var url = this.cceCoscholasticUrl + "/" + cceCosch.id;
        return this.http
            .put(url, JSON.stringify(cceCosch), { headers: this.headers })
            .toPromise()
            .then(function () { return cceCosch; })
            .catch(this.handleError);
    };
    CceCoscholasticService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    CceCoscholasticService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], CceCoscholasticService);
    return CceCoscholasticService;
}());
exports.CceCoscholasticService = CceCoscholasticService;
//# sourceMappingURL=cce-coscholastic.service.js.map