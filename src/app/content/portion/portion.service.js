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
var PortionService = (function () {
    function PortionService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.portionUrl = 'http://localhost:8080/guldu/webapi/portion';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    PortionService.prototype.getPortions = function (classId, subjectId) {
        var url = this.portionUrl + "/class/" + classId + "/subject/" + subjectId;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PortionService.prototype.getPortion = function (classId, subjectId, portionId) {
        return this.getPortions(classId, subjectId)
            .then(function (portions) { return portions.find(function (portion) { return portion.id === portionId; }); });
    };
    PortionService.prototype.save = function (portion) {
        if (portion.id) {
            return this.put(portion);
        }
        return this.post(portion);
    };
    PortionService.prototype.delete = function (portion) {
        var url = this.portionUrl + "/" + portion.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    PortionService.prototype.post = function (portion) {
        return this.http
            .post(this.portionUrl, JSON.stringify(portion), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PortionService.prototype.put = function (portion) {
        var url = this.portionUrl + "/" + portion.id;
        return this.http
            .put(url, JSON.stringify(portion), { headers: this.headers })
            .toPromise()
            .then(function () { return portion; })
            .catch(this.handleError);
    };
    PortionService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    PortionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], PortionService);
    return PortionService;
}());
exports.PortionService = PortionService;
//# sourceMappingURL=portion.service.js.map