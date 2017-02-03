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
var SliptestService = (function () {
    function SliptestService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.sliptestUrl = 'http://localhost:8080/guldu/webapi/sliptest';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    SliptestService.prototype.getSliptests = function (sectionId, subjectId) {
        var url = this.sliptestUrl + "/section/" + sectionId + "/subject/" + subjectId;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SliptestService.prototype.getSliptest = function (sectionId, subjectId, sliptestId) {
        return this.getSliptests(sectionId, subjectId)
            .then(function (sliptests) { return sliptests.find(function (portion) { return portion.id === sliptestId; }); });
    };
    SliptestService.prototype.save = function (sliptest) {
        if (sliptest.id) {
            return this.put(sliptest);
        }
        return this.post(sliptest);
    };
    SliptestService.prototype.delete = function (sliptest) {
        var url = this.sliptestUrl + "/" + sliptest.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    SliptestService.prototype.post = function (sliptest) {
        return this.http
            .post(this.sliptestUrl, JSON.stringify(sliptest), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SliptestService.prototype.put = function (sliptest) {
        var url = this.sliptestUrl + "/" + sliptest.id;
        return this.http
            .put(url, JSON.stringify(sliptest), { headers: this.headers })
            .toPromise()
            .then(function () { return sliptest; })
            .catch(this.handleError);
    };
    SliptestService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    SliptestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], SliptestService);
    return SliptestService;
}());
exports.SliptestService = SliptestService;
//# sourceMappingURL=sliptest.service.js.map