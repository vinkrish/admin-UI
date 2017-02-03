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
var AspectPrimaryService = (function () {
    function AspectPrimaryService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.aspectPrimaryUrl = 'http://localhost:8080/guldu/webapi/cceaspectprimary';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    AspectPrimaryService.prototype.getAspectPrimarys = function (id) {
        var url = this.aspectPrimaryUrl + "/topicprimary/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AspectPrimaryService.prototype.getTopicPrimary = function (topicPrimaryId, aspectPrimaryId) {
        return this.getAspectPrimarys(topicPrimaryId)
            .then(function (aspectPrimarys) { return aspectPrimarys.find(function (aspectPrimary) { return aspectPrimary.id === aspectPrimaryId; }); });
    };
    AspectPrimaryService.prototype.save = function (aspectPrimary) {
        if (aspectPrimary.id) {
            return this.put(aspectPrimary);
        }
        return this.post(aspectPrimary);
    };
    AspectPrimaryService.prototype.delete = function (aspectPrimary) {
        var url = this.aspectPrimaryUrl + "/" + aspectPrimary.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    AspectPrimaryService.prototype.post = function (aspectPrimary) {
        return this.http
            .post(this.aspectPrimaryUrl, JSON.stringify(aspectPrimary), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AspectPrimaryService.prototype.put = function (aspectPrimary) {
        var url = this.aspectPrimaryUrl + "/" + aspectPrimary.id;
        return this.http
            .put(url, JSON.stringify(aspectPrimary), { headers: this.headers })
            .toPromise()
            .then(function () { return aspectPrimary; })
            .catch(this.handleError);
    };
    AspectPrimaryService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    AspectPrimaryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], AspectPrimaryService);
    return AspectPrimaryService;
}());
exports.AspectPrimaryService = AspectPrimaryService;
//# sourceMappingURL=cce-aspect-primary.service.js.map