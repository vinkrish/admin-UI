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
var GradeClassWiseService = (function () {
    function GradeClassWiseService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.gcwUrl = 'http://localhost:8080/guldu/webapi/gradeclasswise';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    GradeClassWiseService.prototype.getGradesClassWise = function (id) {
        var url = this.gcwUrl + "/class/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GradeClassWiseService.prototype.save = function (gcw) {
        if (gcw.id) {
            return this.put(gcw);
        }
        return this.post(gcw);
    };
    GradeClassWiseService.prototype.delete = function (gcw) {
        var url = this.gcwUrl + "/" + gcw.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    GradeClassWiseService.prototype.post = function (gcw) {
        return this.http
            .post(this.gcwUrl, JSON.stringify(gcw), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    GradeClassWiseService.prototype.put = function (gcw) {
        return this.http
            .put(this.gcwUrl, JSON.stringify(gcw), { headers: this.headers })
            .toPromise()
            .then(function () { return gcw; })
            .catch(this.handleError);
    };
    GradeClassWiseService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    GradeClassWiseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], GradeClassWiseService);
    return GradeClassWiseService;
}());
exports.GradeClassWiseService = GradeClassWiseService;
//# sourceMappingURL=grade-class-wise.service.js.map