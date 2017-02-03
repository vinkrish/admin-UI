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
var SectionHeadingService = (function () {
    function SectionHeadingService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.sectionHeadingUrl = 'http://localhost:8080/guldu/webapi/ccesectionheading';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.headers.append('Authorization', "Bearer " + this.cookieService.get("auth_token"));
    }
    SectionHeadingService.prototype.getSectionHeadings = function (id) {
        var url = this.sectionHeadingUrl + "/coscholastic/" + id;
        return this.http
            .get(url, { headers: this.headers, body: '' })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SectionHeadingService.prototype.getSectionHeading = function (coscholasticId, sectionHeadingId) {
        return this.getSectionHeadings(coscholasticId)
            .then(function (sectionHeadings) { return sectionHeadings.find(function (sectionHeading) { return sectionHeading.id === sectionHeadingId; }); });
    };
    SectionHeadingService.prototype.save = function (sectionHeading) {
        if (sectionHeading.id) {
            return this.put(sectionHeading);
        }
        return this.post(sectionHeading);
    };
    SectionHeadingService.prototype.delete = function (sectionHeading) {
        var url = this.sectionHeadingUrl + "/" + sectionHeading.id;
        return this.http
            .delete(url, { headers: this.headers, body: '' })
            .toPromise()
            .catch(this.handleError);
    };
    SectionHeadingService.prototype.post = function (sectionHeading) {
        return this.http
            .post(this.sectionHeadingUrl, JSON.stringify(sectionHeading), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SectionHeadingService.prototype.put = function (sectionHeading) {
        var url = this.sectionHeadingUrl + "/" + sectionHeading.id;
        return this.http
            .put(url, JSON.stringify(sectionHeading), { headers: this.headers })
            .toPromise()
            .then(function () { return sectionHeading; })
            .catch(this.handleError);
    };
    SectionHeadingService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    SectionHeadingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], SectionHeadingService);
    return SectionHeadingService;
}());
exports.SectionHeadingService = SectionHeadingService;
//# sourceMappingURL=cce-section-heading.service.js.map